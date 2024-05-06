import  {useState, useEffect} from 'react';
import './App.css';
import { SelectOptions } from './components/TAOSelector';
import TestOrder from './components/TestOrder';
import getDropDowns from './utilities/fetchdata/getDropdowns';
import getTestOrder from './utilities/fetchdata/getTestOrder';
import { SingleValue}  from 'react-select';
import { SampleOrder } from './components/TestOrder';


enum Selectors {
  DEPARTMENT = 1,
  PROVIDER = 2,
  GENUS =  3,
  ORDERTYPE = 4
}

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
  const [sampleOrder, setSampleOrder] = useState<SampleOrder>({'dept':'0','provider':'0','genus':'0', 'orderType':'0'})
  const [assignedBucket, setAssignedBucket] = useState<string>('None')

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
  }, []);

  const checkSampleOrder = async() => {
    try {
      const bucket = await getTestOrder(sampleOrder);
      setAssignedBucket(bucket[0])
      console.log(bucket[0])
    } catch(err) {
      alert(err)
    }
  }

  useEffect(()=> {
    checkSampleOrder();
  }, [sampleOrder])



  const updateDropDown = (newValue:SingleValue<SelectOptions>) => {
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


  const handleDepartmentsChanged = (id:number, newValue: SingleValue<SelectOptions>) => {
    console.log('filter ID', id, 'new value', newValue);

    if (id === Selectors.GENUS) {
      updateDropDown(newValue);
    }
    let curOrder = {...sampleOrder}
    if (id === Selectors.DEPARTMENT) {
      curOrder.dept = newValue!.value.toString()
    } 
    if (id === Selectors.PROVIDER) {
      curOrder.provider = newValue!.value.toString()
    } 
    if (id === Selectors.GENUS) {
      curOrder.genus = newValue!.value.toString()
    } 
    if (id === Selectors.ORDERTYPE) {
      curOrder.orderType = newValue!.value.toString()
    }
    setSampleOrder(curOrder);
  }






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
            assignedBucket={assignedBucket}
            onResultsChanged={handleDepartmentsChanged}
         />
        </div>
    </div>
  );
}

export default App;
