import axios from "axios";
import { useEffect, useState } from "react";

import SupporterImg from "./supporterImg";

import { FaChevronDown } from "react-icons/fa";




const PetitionsSupporter = (props:any) => {

    const [supporter, setSupporter] = useState <Array<Supporter>>([])


    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        
        const getSupporter = () => {


            axios.get(process.env.REACT_APP_DOMAIN +  '/petitions/' + props.id + '/supporters')
            .then((res) => {

                setSupporter(res.data);

            }, (err) => {

                setErrorFlag(true);
                setErrorMessage(err.toString());

            })

        }

        getSupporter();


    }, [props])

    const getTitle = (tierId:number) => {

        for(const tier of props.supporterTiers) {

            if (tierId === tier.supportTierId) {

                return tier.title;
            }
        }

    }



    return ( 
        
        <div className="bg-white shadow-lg rounded-xl">
        <table className="w-full gap-2">
            <tr className="text-secondary text-xl font-semibold">
                <th className="py-3">Title</th>
                <th>Message</th>
                <th>Profile Picture</th>
                <th>Firstname</th>
                <th>Lastname</th>
            </tr>
            
                {supporter.map((data) => 
                {
                
                
                return (<tr className=" even:bg-gray-100 ">
                    <td className="">{getTitle(data.supportTierId)}</td>
                    <td className="">{data.message}</td>
                    <td className="py-2 flex items-center justify-center"><SupporterImg className="w-20 h-20 rounded-full object-cover " id={data.supportId}/></td>
                    <td className="">{data.supporterFirstName}</td>
                    <td className="">{data.supporterLastName}</td>

                </tr>) 

                }
                



                )}
                
            

        </table>


        {/* <button className="p-2 underline text-link hover:text-accent duration-300 ">More<FaChevronDown/></button> */}
        </div>

     );
}
 
export default PetitionsSupporter;