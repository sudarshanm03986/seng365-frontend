import { useState } from "react";
import PetitionsSupporter from "./petitionsSupporter";


const PetitionsSupportTiers = (props: any) => {

    const data = props.data;



   

    return ( 
    <div>
        <div className="grid grid-cols-3 gap-1 border-t-2 pt-1 ">
                                    
                                        
            <p>{data.title}</p>


            
            <p>{data.description}</p>


        
            <p>{data.cost === 0 ? 'FREE' :'$' + data.cost}</p>


      


        </div> 

        
      
        <PetitionsSupporter id={props.id} tierId={props.tierId}/>
       

</div>);
}
 
export default PetitionsSupportTiers;