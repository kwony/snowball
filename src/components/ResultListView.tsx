import React, { useEffect } from 'react';
import NumberFormat from 'react-number-format';

export interface ResultModel {
    description: string,
    amount: number
}

export interface ResultListModel {
    results: Array<ResultModel>
}

const ResultListView = (props: ResultListModel) => {
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
                <div className="row">
                    <label className="col-sm-3" style={{ alignItems: 'center' }} >{result.description}</label> 
                    <div className="col-sm-3">
                        <NumberFormat 
                            value={result.amount} 
                            displayType={'text'} thousandSeparator={true} suffix='원' />    
                        ({converAmount(result.amount)})
                    </div>
                </div>
                ))
        }
        </div>
    )
}

export default ResultListView;