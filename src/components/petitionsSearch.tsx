
import { useSearchParams } from "react-router-dom";
const PetitionsSearch = (props:any) => {

    const [searchParams, setSearchParams] = useSearchParams();



    return ( 
    
        <input placeholder="Search Petitions" value={searchParams.get('q')?.toString()} onChange={e=> setSearchParams({'q' : e.target.value})}/>
        
     );
}
 
export default PetitionsSearch;