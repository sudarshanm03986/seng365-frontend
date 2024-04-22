import { useState } from "react";

import PetitionsView from "../components/petitionsViews";

const MyPetitions = () => {

    const [seeMyPetition, setSeeMyPetition] = useState(true)


    const handleChange = (e:any) => {

        
        setSeeMyPetition(e.target.value === 'own' ? true : false)

        console.log(seeMyPetition)

    }

    return ( 


    
    <div className="pt-20 w-full h-fit min-h-screen bg-background flex justify-center">

        <div className="xl:w-xl  w-full  flex py-2 flex-col ">

        <h1 className="text-[2rem] font-bold text-primary">My Petitions</h1>

        <div className="flex justify-center p-2">
        <div className="flex flex-row items-center justify-center gap-2 bg-gray-300 w-fit rounded pl-2">

            <p className="font-semibold">Show</p>
            <select className="w-fit p-2 border-gray-300 border-2 rounded-r" onChange={handleChange}> 
                <option selected value={'own'} >My Petitions</option>
                <option value={'support'}>Supported Petitions</option>
            
            </select>

        </div>
        </div>

        
            { seeMyPetition ? <PetitionsView  ownerId={localStorage.getItem('userId')} />
            : <PetitionsView  supportId={localStorage.getItem('userId')} />}

        </div>


</div> );
}
 
export default MyPetitions;