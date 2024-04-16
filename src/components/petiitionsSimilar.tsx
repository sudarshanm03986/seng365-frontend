import axios from "axios";
import { useEffect, useState } from "react";
import PetitionsCard from "./petitionsCard";



import { FaChevronDown } from "react-icons/fa";

const PetitionsSimilar = (props:any) => {

    const [similarPetitions, setSimilarPetitions] = useState<Array<Petitions>>([]);
    const [sliderCurrent, setSliderCurrent] = useState(0);

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
    return ( errorFlag ? <div> {errorMessage}</div> : 
    <div className="flex flex-col gap-4 p-2 items-center ">
        <div className="flex gap-4 items-center justify-center">
            
            <button disabled={sliderCurrent <= 0 } onClick={()=> setSliderCurrent((sliderCurrent <= 0 ? sliderCurrent: sliderCurrent-1))} className="bg-gray-300  disabled:bg-transparent disabled:text-transparent flex items-center justify-center w-10 h-10 rounded-full text-xl  text-black hover:text-white hover:bg-accent duration-300"><FaChevronDown className="rotate-90"/></button>
            
            {similarPetitions.length === 0 ? "No Similar Petitions" : 
            <div className="w-[500px] h-fit relative overflow-x-hidden  overflow-y-visible shadow-xl rounded-xl">
                
                <div className="flex transition ease-out duration-500 w-fit" style={{transform : `translateX(-${sliderCurrent * 500}px)`}}>
                {similarPetitions.map((data) =>  <div className="w-[500px] "><PetitionsCard petitions={data}/></div> )}
                    
                </div> 
        
            </div>

            }

            <button disabled={sliderCurrent >= similarPetitions.length-1} onClick={()=> setSliderCurrent((sliderCurrent >= similarPetitions.length-1 ? sliderCurrent: sliderCurrent+1))}  className="bg-gray-300  disabled:bg-transparent flex items-center justify-center w-10 h-10 rounded-full text-xl disabled:text-transparent text-black hover:text-white hover:bg-accent duration-300"><FaChevronDown className=" -rotate-90"/></button>

        </div>

        <div className="flex gap-2">
            { similarPetitions.map((data, index) => {

                return (
                    <div className={`w-3 h-3 rounded-full transition duration-400 ${sliderCurrent === index ? 'bg-secondary' : 'bg-gray-300'} `}>
                    </div>
                )
            } )}
        </div>


    </div>);

    
}
 
export default PetitionsSimilar;