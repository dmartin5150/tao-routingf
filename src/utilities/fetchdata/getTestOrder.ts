
import { SampleOrder } from "../../components/TestOrder";


const getTestOrder = async (testOrder:SampleOrder)=> {
      const response = await fetch("http://localhost:5001/testorder", {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'testOrder': testOrder})
      });
      if (response) {
        const data: string[] = await response.json();
        return data
      }
      return []
  };
  export default getTestOrder;