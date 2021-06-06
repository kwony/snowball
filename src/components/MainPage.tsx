import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ResultTextView from "./ResultTextView";
import ResultGraphView from "./ResultGraphView";
import { ResultModel, InvestModel } from "../model/InvestModels";
import InvestForm from "./InvestForm";
import '../style/base.scss'
import "./MainPage.scss";

interface ResultData {
  initialAmount: number;
  annualAmount: number;
  investYears: number;
  initialSnowball: number;
  annualSnowball: number;
  totalSnowball: number;
  snowballList: Array<InvestModel>;
  compareList: Array<InvestModel>;
}

const MainPage = (props: any) => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [annualAmount, setAnnualAmount] = useState(0);
  const [investYears, setInvestYears] = useState(0);
  const [averageYearYield, setAverageYearYield] = useState(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [resultList, setResultList] = useState<Array<ResultModel>>([]);
  const [resultData, setResultData] = useState<ResultData>({
    initialAmount: 0,
    annualAmount: 0,
    initialSnowball: 0,
    annualSnowball: 0,
    totalSnowball: 0,
    investYears: 0,
    snowballList: [],
    compareList: [],
  });

  useEffect(() => {}, [
    initialAmount,
    annualAmount,
    investYears,
    averageYearYield,
    refresh,
  ]);

  const readableAmount = (num: number) => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",") + "원";
  };

  const calculateByAnnual = (
    initialAmount: number,
    annualAmount: number,
    r: number,
    year: number
  ) => {
    const annualCumulative =
      r == 1
        ? annualAmount * year
        : ((Math.pow(r, year + 1) - 1) / (r - 1)) * annualAmount;
    const initialCumulative = Math.pow(r, year) * initialAmount;

    return Math.floor(annualCumulative + initialCumulative);
  };

  function onSubmit() {
    const r = 1 + averageYearYield / 100;
    const annualCumulative =
      r == 1
        ? annualAmount * investYears
        : ((Math.pow(r, investYears + 1) - 1) / (r - 1)) * annualAmount;
    const initialSnowball = Math.pow(r, investYears) * initialAmount;
    const totalSnowball = initialSnowball + annualCumulative;

    const snowballList = Array<InvestModel>();
    const compareList = Array<InvestModel>();
    for (var year = 1; year <= investYears; year++) {
      snowballList.push({
        investYear: year,
        amount: calculateByAnnual(initialAmount, annualAmount, r, year),
      });
      compareList.push({
        investYear: year,
        amount: calculateByAnnual(initialAmount, annualAmount, 1, year),
      });
    }

    setResultData({
      initialAmount: initialAmount,
      annualAmount: annualAmount,
      initialSnowball: initialSnowball,
      annualSnowball: annualCumulative,
      totalSnowball: totalSnowball,
      investYears: investYears,
      snowballList: snowballList,
      compareList: compareList,
    });
  }

  return (
        <div id="main">
          <div
            style={{
              marginTop: "20px"
            }}
          >
            <label
              style={{
                textAlign: "center",
                fontSize: "24px",
                marginBottom: "0px"
              }}
            >
              투자해서 얼마나 벌 수 있을까?
            </label>
          </div>

          <div className="line" />

          <InvestForm
            refresh={refresh}
            setInitialAmount={setInitialAmount}
            setAnnualAmount={setAnnualAmount}
            setInvestYears={setInvestYears}
            setAverageYearYield={setAverageYearYield}
            onSubmit={onSubmit}
          />
          <div className="line" style={{ marginTop: "20px" }} />

          {resultData.totalSnowball > 0 && (
            <div>
              <ResultTextView
                initialAmount={initialAmount}
                annualAmount={annualAmount}
                initialSnowball={resultData.initialSnowball}
                annualSnowball={resultData.annualSnowball}
                totalSnowball={resultData.totalSnowball}
                investYears={resultData.investYears}
              />

              <ResultGraphView
                initialAmount={initialAmount}
                totalSnowball={resultData.totalSnowball}
                snowballList={resultData.snowballList}
                compareList={resultData.compareList}
                investYears={resultData.investYears}
              />
            </div>
          )}
        </div>
  );
};

export default MainPage;
