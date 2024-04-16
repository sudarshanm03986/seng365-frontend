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

                setSupporter(res.data.filter((data:supportTiers) => {return data.supportTierId === props.tierId}));

            }, (err) => {

                setErrorFlag(true);
                setErrorMessage(err.toString());

            })

        }

        getSupporter();


    }, [props])




    return( <div className="flex flex-col pt-2 items-center"> 


        <button 
            onClick={()=> setShow(!show)}
            disabled={supporter.length === 0} 
            className=" disabled:text-gray-200 text-link hover:text-accent flex items-center gap-1 font-semibold duration-300">{show ? <p>Hide Supporter</p> : <p>Show Supporter </p> }<FaChevronDown className={show ? "rotate-180 duration-300": "duration-300"}/></button>
        
        
        
        
        {/* {show ? (  */}
        
        <div hidden={!show} className=" rounded-md w-[500px]">
        {/* <table className="w-full  gap-2"> */}
            {/* <tr className="text-accent text-sm font-thin">
              
                <th>Profile Picture</th>
                <th>Name</th>
                <th>Message</th>
                
            </tr> */}
            <div className="flex flex-col gap-2">
               {supporter.map((data) => 
                {
                
                
                return (<div className="flex gap-2">
                    <div>
                    <SupporterImg className="w-10 h-10 rounded-full object-cover " id={data.supportId}/>
                    </div>

                    <div className="flex flex-col bg-gray-200 p-2 w-[90%] shadow-sm rounded-md items-start ">
                        <p className="text-accent font-semibold">{data.supporterFirstName + ' ' + data.supporterLastName}</p>
                        <p className="">"{data.message}"</p>
                    </div>
                    
                    
                    

                </div>) 

                })}
    
                    
                
        </div>


                

                
            

        {/* </table> */}
        </div>

     {/* ): <></>} */}
     </div>);
}
 
export default PetitionsSupporter;