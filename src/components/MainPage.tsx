import React, { useState, useEffect } from 'react';
import Numberformat from 'react-number-format';
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import './MainPage.scss';

interface InvestResult {
    initialCumulative: number,
    annualCumulative: number,
    resultCumulative: number
}

const MainPage = (props: any) => {
    const [initialAmount, setInitialAmount] = useState(0)
    const [annualAmount, setAnnualAmount] = useState(0)
    const [investYears, setInvestYears] = useState(0)
    const [averageYearYield, setAverageYearYield] = useState(0)
    const [result, setResult] = useState<InvestResult>()


    useEffect(() => {


    }, [initialAmount, annualAmount, investYears, averageYearYield])


    const onSubmit = (event: any) => {
        event?.preventDefault()

        console.log(`initialAmount: ${initialAmount}`)
        console.log(`annualAmmount: ${annualAmount}`)
        console.log(`investYears: ${investYears}`)
        console.log(`averageYearYield: ${averageYearYield}`)

        const r = 1 + (averageYearYield / 100)

        const annualCumulative = (r == 1 ? annualAmount * investYears : ((Math.pow(r, investYears + 1) - 1) / (r - 1)) * annualAmount)
        const initialCumulative = Math.pow(r, investYears) * initialAmount
        const result = initialCumulative + annualCumulative
        setResult({
            initialCumulative: Math.floor(initialCumulative),
            annualCumulative: Math.floor(annualCumulative),
            resultCumulative: Math.floor(result)
        })
    }
    
    return (
        <div>
            <h1>This is Main Page</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="container-fluid">
                    <div className="row input_amount">
                        <label className="col-sm-3">초기 투자 금액은 얼마 인가요?</label> 
                        <Numberformat value={initialAmount} allowNegative={false} thousandSeparator={true} suffix='원' className="col-sm-2" onValueChange={(e) => { setInitialAmount(parseFloat(e.value)) }} />
                    </div>
                    <div className="row input_amount">
                        <label className="control-label col-sm-3">연간 얼마나 추가로 넣으실 건가요?</label>
                        <Numberformat value={annualAmount} allowNegative={false} thousandSeparator={true} suffix='원' className="col-sm-2" onValueChange={(e) => { setAnnualAmount(parseFloat(e.value)) }}/>
                    </div>
                    <div className="row input_amount">
                        <label className="control-label col-sm-3">몇년 정도 투자 하실 건가요?</label>
                        <Numberformat value={investYears} allowNegative={false} thousandSeparator={true} suffix='년' className="col-sm-2" onValueChange={(e) => { setInvestYears(parseFloat(e.value)) }}/>
                    </div>
                    <div className="row input_amount">
                        <label className="control-label col-sm-3">예상 연평균 수익률은?</label>
                        <Numberformat value={averageYearYield} allowNegative={false} thousandSeparator={true} suffix='%' className="col-sm-2" onValueChange={(e) => { setAverageYearYield(parseFloat(e.value)) }}/>
                    </div>
                </div>
                
            </form>
            <div className="container-fluid">
                <div className="row">
                    <button className="submit_button col-sm-2" onClick={() => {onSubmit(null)}}>계산하기</button>
                    <button className="submit_button col-sm-2" 
                        style={{ marginLeft: '20px' }}
                        onClick={() => {
                            setInitialAmount(0)
                            setAnnualAmount(0)
                            setAverageYearYield(0)
                            setInvestYears(0)
                        }}
                    >초기화</button>
                </div>
                
            </div>
            <div className="container-fluid">
                <div className="row">
                    <label className="col-sm-3">초기 비용 누적 금액</label> 
                    <NumberFormat value={result?.initialCumulative} displayType={'text'} thousandSeparator={true} suffix='원' />    
                </div>
                <div className="row">
                    <label className="col-sm-3">추가 입급 누적 금액</label> 
                    <NumberFormat value={result?.annualCumulative} displayType={'text'} thousandSeparator={true} suffix='원' />    
                </div>
                <div className="row">
                    <label className="col-sm-3">{investYears}년 후 받는 금액</label> 
                    <NumberFormat value={result?.resultCumulative} displayType={'text'} thousandSeparator={true} suffix='원' />    
                </div>
            </div>
        </div>
    )
};

export default MainPage;