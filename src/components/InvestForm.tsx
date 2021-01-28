import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import Numberformat from 'react-number-format';

export interface InvestFormProps {
    refresh: boolean,
    setInitialAmount(amount: number): void,
    setAnnualAmount(amount: number): void,
    setInvestYears(year: number): void,
    setAverageYearYield(ayy: number): void
}

const InvestForm = (props: InvestFormProps) => {
    useEffect(() => {
    }, [props.refresh])

    return (
        <div className="container-fluid">
            <div>
                <h1 style={{marginBottom: '30px', textAlign:'center'}}>투자해서 얼마나 벌 수 있을까?</h1>
            </div>
            <div className="row input_amount">
                <label className="col-sm-6">초기 투자 금액은 얼마 인가요?</label> 
                <Numberformat
                    thousandSeparator={true} 
                    suffix='원' 
                    className="col-sm-6" 
                    onValueChange={(e) => { props.setInitialAmount(parseFloat(e.value)) }} />
            </div>
            <div className="row input_amount">
                <label className="control-label col-sm-6">연간 얼마나 추가로 넣으실 건가요?</label>
                <Numberformat 
                    allowNegative={false} 
                    thousandSeparator={true} 
                    suffix='원' className="col-sm-6" 
                    onValueChange={(e) => { props.setAnnualAmount(parseFloat(e.value)) }}/>
            </div>
            <div className="row input_amount">
                <label className="control-label col-sm-6">몇년 정도 투자 하실 건가요?</label>
                <Numberformat 
                    allowNegative={false} 
                    thousandSeparator={true} 
                    suffix='년' 
                    className="col-sm-6" 
                    onValueChange={(e) => { props.setInvestYears(parseFloat(e.value)) }}/>
            </div>
            <div className="row input_amount">
                <label className="control-label col-sm-6">예상 연평균 수익률은?</label>
                <Numberformat 
                    allowNegative={false} 
                    thousandSeparator={true} 
                    suffix='%' 
                    className="col-sm-6" 
                    onValueChange={(e) => { props.setAverageYearYield(parseFloat(e.value)) }}/>
            </div>
        </div>
    )
}

export default InvestForm;