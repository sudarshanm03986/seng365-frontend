import axios from "axios";
import { useEffect, useState } from "react";

import SupporterImg from "./supporterImg";

import { FaChevronDown } from "react-icons/fa";




const PetitionsSupporter = (props:any) => {

    const [supporter, setSupporter] = useState <Array<Supporter>>([]);


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




    return props.show ? ( 
        
        <div className=" bg-background w-[90%] float-right">
        <table className="w-full table-fixed gap-2">
            <tr className="text-accent text-sm font-thin">
                {/* <th className="py-3">Title</th> */}
                <th>Message</th>
                <th>Profile Picture</th>
                <th>Firstname</th>
                <th>Lastname</th>
            </tr>
            
               {supporter.map((data) => 
                {
                
                
                return (<tr className=" even:bg-gray-100 ">
                    <td className="">{data.message}</td>
                    <td className="py-2 flex items-center justify-center"><SupporterImg className="w-20 h-20 rounded-full object-cover " id={data.supportId}/></td>
                    <td className="">{data.supporterFirstName}</td>
                    <td className="">{data.supporterLastName}</td>

                </tr>) 

                })}
    
                    
                



                

                
            

        </table>
        </div>

     ): <></>;
}
 
export default PetitionsSupporter;