import React, {useState, useEffect} from 'react';
import './App.css';
import TAOSelector from './components/TAOSelector';
import { SelectOptions } from './components/TAOSelector';
import OrderSelector from './components/OrderSelector';
import TestOrder from './components/TestOrder';
import getDropDowns from './utilities/fetchdata/getDropdowns';



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


const handleDepartmentsChanged = () => {
  console.log('Department Changed')
}

function App() {

  const [dropDowns, setDropDowns] = useState<DropDown[]>(defaultDropDowns)

  useEffect(() => {

    const initialize_dropdowns = async () => {
      try {
        const init_dropdowns = await getDropDowns();
        setDropDowns(init_dropdowns)
        console.log(init_dropdowns)
      } catch(err) {
        alert(err)
      }
    }
    initialize_dropdowns()
  }, [])




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
