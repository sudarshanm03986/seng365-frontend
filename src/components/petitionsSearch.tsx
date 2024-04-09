
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const PetitionsSearch = (props:any) => {

    const [searchParams] = useSearchParams();

    const [searchQ, setSearchQ] = useState("");



    useEffect(() => {

        const setQ = () => {

            searchParams.delete('q')

            if (searchQ !== '') {
                searchParams.append('q', searchQ);
            }

        props.setParams(searchParams);

        }




    
    setQ();
        
    }, [searchQ])


    const handleChange = (e:any) => {

        setSearchQ(e.target.value);
        console.log(searchQ )

    }

    useEffect (() => {
    setSearchQ(searchParams.get('q')?.toString() || "");
    })

    return ( 
        <div className="transition duration-300 p-2 rounded border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent w-96">
            <input className="appearance-none border-none focus:outline-none bg-transparent w-full" placeholder="Search Petitions" value={searchQ} onChange={handleChange}/>
        </div>
        
     );
}
 
export default PetitionsSearch;