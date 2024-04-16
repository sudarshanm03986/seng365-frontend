import { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import FormInput from "../components/formInput";





const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [seePassword, setSeePassword] = useState(false);


    return (  <div className="bg-background w-screen h-screen pt-28 flex flex-col gap-2 items-center ">

    <div>
        <h1 className="text-[3rem] font-semibold text-primary">Register</h1>
        <a  href='/login'className="transtion duration-200 text-link hover:text-accent">Already Resister?</a>
    </div>

    <div className="w-lg flex justify-center">

        <form className="flex flex-col w-[500px] gap-2" >
            
            <div className="grid grid-cols-2 gap-2">
                <FormInput 
                    type='text' 
                    placeholder='Enter first name' 
                    label='First Name' 
                    isRequired={true} 
                    setValue={setFirstName}/>

                <FormInput 
                    type='text' 
                    placeholder='Enter last name' 
                    label='Last Name' 
                    isRequired={true} 
                    setValue={setLastName}/>

                
            </div>
            
            <FormInput 
                type='text' 
                placeholder='Enter email' 
                label='Email' 
                isRequired={true} 
                setValue={setLastName}/>

            <FormInput 
                type='password' 
                placeholder='Enter Password' 
                label='Password' 
                isRequired={true} 
                setValue={setLastName}/>


            <FormInput 
             type='file' 
             placeholder='Upload Profile Image' 
             label='Upload Profile Image' 
             isRequired={false} 
             setValue={setLastName}/>
            

            <button type="submit" className="transtion duration-200 hover:shadow-md p-2 bg-gray-300 rounded hover:bg-accent hover:text-white" >Login</button>
           
        </form>

    </div>


</div>
   );
}
 
export default Register;