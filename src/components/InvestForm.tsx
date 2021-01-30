import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import Numberformat from "react-number-format";
import { record, recordList } from "../data/investRecord";
import Select from "react-select";

export interface InvestFormProps {
  refresh: boolean;
  setInitialAmount(amount: number): void;
  setAnnualAmount(amount: number): void;
  setInvestYears(year: number): void;
  setAverageYearYield(ayy: number): void;
}

const customStyles = {
  container: (base: any) => ({
    ...base,
    padding: 0
}),
};

const InvestForm = (props: InvestFormProps) => {
  const [recordYield, setRecordYield] = useState(null);
  const [options, setOptions] = useState<Array<any>>([])
  const [selectedOption, setSelectedOption] = useState<any>()

  useEffect(() => {}, [props.refresh]);
  
  useEffect(() => {
    const options = recordList.map((record) => ({
        label: record.title,
        value: record.averageYield,
      }))

      setOptions(options)
      setSelectedOption(options[0])
}, [])
  return (
    <div className="container-fluid">
      <div>
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          투자해서 얼마나 벌 수 있을까?
        </h1>
      </div>
      <div className="row input_amount">
        <div style={{padding: 0}} className="col-md-4">초기 투자 금액은 얼마 인가요?</div>
        <Numberformat
          thousandSeparator={true}
          suffix="원"
          className="col-md-8"
          placeholder="10,000,000원"
          onValueChange={(e) => {
            props.setInitialAmount(parseFloat(e.value));
          }}
        />
      </div>
      <div className="row input_amount">
        <label style={{padding: 0}} className="control-label col-sm-4">
          연간 얼마나 추가로 넣으실 건가요?
        </label>
        <Numberformat
          allowNegative={false}
          thousandSeparator={true}
          suffix="원"
          className="col-sm-8"
          placeholder="2,000,000원"
          onValueChange={(e) => {
            props.setAnnualAmount(parseFloat(e.value));
          }}
        />
      </div>
      <div className="row input_amount">
        <label style={{padding: 0}} className="control-label col-sm-4">
          몇년 정도 투자 하실 건가요?
        </label>
        <Numberformat
          allowNegative={false}
          thousandSeparator={true}
          suffix="년"
          className="col-sm-8"
          placeholder="20년"
          onValueChange={(e) => {
            props.setInvestYears(parseFloat(e.value));
          }}
        />
      </div>
      <div className="row input_amount">
        <label style={{padding: 0}} className="control-label col-sm-4">예상 연평균 수익률은?</label>
        <Numberformat
          value={recordYield}
          allowNegative={false}
          thousandSeparator={true}
          suffix="%"
          className="col-sm-4"
          displayType={"input"}
          placeholder="10%"
          onValueChange={(e) => {
            props.setAverageYearYield(parseFloat(e.value));
          }}
        />
        <Select
          className="col-sm-4"
          options={options}
          onChange={(record: any) => {
            console.log(record);
            setRecordYield(record.value);
            setSelectedOption(record)
          }}
          styles={customStyles}
          value={selectedOption}
        />
      </div>
    </div>
  );
};

export default InvestForm;
