import { useState } from "react";
import PetitionsSupporter from "./petitionsSupporter";
import { FaChevronDown } from "react-icons/fa";

const PetitionsSupportTiers = (props: any) => {

    const data = props.data;



    const [showSupporter, setShowSupporter] = useState(false);

    return ( 
    <div>
        <div className="grid grid-cols-3 gap-1 border-t-2 pt-1 ">
                                    
                                        
            <p>{data.title}</p>


            
            <p>{data.description}</p>


        
            <p>{data.cost === 0 ? 'FREE' :'$' + data.cost}</p>


      


        </div> 

        <div className="flex flex-col items-center pt-2">
        <button onClick={()=> setShowSupporter(!showSupporter)} className="flex items-center  font-semibold gap-2 text-link hover:text-accent focus:text-accent duration-300 ">View Supporter <FaChevronDown /></button>
        <PetitionsSupporter id={props.id} tierId={props.tierId} show={showSupporter} />
        </div>

</div>);
}
 
export default PetitionsSupportTiers;