import { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";

const PetitionsFilter = () => {

    const [filterShow, setFilterShow] = useState(false);


    useEffect(() => {
        document.addEventListener('mousedown', () => setFilterShow(false));
        document.addEventListener('scroll', () => setFilterShow(false));
    
        return () => {
          document.removeEventListener('mousedown',  () => setFilterShow(false));
          document.removeEventListener('scroll', () => setFilterShow(false));
        };
      }, []);
    return ( 
        <div>
            <button onClick={()=> setFilterShow(true)} className=" transition duration-300 py-2 px-6 rounded bg-link text-white hover:shadow-lg focus:shadow-lg hover:bg-accent focus:bg-accent"><div className="flex items-center gap-1 justify-between"><FaFilter/> <p className="font-semibold">Filter</p></div></button>

            {filterShow ? 
            <div className="absolute h-fit bg-background w-[8rem] shadow-md flex flex-col border-[1px] border-gray-300 sl">
                            <button className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white">Profile</button>
                            <button className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white">Logout</button>


            </div> 
            
             : ""}
    
        </div> 
        );
}
 
export default PetitionsFilter;