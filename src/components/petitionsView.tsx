import axios from "axios";
import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";

import PetitionsCard from "./petitionsCard";
import PetitionsSearch from "./petitionsSearch";
import PetitionsFilter from "./petitionsFilter";
import PetitionsSort from "./petitionsSort";


const PetitionsView = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [petitions, setPetitions] = useState<Array<Petitions>>([])


    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    


    useEffect(() => {

        const getParams = () => {

            let query = '?'

            query += (searchParams.get('q')) ? `&q=${searchParams.get('q')}` : '';

            return query

        }

        const getPetitons = () => {

            axios.get(process.env.REACT_APP_DOMAIN + '/petitions' + getParams()) 
            .then((res) => {
                setErrorFlag(false)
                setErrorMessage("")
                setPetitions(res.data.petitions)
               
            }, (err) => {
                setErrorFlag(true)
                setErrorMessage(err.toString())
            })


        };

    getPetitons();

    })

    const display_all_petitions = () =>{

        return <div className=" grid grid-cols-3 gap-3"> 
        
        
        {petitions.map((petition) => 
        
            <PetitionsCard  petitions={petition}/>)}

        </div>

    }

    return ( errorFlag ? <div> {errorMessage}</div> :
        <div className="flex flex-col gap-2 py-3"> 
            <div className="flex items-center gap-2">
                
                <PetitionsSearch/>
                <PetitionsFilter/>
                <PetitionsSort/>
            </div>

            {display_all_petitions()} 
        </div>
     );
}
 
export default PetitionsView;