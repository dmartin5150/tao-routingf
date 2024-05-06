import React, {FC, useEffect, useState} from "react";
import  { SingleValue}  from 'react-select';
import OrderSelector from "./OrderSelector";
import { SelectOptions } from "./TAOSelector";
import { DropDown } from "../App";
import "./TestOrder.css"


export type SampleOrder = {
    dept: string;
    provider: string;
    genus: string;
    orderType:string;
}

  
  interface TestOrderProps {
    id: number;
    name:string;
    isDisabled:boolean;
    dropDowns: DropDown[]
    assignedBucket:string;
    onResultsChanged: (id:number, newValue: SingleValue<SelectOptions>) => void;
}



const TestOrder: FC<TestOrderProps> = ({id, name, isDisabled,assignedBucket, dropDowns, onResultsChanged}) => {
    const providerDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Provider');
    const deparmentDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Department');
    const genusDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Genus');
    const orderTypeDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'OrderType');


    const [orderType, setOrderType] = useState<DropDown[]>(orderTypeDropDowns);

  
    return(
        <div className='testorder'>
            <div className='testorder-header'>
                <h3>Test Order</h3>  
            </div>
            <div className='testOrder-panel'>
                <OrderSelector
                    id={1}
                    name={"Department"}
                    isDisabled={false}
                    options={deparmentDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <OrderSelector
                    id={2}
                    name={"Provider"}
                    isDisabled={false}
                    options={providerDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <OrderSelector
                    id={3}
                    name={"Genus"}
                    isDisabled={false}
                    options={genusDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <OrderSelector
                    id={4}
                    name={"Order Type"}
                    isDisabled={false}
                    options={orderTypeDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <div className='testOrder-panel--result'>
                    <label>Result</label>
                    <label className='testOrder-panel--result-label'>{assignedBucket}</label>
                </div>
            </div>
        </div>

    )
}
export default TestOrder