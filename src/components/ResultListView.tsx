import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';

export interface ResultModel {
    descPrefix: string,
    descSuffix: string,
    amount: number
}

export interface ResultViewProps {
    results: Array<ResultModel>
}

const ResultView = (props: ResultViewProps) => {
    const converAmount = (amount: number) => {
        const ukUnit = 10000 * 10000
        const manUnit = 10000

        const ukMoney = Math.floor(amount / ukUnit)
        const ukString = ukMoney > 0 ?  `${ukMoney}억 ` : ""
        const manMoney = Math.floor(Math.floor(amount % ukUnit) / manUnit)
        const manString = manMoney > 0 ? `${manMoney}만 ` : ""
        const restMoney = Math.floor(amount % manUnit)
        const restString = restMoney >= 0 ? `${restMoney}` : ""

        return `${ukString}${manString}${restString}원`
    }

    return (
        <div className="container-fluid" style={{marginTop: '20px'}}>
        {
            props.results.map(result => (
                <div className="row" style={{alignContent:'center'}}>
                    <label>{result.descPrefix} </label><NumberFormat 
                            value={result.amount} 
                            style={{ fontWeight:'bold', marginLeft:'2px' }}
                            displayType={'text'} thousandSeparator={true} suffix='원' />    
                        ({converAmount(result.amount)})<label>{result.descSuffix}</label>
                </div>
                ))
        }
        </div>
    )
}

export default ResultView;