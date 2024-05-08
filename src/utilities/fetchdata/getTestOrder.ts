
import { SampleOrder } from "../../components/TestOrder";
import { TAOOrder } from "../../App";


const getTestOrder = async (testOrder:SampleOrder)=> {
      const response = await fetch("http://localhost:5001/testorder", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'testOrder': testOrder})
      });
      if (response) {
        const data: TAOOrder[] = await response.json();
        return data
      }
      return []
  };
  export default getTestOrder;