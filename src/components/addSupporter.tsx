import { useState } from "react";
import Alert from "../layout/alert";

const AddSupporter = (props : any) => {


    const [support, setSupport] = useState(false)



    return ( <div>
        <button onClick={()=> setSupport(true)} className=" hover:bg-accent text-[1.0rem] font-semibold hover:text-white bg-secondary py-3 px-3 rounded duration-300 text-white flex items-center justify-center gap-2 ">Support</button>
        {support ? <Alert>

            <div className="w-[500px] h-fit bg-background rounded p-2 flex flex-col gap-10">



sds

            </div>




        </Alert> : ""}
    
    </div>);
}
 
export default AddSupporter;