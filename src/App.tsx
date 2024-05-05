import React from 'react';
import './App.css';
import TAOSelector from './components/TAOSelector';
import { SelectOptions } from './components/TAOSelector';
import OrderSelector from './components/OrderSelector';
import TestOrder from './components/TestOrder';




export type DropDown = {
  name: "Department" | "Provider" | "Genus" | "OrderType"
  options: SelectOptions[]
}





const department_options:SelectOptions[] = [
  {label: 'Departement 1', 'value': '1'},
  {label: 'Departement 2', 'value': '2'},
  {label: 'Departement 3', 'value': '3'},
  {label: 'Departement 4', 'value': '4'},
]


const provider_options:SelectOptions[] = [
  {label: 'Provider 1', 'value': '1'},
  {label: 'Provider 2', 'value': '2'},
  {label: 'Provider 3', 'value': '3'},
  {label: 'Provider 4', 'value': '4'},
]


const genus_options:SelectOptions[] = [
  {label: 'Genus 1', 'value': '1'},
  {label: 'Genus 2', 'value': '2'},
  {label: 'Genus 3', 'value': '3'},
  {label: 'Genus 4', 'value': '4'},
]

const orderType_options:SelectOptions[] = [
  {label: 'Order Type 1', 'value': '1'},
  {label: 'Order Type 2', 'value': '2'},
  {label: 'Order Type 3', 'value': '3'},
  {label: 'Order Type 4', 'value': '4'},
]

const dropDowns:DropDown[] = [
  {name: 'Provider', options: provider_options},
  {name: 'Department', options: department_options},
  {name: 'Genus', options: genus_options},
  {name: 'OrderType', options:orderType_options}
]


const handleDepartmentsChanged = () => {
  console.log('Department Changed')
}

function App() {
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
