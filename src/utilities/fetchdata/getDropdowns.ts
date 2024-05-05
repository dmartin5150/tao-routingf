import { DropDown } from "../../App";



const getDropDowns = async ()=> {
      const response = await fetch("http://localhost:5001/alloptions", {
        method:'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response) {
        const data: DropDown[] = await response.json();
        return data
      }
      return []
  };
  export default getDropDowns;