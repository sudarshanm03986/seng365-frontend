

import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const PetitionsSearch = (props:any) => {

    const [searchParams] = useSearchParams();

    const handleChange = (e:any) => {

        searchParams.delete('q');

        if (e.target.value) {
            searchParams.append('q', e.target.value);
        }

        props.setParams(searchParams)

    }

    return ( 
        <div className="flex flex-row items-center bg-white gap-2 transition duration-300 p-2 rounded border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent w-96">
            <div className=" text-gray-400">
                <FaSearch/>
            </div>
            <input maxLength={64} className="appearance-none border-none focus:outline-none bg-transparent w-full" placeholder="Search Petitions" value={searchParams.get('q')?.toString() || ""} onChange={handleChange}/>
        </div>
        
     );
}
 
export default PetitionsSearch;