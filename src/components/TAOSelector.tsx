import  {FC, useState, useEffect} from 'react';
import Select, { MultiValue, ActionMeta}  from 'react-select';
import './TAOSelector.css';


export type SelectOptions = {
    label: string;
    value: string;
}



interface TAOSelectorProps {
    id: number;
    name:string;
    isDisabled:boolean;
    options: SelectOptions[];
    onResultsChanged: (id:number, value:string[]) => void;
}

const TAOSelector: FC<TAOSelectorProps> = ({id, name, isDisabled, options,onResultsChanged}) => {

    const [selectedValue, setSelectedValue] = useState<MultiValue<SelectOptions>>([]);
    const [filterId, setFilterId] = useState<number>(0);



    useEffect(() => {
        setFilterId(id)
    },[])


    const handleChange = (newValue: MultiValue<SelectOptions>, actionMeta: ActionMeta<SelectOptions>) => {
        if(filterId !== 0) {
            setSelectedValue(newValue);
            const curValues = newValue.map((item) => {return item.value})
            const curNames = newValue.map((item) => {return item.label})
            console.log(curValues)
            console.log(curNames)
            // onResultsChanged(filterId, curResults);
        }
    };


    return (
        <div className='tao-selector'>
            <label>{name}</label>
            <div className='tao-select'>
                <Select  
                    options={options} 
                    isMulti={true}
                    onChange={handleChange}
                    isDisabled={isDisabled}
                    value={selectedValue}
                />  
            </div>
        </div>
    )
}
export default TAOSelector