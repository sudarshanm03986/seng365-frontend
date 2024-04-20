import { useState } from "react";
import FormInput from "./formInput";

const AddSupportTier = (props:any) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);

    const add = () => {


        if (props.aupportTiers.length  < 3) {

            return <form>
                    <FormInput 
                    type='text'
                    placeholder='Enter title'
                    label='Support Tier Title'
                    isRequired={false}
                    setValue={setTitle}
                    error={props.error}
                    />

                    <FormInput 
                    type='text-area'
                    placeholder='Enter description'
                    label='Support Tier Description'
                    isRequired={false}
                    setValue={setDescription}
                    error={props.error}
                    />

                    <FormInput 
                    type='text'
                    placeholder='Enter cost'
                    label='Support Tier Cost'
                    isRequired={false}
                    setValue={setCost}
                    error={props.error}
                    />





                     </form>;
        }
        else {
            return;
        }
    }
    return ( 
    <div className="bg-white border-2 border-gray-300 rounded p-2">
        <div>
            {props.aupportTiers.map((data:newSupportTiers) => 
            <div> 
                <p>{data.title}</p>
                <p>{data.description}</p>
                <p>{data.cost}</p>

            </div>)}

        </div>

        {add()}


    </div> );
}
 
export default AddSupportTier;