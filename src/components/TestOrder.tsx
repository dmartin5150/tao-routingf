import React, {FC} from "react";
import OrderSelector from "./OrderSelector";
import { SelectOptions } from "./TAOSelector";
import { DropDown } from "../App";
import "./TestOrder.css"




  
  interface TestOrderProps {
    id: number;
    name:string;
    isDisabled:boolean;
    dropDowns: DropDown[]
    onResultsChanged: (id:number, value:string) => void;
}



const TestOrder: FC<TestOrderProps> = ({id, name, isDisabled, dropDowns, onResultsChanged}) => {
    const providerDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Provider')
    const deparmentDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Department')
    const genusDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'Genus')
    const orderTypeDropDowns = dropDowns.filter((dropDown) => dropDown.name === 'OrderType')
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
                    id={2}
                    name={"Genus"}
                    isDisabled={false}
                    options={genusDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <OrderSelector
                    id={2}
                    name={"Order Type"}
                    isDisabled={false}
                    options={orderTypeDropDowns[0].options}
                    onResultsChanged={onResultsChanged}
                />
                <div className='testOrder-panel--result'>
                    <label>Result</label>
                    <label className='testOrder-panel--result-label'>Current Result</label>
                </div>
            </div>
        </div>

    )
}
export default TestOrder