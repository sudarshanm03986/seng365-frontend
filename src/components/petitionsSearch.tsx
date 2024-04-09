
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const PetitionsSearch = (props:any) => {

    const [searchParams] = useSearchParams();




    return ( 
        <div className="transition duration-300 p-2 rounded border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent w-96">
            <input className="appearance-none border-none focus:outline-none bg-transparent w-full" placeholder="Search Petitions" value={searchParams.get('q')?.toString()} onChange={e=> props.setParams({'q' : e.target.value})}/>
        </div>
        
     );
}
 
export default PetitionsSearch;