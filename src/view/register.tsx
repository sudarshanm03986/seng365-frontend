import { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import FormInput from "../components/formInput";
import axios from "axios";





const Register = () => {

    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState('')



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        }

        axios.post(process.env.REACT_APP_DOMAIN + '/users/register', formData)
        .then ((res) => {

            console.log('wow');

        }, (err) => {

            console.log(err);
            

        })
        console.log(formData)

    }

    


    


    return (  <div className="bg-background w-screen h-screen pt-28 flex flex-col gap-2 items-center ">

    <div>
        <h1 className="text-[3rem] font-semibold text-primary">Register</h1>
        <a  href='/login'className="transtion duration-200 text-link hover:text-accent">Already Resister?</a>
    </div>

    <div className="w-lg flex justify-center">

        <form onSubmit={handleSubmit} className="flex flex-col w-[500px] gap-2" >
            
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
                setValue={setEmail}/>

            <FormInput 
                type='password' 
                placeholder='Enter Password' 
                label='Password' 
                isRequired={true} 
                setValue={setPassword}/>


            <FormInput 
             type='file' 
             placeholder='Upload Profile Image' 
             label='Upload Profile Image' 
             isRequired={false} 
             setValue={setFile}/>
            

            <button type="submit" className="transtion duration-200 hover:shadow-md p-2 bg-gray-300 rounded hover:bg-accent hover:text-white" >Login</button>
           
        </form>

    </div>


</div>
   );
}
 
export default Register;