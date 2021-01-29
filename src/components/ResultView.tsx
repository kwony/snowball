import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import useDimensions from "../utils/useDimensions";

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

export interface ResultModel {
  descPrefix: string;
  descSuffix: string;
  amount: number;
}

export interface InvestModel {
  investYear: number;
  amount: number;
}

export interface ResultViewProps {
  initialAmount: number;
  annualAmount: number;
  investYears: number;
  initialSnowball: number;
  annualSnowball: number;
  totalSnowball: number;
  snowballList: Array<InvestModel>;
  compareList: Array<InvestModel>;
}

const ResultView = (props: ResultViewProps) => {
  const [investLineData, setInvestLineData] = useState<Array<any>>([]);
  const [investLabelData, setInvestLabelData] = useState<Array<any>>([]);
  const [compareLineData, setCompareLineData] = useState<Array<any>>([]);
  const [compareLabelData, setCompareLabelData] = useState<Array<any>>([]);
  const [resultList, setResultList] = useState<Array<ResultModel>>([]);
  const targetRef: any = useRef();
  const { height, width } = useDimensions(targetRef);

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

    const results = Array<ResultModel>();

    results.push({
      descPrefix: `${props.investYears}년후 ${readableWon(
        props.initialAmount
      )}은`,
      descSuffix: " 으로 불어났습니다!",
      amount: Math.floor(props.initialSnowball),
    });
    results.push({
      descPrefix: `${props.investYears}년동안 ${readableWon(
        props.annualAmount
      )}씩 추가 투자해서`,
      descSuffix: " 쌓였습니다!",
      amount: Math.floor(props.annualSnowball),
    });
    results.push({
      descPrefix: `${props.investYears}년 후 총 투자 금액은`,
      descSuffix: "됐습니다!",
      amount: Math.floor(props.totalSnowball),
    });

    setResultList(results);
    setInvestLineData(investLineData);
    setCompareLineData(compareLineData);
  }, [props]);

  const readableWon = (amount: number) => {
    const ukUnit = 10000 * 10000;
    const manUnit = 10000;

    const ukMoney = Math.floor(amount / ukUnit);
    const ukString = ukMoney > 0 ? `${ukMoney}억` : "";
    const manMoney = Math.floor(Math.floor(amount % ukUnit) / manUnit);
    const manString = manMoney > 0 ? `${manMoney}만` : "";
    const restMoney = Math.floor(amount % manUnit);
    const restString = restMoney > 0 ? `${restMoney}` : "";

    return `${ukString}${manString}${restString}원`;
  };

  const numberFormatter = (num: number, digits: number) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e4, symbol: "만원" },
      { value: 1e8, symbol: "억원" },
      { value: 1e12, symbol: "조원" },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (var i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }

    var smallNum =
      num / si[i].value >= 1000
        ? `${num / si[i].value / 1000}k`
        : `${num / si[i].value}`;
    return smallNum + si[i].symbol;
  };

  const parseLabelData = (list: Array<InvestModel>, yOffset: number) => {
    const labelList = [];
    for (var i = 0; i < list.length; i++) {
      if (i % 5 == 0 || i == list.length - 1) {
        labelList.push(list[i]);
      }
    }

    return labelList.map((snowball) => ({
      x: snowball.investYear,
      y: snowball.amount,
      label: numberFormatter(snowball.amount, 1),
      style: { fontSize: 9 },
      yOffset: yOffset,
    }));
  };

  return (
    <div style={{ marginTop: "20px" }} ref={targetRef}>
      {props.totalSnowball != 0 &&
        resultList.map((result) => (
          <div>
            <div>
              <label className="col-sm-12" style={{ textAlign: "center" }}>
                {result.descPrefix}
                <NumberFormat
                  value={result.amount}
                  style={{ fontWeight: "bold", marginLeft: "2px" }}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix="원"
                />
                ({readableWon(result.amount)})<label>{result.descSuffix}</label>
              </label>
            </div>
          </div>
        ))}
      <div>
        <XYPlot
          margin={{ left: 0, right: width * 0.15 }}
          style={{
            marginTop: "20px",
            alignContent: "center",
          }}
          yDomain={[props.initialAmount, props.totalSnowball]}
          width={width}
          height={(width * 9) / 16}
        >
          <HorizontalGridLines />
          <XAxis />
          <YAxis
            hideLine={true}
            orientation={"right"}
            tickFormat={(tick: any) => numberFormatter(tick, 1)}
          />
          <LineSeries
            className="first-series"
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4,
            }}
            color={"#44aee3"}
            data={investLineData}
          />
          {/* <LabelSeries data={investLabelData} /> */}
          <LineSeries
            className="first-series"
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4,
            }}
            color={"#d8d8d8"}
            data={compareLineData}
          />
          {/* <LabelSeries data={compareLabelData} /> */}
        </XYPlot>
      </div>
    </div>
  );
};

export default ResultView;
