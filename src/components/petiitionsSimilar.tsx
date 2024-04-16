import axios from "axios";
import { useEffect, useState } from "react";
import PetitionsCard from "./petitionsCard";
import Petition from "../view/petition";

const PetitionsSimilar = (props:any) => {

    const [similarPetitions, setSimilarPetitions] = useState<Array<Petitions>>([]);

    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect (() => {

        const getOwnerParams = () => {

            let query = '?'

            query += `&ownerId=${props.ownerId}`

            // query += 


            return query;

        }


        const getCategoryParams = () => {

            let query = '?'

            query += `&categoryIds=${props.categoryId}`

         


            return query;

        }

        const getPetitons = () => {

            const ownerRequest = axios.get(process.env.REACT_APP_DOMAIN + '/petitions' + getOwnerParams());
            const categoryRequest = axios.get(process.env.REACT_APP_DOMAIN + '/petitions' + getCategoryParams());

            axios.all([ownerRequest, categoryRequest])
                .then((res) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setSimilarPetitions((res[0].data.petitions.concat(res[1].data.petitions)).filter((petition:Petitions) => petition.petitionId !== props.id));
                }, (err) => {
                            setErrorFlag(true);
                            setErrorMessage(err.toString());
                })


            };
                

        

    getPetitons();
  



    }, [props])
    return ( errorFlag ? <div> {errorMessage}</div> : <div className="w-full flex flex-row overflow-auto">
            

        {similarPetitions.map((data) => {
        
        return <div className="w-[500px]"><PetitionsCard petitions={data}/></div>})}

    </div> );
}
 
export default PetitionsSimilar;