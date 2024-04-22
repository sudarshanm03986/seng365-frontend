import axios from "axios";
import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";

import PetitionsCard from "./petitionsCard";
import PetitionsSearch from "./petitionsSearch";
import PetitionsFilter from "./petitionsFilter";
import PetitionsSort from "./petitionsSort";
import PetitionsPagination from "./petitionsPagination";
import Loading from "../layout/loading";


const PetitionsView = (props: any) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [petitions, setPetitions] = useState<Array<Petitions>>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [numOfPetitions, setNumOfPetitions] = useState(0);


    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(true);
    


    useEffect(() => {

        setTimeout(() => {
            // setData('Loaded data');
            setLoading(false);
          }, 1500); // Simulating a 2-second delay

        const getParams = () => {

            let query = '?'

            query += (searchParams.get('q')) ? `&q=${searchParams.get('q')}` : '';


            const categories = searchParams.getAll('categoryIds');

            query +=  (categories ? categories.map((id) => `&categoryIds=${id}`).join('') : '' );

            query += (searchParams.get('supportingCost') ? `&supportingCost=${searchParams.get('supportingCost')}` : '');

            query += (searchParams.get('sortBy') ? `&sortBy=${searchParams.get('sortBy') }` : '');

            query += (searchParams.get('count') ? `&count=${searchParams.get('count')}` : "&count=10");

            query += (searchParams.get('startIndex') ? `&startIndex=${searchParams.get('startIndex')}` : "&startIndex=0");

            query += (props.ownerId ? `&ownerId=${props.ownerId}` : "")

            query += (props.supportId ? `&supporterId=${props.supportId}` : "")

            return query;

        }

        const getPetitons = () => {

            axios.get(process.env.REACT_APP_DOMAIN + '/petitions' + getParams()) 
            .then((res) => {
                setErrorFlag(false);
                setErrorMessage("");
                setPetitions(res.data.petitions);
                setNumOfPetitions(res.data.count);
               
               
            }, (err) => {
                setErrorFlag(true);
                setErrorMessage(err.toString());
                
            })


        };

    getPetitons();

    }, [searchParams, props])

    const display_all_petitions = () =>{

        return <div className=" grid grid-cols-3 gap-3"> 
        
        
        {petitions.map((petition) => 
        
            <PetitionsCard  petitions={petition}/>)}

        </div>

    }

    return loading ? <Loading /> : ( errorFlag ? <div> {errorMessage}</div> :
        <div className="flex flex-col gap-3 py-3"> 
            <div className="flex items-center justify-between gap-2">
                <div className="flex gap-2">
                    <PetitionsFilter setParams={setSearchParams}/>
                    <PetitionsSort setParams={setSearchParams}/>
                </div>
                
                <PetitionsSearch  setParams={setSearchParams}/>

                
            </div>

            {display_all_petitions()} 

            <PetitionsPagination count={numOfPetitions}  setParams={setSearchParams}/>
        </div>
     );
}
 
export default PetitionsView;