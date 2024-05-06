import  {FC, useState, useEffect} from 'react';
import Select, { SingleValue, ActionMeta}  from 'react-select';
import './OrderSelector.css';

import { SelectOptions } from './TAOSelector';




interface OrderSelectorProps {
    id: number;
    name:string;
    isDisabled:boolean;
    options: SelectOptions[];
    onResultsChanged: (id:number, newValue: SingleValue<SelectOptions>) => void;
}

const OrderSelector: FC<OrderSelectorProps> = ({id, name, isDisabled, options,onResultsChanged}) => {

    const [selectedValue, setSelectedValue] = useState<SingleValue<SelectOptions>>({'label':'All', 'value': '0'});
    const [filterId, setFilterId] = useState<number>(0);



    useEffect(() => {
        setFilterId(id)
    },[])


    const handleChange = (newValue: SingleValue<SelectOptions>, actionMeta: ActionMeta<SelectOptions>) => {
        if(filterId !== 0) {
            setSelectedValue(newValue);
            onResultsChanged(filterId, newValue);
        }
    };


    return (
        <div className='order-selector'>
            <label>{name}</label>
            <div className='order-select'>
                <Select  
                    options={options} 
                    isMulti={false}
                    onChange={handleChange}
                    isDisabled={isDisabled}
                    value={selectedValue}
                />  
            </div>
        </div>
    )
}
export default OrderSelector