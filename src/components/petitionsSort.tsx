import { useSearchParams } from "react-router-dom";


const PetitionsSort = (props:any) => {
    const [searchParams] = useSearchParams();

    const handleChange = (e:any) => {

        searchParams.delete("sortBy");

        if (e.target.value === 'Most Recent') {
            searchParams.append('sortBy', 'CREATED_DESC');
        } 
        
        else if (e.target.value === 'Oldest') {
            searchParams.append('sortBy', 'CREATED_ASC');
        }

        else if (e.target.value === 'Lowest Cost') {
            searchParams.append('sortBy', 'COST_ASC');
        }
        else if (e.target.value === 'Lowest Cost') {
            searchParams.append('sortBy', 'COST_DESC');
        }

        else if (e.target.value === 'Alphabetical A-Z') {
            searchParams.append('sortBy', 'ALPHABETICAL_ASC');
        }

        else if (e.target.value === 'Alphabetical Z-A') {
            searchParams.append('sortBy', 'ALPHABETICAL_DESC');
        } else {
            searchParams.append('sortBy', 'CREATED_DESC');

        }

        props.setParams(searchParams);



    


    }


    return ( 
        <div className="flex flex-row rounded border-2 border-gray-300">
            <p className="bg-gray-300  p-2 " >Sort by</p>
            <select onChange={handleChange} className="  p-2">
                <option>Oldest</option>
                <option>Most Recent</option>
                
                <option>Lowest Cost</option>
                <option>Highest Cost</option>
                <option>Alphabetical A-Z</option>
                <option>Alphabetical Z-A</option>

            </select>
            
        </div>
     );
}
 
export default PetitionsSort;