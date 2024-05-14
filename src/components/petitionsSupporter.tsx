import axios from "axios";
import { useEffect, useState } from "react";

import SupporterImg from "./supporterImg";

import { FaChevronDown } from "react-icons/fa";




const PetitionsSupporter = (props:any) => {

    const [supporter, setSupporter] = useState <Array<Supporter>>([]);
    const [show, setShow] = useState(false);



    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        
        const getSupporter = () => {


            axios.get(process.env.REACT_APP_DOMAIN +  '/petitions/' + props.id + '/supporters')
            .then((res) => {

                const data = res.data.filter((data:supportTiers) => {return data.supportTierId === props.tierId});
                setSupporter(data);

                if ( data.length > 0 ) {
                    props.setHasSupporter(true);
                }

              
            }, (err) => {

                setErrorFlag(true);
                setErrorMessage(err.toString());

            })

        }

        getSupporter();


    }, [props])




    return errorFlag ? <div>{errorMessage}</div> : ( <div className="flex flex-col pt-2 items-center"> 


        <button 
            onClick={()=> setShow(!show)}
            disabled={supporter.length === 0} 
            className=" disabled:text-gray-200 disabled:font-normal text-link hover:text-accent flex items-center gap-1 font-semibold duration-300">{show ? <p>Hide Supporter</p> : <p>Show Supporter </p> }<FaChevronDown className={show ? "rotate-180 duration-300": "duration-300"}/></button>
        
        
        
        
      
        
        <div hidden={!show} className=" rounded-md w-[500px]">
      
            <div className="flex flex-col gap-2">
               {supporter.map((data , index) => 
                {
                
                
                return (<div key={index} className="flex gap-2">
                    <div>
                    <SupporterImg className="w-10 h-10 rounded-full object-cover " id={data.supporterId}/>
                    </div>

                    <div className="flex flex-col bg-gray-200 p-2 w-[90%] shadow-sm rounded-md items-start ">
                        <p className="text-accent font-semibold">{data.supporterFirstName + ' ' + data.supporterLastName}</p>
                        <p className="">"{data.message}"</p>
                    </div>
                    
                    
                    

                </div>) 

                })}
    
                    
                
        </div>


                

                
            

      
        </div>


     </div>);
}
 
export default PetitionsSupporter;