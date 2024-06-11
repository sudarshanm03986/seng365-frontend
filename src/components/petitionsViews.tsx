import axios from "axios";
import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";

import PetitionsCard from "./petitionsCard";
import PetitionsSearch from "./petitionsSearch";
import PetitionsFilter from "./petitionsFilter";
import PetitionsSort from "./petitionsSort";
import PetitionsPagination from "./petitionsPagination";
// import Loading from "../layout/loading";
import CardSkeleton from "../layout/cardSkeleton";


const PetitionsView = (props: any) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [petitions, setPetitions] = useState<Array<Petitions>>([]);
    // const [currentPage, setCurrentPage] = useState(1);
    const [numOfPetitions, setNumOfPetitions] = useState(0);

    const [isLoading, setIsLoading] = useState(true);
    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // const [loading, setLoading] = useState(true);
    


    useEffect(() => {

        // setTimeout(() => {
        //     // setData('Loaded data');
        //     setLoading(false);
        //   }, 1500); // Simulating a 2-second delay

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
                setIsLoading(false);
               
               
            }, (err) => {
                setErrorFlag(true);
                setErrorMessage(err.toString());
                setIsLoading(false);
                
            })


        };

    getPetitons();

    }, [searchParams, props])

    const display_all_petitions = () =>{


        const load = []

        for (let i = 0 ; i < parseInt(searchParams.get('count') || '10', 10); i++ ) {

            load.push(<CardSkeleton/>)
        }

        return <div className=" grid xl:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3"> 
        
        {isLoading && <>{load}</>}
        
        {!isLoading &&petitions.map((petition:Petitions) => {
        
            return (<PetitionsCard key={petition.petitionId}  petitions={petition}/>)})}

        </div>

    }

    return ( errorFlag ? <div> {errorMessage}</div> :
        <div className="flex flex-col gap-3 py-3"> 
            <div className="flex items-center md:justify-between gap-2 md:flex-row flex-col">
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