import axios from "axios";
import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";

import PetitionsCard from "./petitionsCard";


const PetitionsView = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [petitions, setPetitions] = useState<Array<Petitions>>([])


    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    


    useEffect(() => {

        const getPetitons = () => {

            axios.get(process.env.REACT_APP_DOMAIN + '/petitions') 
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

    return ( 
        <div> 
            
            
            {display_all_petitions()}
        </div>
     );
}
 
export default PetitionsView;