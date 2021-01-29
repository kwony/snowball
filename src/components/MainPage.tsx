import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.scss';
import ResultView, { ResultModel } from './ResultListView'
import InvestForm from './InvestForm'

const MainPage = (props: any) => {
    const [initialAmount, setInitialAmount] = useState(0)
    const [annualAmount, setAnnualAmount] = useState(0)
    const [investYears, setInvestYears] = useState(0)
    const [averageYearYield, setAverageYearYield] = useState(0)
    const [refresh, setRefresh] = useState<boolean>(false)
    const [resultList, setResultList] = useState<Array<ResultModel>>([])

    useEffect(() => {
    }, [initialAmount, annualAmount, investYears, averageYearYield, refresh])

    const readableAmount = (num: number) =>
    {
        var regexp = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(regexp, ',') + '원';
    }

    const onSubmit = (event: any) => {
        const r = 1 + (averageYearYield / 100)
        const annualCumulative = (r == 1 ? annualAmount * investYears : ((Math.pow(r, investYears + 1) - 1) / (r - 1)) * annualAmount)
        const initialCumulative = Math.pow(r, investYears) * initialAmount
        const result = initialCumulative + annualCumulative

        const results = Array<ResultModel>()

        results.push({descPrefix: `${investYears}년후 ${readableAmount(initialAmount)}은`, descSuffix:' 으로 불어났습니다!', amount: Math.floor(initialCumulative)})
        results.push({descPrefix: `${investYears}년동안 ${readableAmount(annualAmount)}씩 추가 투자해서`, descSuffix:' 쌓였습니다!', amount: Math.floor(annualCumulative)})
        results.push({descPrefix: `${investYears}년 후 총 투자 금액은`, descSuffix: '됐습니다!', amount: Math.floor(result)})

        setResultList(results)
    }
    
    return (
        <div className="parent">
            <InvestForm 
                refresh={refresh}
                setInitialAmount={setInitialAmount}
                setAnnualAmount={setAnnualAmount}
                setInvestYears={setInvestYears}
                setAverageYearYield={setAverageYearYield}
            />
            <div className="container-fluid">
                <div className="row">
                    <button className="submit_button col-sm-12" onClick={() => {onSubmit(null)}}>계산하기</button>
                </div>
            </div>

            <ResultView results={resultList} />
            {
                resultList.length > 0 && (
                    <div className="container-fluid">
                        <div className="row">
                            <button className="submit_button col-sm-12" style={{marginTop: '20px'}}
                                onClick={() => {
                                    setInitialAmount(0)
                                    setAnnualAmount(0)
                                    setAverageYearYield(0)
                                    setInvestYears(0)
                                    setRefresh(true)
                                    setResultList([])
                                }}
                            >초기화
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default MainPage;