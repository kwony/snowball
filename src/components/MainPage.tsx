import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.scss";
import ResultView, {
  ResultModel,
  InvestModel,
  ResultViewProps,
} from "./ResultView";
import InvestForm from "./InvestForm";

const MainPage = (props: any) => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [annualAmount, setAnnualAmount] = useState(0);
  const [investYears, setInvestYears] = useState(0);
  const [averageYearYield, setAverageYearYield] = useState(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [resultList, setResultList] = useState<Array<ResultModel>>([]);
  const [resultViewProps, setResultViewProps] = useState<ResultViewProps>({
    initialAmount: 0,
    annualAmount: 0,
    initialSnowball: 0,
    annualSnowball: 0,
    totalSnowball: 0,
    investYears: 0,
    snowballList: [],
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

  const onSubmit = (event: any) => {
    const r = 1 + averageYearYield / 100;
    const annualCumulative =
      r == 1
        ? annualAmount * investYears
        : ((Math.pow(r, investYears + 1) - 1) / (r - 1)) * annualAmount;
    const initialSnowball = Math.pow(r, investYears) * initialAmount;
    const totalSnowball = initialSnowball + annualCumulative;

    const snowballList = Array<InvestModel>();
    for (var year = 1; year <= investYears; year++) {
      snowballList.push({
        investYear: year,
        amount: calculateByAnnual(initialAmount, annualAmount, r, year),
      });
    }

    setResultViewProps({
      initialAmount: initialAmount,
      annualAmount: annualAmount,
      initialSnowball: initialSnowball,
      annualSnowball: annualCumulative,
      totalSnowball: totalSnowball,
      investYears: investYears,
      snowballList: snowballList,
    });
  };

  return (
    <div className="parent">
      <InvestForm
        refresh={refresh}
        setInitialAmount={setInitialAmount}
        setAnnualAmount={setAnnualAmount}
        setInvestYears={setInvestYears}
        setAverageYearYield={setAverageYearYield}
      />
      <div>
        <button
          className="submit_button"
          onClick={() => {
            onSubmit(null);
          }}
        >
          계산하기
        </button>
      </div>

      <ResultView
        initialAmount={initialAmount}
        annualAmount={annualAmount}
        initialSnowball={resultViewProps.initialSnowball}
        annualSnowball={resultViewProps.annualSnowball}
        totalSnowball={resultViewProps.totalSnowball}
        investYears={resultViewProps.investYears}
        snowballList={resultViewProps.snowballList}
      />
      {resultList.length > 0 && (
        <div className="container-fluid">
          <div className="row">
            <button
              className="submit_button col-sm-12"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setInitialAmount(0);
                setAnnualAmount(0);
                setAverageYearYield(0);
                setInvestYears(0);
                setRefresh(true);
                setResultList([]);
              }}
            >
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
