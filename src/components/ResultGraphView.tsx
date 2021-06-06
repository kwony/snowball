import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LineSeriesCanvas,
  LabelSeries,
} from "react-vis";
import { ResultModel, InvestModel } from "../model/InvestModels";
import useWindowDimensions from "../utils/useDimensions";
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";

export interface ResultGraphViewProps {
  snowballList: Array<InvestModel>;
  compareList: Array<InvestModel>;
  initialAmount: number;
  totalSnowball: number;
  investYears: number;
}

const ResultGraphView = (props: ResultGraphViewProps) => {
  const [investLineData, setInvestLineData] = useState<Array<any>>([]);
  const [investLabelData, setInvestLabelData] = useState<Array<any>>([]);
  const [compareLineData, setCompareLineData] = useState<Array<any>>([]);
  const [compareLabelData, setCompareLabelData] = useState<Array<any>>([]);
  const typeRef: any = useRef(null)
  const { width } = useWindowDimensions(typeRef);

  useEffect(() => {
    const investLineData = props.snowballList.map((snowball) => ({
      x: snowball.investYear,
      y: snowball.amount,
    }));

    setInvestLabelData(parseLabelData(props.snowballList, -10));

    const compareLineData = props.compareList.map((compare) => ({
      x: compare.investYear,
      y: compare.amount,
    }));

    setCompareLabelData(parseLabelData(props.compareList, 10));
    setInvestLineData(investLineData);
    setCompareLineData(compareLineData);
  }, [props, width]);

  const numberFormatter = (num: number, toFixed: number) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e4, symbol: "만원" },
      { value: 1e8, symbol: "억원" },
      { value: 1e12, symbol: "조원" },
    ];
    for (var i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }

    const numStr =
      i >= 2
        ? `${(num / si[i].value).toFixed(1)}`
        : `${Math.floor(num / si[i].value)}`;
    return numStr + si[i].symbol;
  };

  const parseLabelData = (list: Array<InvestModel>, yOffset: number) => {
    const labelList = [];
    for (var i = 0; i < list.length; i++) {
      if (i == 0 || i == list.length / 2 || i == list.length - 1) {
        labelList.push(list[i]);
      }
    }

    return labelList.map((snowball) => ({
      x: snowball.investYear,
      y: snowball.amount,
      label: numberFormatter(snowball.amount, 1),
      style: { fontSize: width * 0.03 },
      yOffset: yOffset,
    }));
  };

  return (
    <div ref={typeRef}>
      <label className="col-sm-12" style={{textAlign:'center', fontWeight:'bold', margin: '5px'}}>{props.investYears}년간 투자금액 변화</label>
      <XYPlot
        // margin={{ left: 20, right: 20 }}
        style={{
          alignContent: "center",
        }}
        yDomain={[props.initialAmount, props.totalSnowball]}
        width={width}
        height={(width * 9) / 16}
      >
        <HorizontalGridLines />
        <XAxis
          tickSize={4}
          tickTotal={2}
          tickLabelAngle={0}
          tickFormat={(tick: any) => `${tick}년`}
          style={{
            text: {
              color: "black"
            },
            ticks: {
              color: "black"
            }
          }}
        />
        <YAxis
          hideLine={true}
          orientation={"right"}
          hideTicks={true}
          tickFormat={(tick: any) => numberFormatter(tick, 1)}
        />
        <LineSeries
          className="first-series"
          style={{
            strokeLinejoin: "unset",
            strokeWidth: 2,
          }}
          color={"#44aee3"}
          curve={"curveLinear"}
          data={investLineData}
        />
        <LabelSeries data={investLabelData} />
        <LineSeries
          className="first-series"
          style={{
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
          curve={"curveLinear"}
          color={"#d8d8d8"}
          data={compareLineData}
        />

        <LabelSeries data={compareLabelData} />
      </XYPlot>
    </div>
  );
};

export default ResultGraphView;