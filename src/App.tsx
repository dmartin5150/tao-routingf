import  {useState, useEffect} from 'react';
import './App.css';
import { SelectOptions } from './components/TAOSelector';
import TestOrder from './components/TestOrder';
import getDropDowns from './utilities/fetchdata/getDropdowns';
import { SingleValue}  from 'react-select';


export type DropDown = {
  name: "Department" | "Provider" | "Genus" | "OrderType"
  options: SelectOptions[]
}



const department_options:SelectOptions[] = []
const provider_options:SelectOptions[] = []
const genus_options:SelectOptions[] = []
const orderType_options:SelectOptions[] = []


const defaultDropDowns:DropDown[] = [
  {name: 'Provider', options: provider_options},
  {name: 'Department', options: department_options},
  {name: 'Genus', options: genus_options},
  {name: 'OrderType', options:orderType_options}
]




function App() {

  const [dropDowns, setDropDowns] = useState<DropDown[]>(defaultDropDowns)
  const [initOrderTypes, setInitOrderTypes]= useState<SelectOptions[]>([])

  useEffect(() => {

    const initialize_dropdowns = async () => {
      try {
        const init_dropDowns = await getDropDowns();
        setDropDowns(init_dropDowns)
        const orderTypeDropDowns = init_dropDowns.filter((dropDown) => dropDown.name === 'OrderType');
        console.log('initi order types', orderTypeDropDowns)
        setInitOrderTypes(orderTypeDropDowns[0].options)
      } catch(err) {
        alert(err)
      }
    }
    initialize_dropdowns()
  }, [])

  const handleDepartmentsChanged = (id:number, newValue: SingleValue<SelectOptions>) => {
    console.log('filter ID', id, 'new value', newValue);
    if (id === 3) {
      const newDropDowns = [...dropDowns]

        const orderIndex = dropDowns.findIndex((order) => order.name === 'OrderType');
      if (orderIndex !== -1) {
        if (newValue?.label === 'All') {
          newDropDowns[orderIndex].options = initOrderTypes;
        } else {
          const filteredOrderTypes = initOrderTypes.filter((option) => option.superset! == newValue?.label)
          newDropDowns[orderIndex].options = filteredOrderTypes;
        }
        setDropDowns(newDropDowns);
      }
    }
  }


  useEffect(() => {
    console.log('dropdowns', dropDowns)
  },[dropDowns])


  return (
    <div className="App">
      <header className="App-header">
        <h1>TAO Routing</h1>
      </header>
      <div className='App-panel'>
          <TestOrder
            id={1}
            name={"Departments"}
            isDisabled={false}
            dropDowns={dropDowns}
            onResultsChanged={handleDepartmentsChanged}
         />
        </div>
    </div>
  );
}

export default App;
