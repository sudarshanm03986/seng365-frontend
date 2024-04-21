import { useState } from "react";
import FormInput from "./formInput";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddSupportTier = (props:any) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);

    const handleChange = (index:number, e: any ) => {


    }

    const add = () => {

        props.setSupportTiers([...props.supportTiers, {title:'', description:'', cost:0 }])

        
    }
    return ( 
    <div className="p-2">
        <div>
            {props.supportTiers?.map((data:newSupportTiers, index:number) => 
            <form>
                <input 
                type='text'
                placeholder='Enter title'
                required
                value={data.title}
                onChange={(e) => handleChange(index, e)}
                />

                <textarea 
                cols={50}
                rows={4}
                placeholder='Enter description'
                required
                value={data.description}
                onChange={(e) => handleChange(index, e)}
                />  

                <input 
                    type='number'
                    placeholder='Enter cost'
                    required
                    value={data.cost}
                    onChange={(e) => handleChange(index, e)}
                />

                </form> )}

        </div>

        <button onClick={() => add() }className="p-1 bg-secondary text-white w-full rounded hover:bg-accent hover:text-white duration-300 flex justify-center text-[2rem]" type="button"><IoIosAddCircleOutline/></button>
            
        

    </div> );
}
 
export default AddSupportTier;