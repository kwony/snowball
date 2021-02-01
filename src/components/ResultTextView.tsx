import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { ResultModel, InvestModel } from '../model/InvestModels';
import '../style/base.scss'

export interface ResultTextViewProps {
  initialAmount: number;
  annualAmount: number;
  investYears: number;
  initialSnowball: number;
  annualSnowball: number;
  totalSnowball: number;
}

const ResultTextView = (props: ResultTextViewProps) => {
  const [resultList, setResultList] = useState<Array<ResultModel>>([]);
  const targetRef: any = useRef();

  useEffect(() => {
    const results = Array<ResultModel>();

    results.push({
      descPrefix: `${props.investYears}년후 ${readableWon(
        props.initialAmount
      )}은`,
      descSuffix: "",
      amount: Math.floor(props.initialSnowball),
    });
    results.push({
      descPrefix: `${props.investYears}년동안 ${readableWon(
        props.annualAmount
      )}씩 투자해서`,
      descSuffix: " 쌓였습니다!",
      amount: Math.floor(props.annualSnowball),
    });
    results.push({
      descPrefix: `${props.investYears}년 후 총 투자 금액은`,
      descSuffix: "됐습니다!",
      amount: Math.floor(props.totalSnowball),
    });

    setResultList(results);
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

  return (
    <div ref={targetRef}>
      {props.totalSnowball != 0 &&
        resultList.map((result, index) => (
          <div style={{marginTop:'1.0rem'}}>
            <div style={{textAlign:'center'}}>
              {result.descPrefix}
            </div>
            <div style={{textAlign:'center', marginTop:'0.6rem'}}>
              <label style={{fontWeight:"bold", fontSize:"30px"}}>{readableWon(result.amount)}</label>
            </div>
            <div style={{textAlign:'center'}}>
            <NumberFormat
                  value={result.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="("
                  suffix="원)"
                />
            </div>
            { (<div className='line' style={{marginTop:'1.0rem'}} />) }
          </div>
        ))}
    </div>
  );
};

export default ResultTextView;
