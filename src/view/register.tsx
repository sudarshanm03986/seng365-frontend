import { useState } from "react";
import FormInput from "../components/formInput";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const isValidEmail = (email: string): boolean => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return emailRegex.test(email);
  };



const Register = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});

    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState<File>()



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         // Validation
        const newErrors: { [key: string]: string[] } = {};

        if (!firstName.trim()) {
            newErrors.firstName = ["First name is required"];
        }

        if (!lastName.trim()) {
            newErrors.lastName = ["Last name is required"];
        }

        if (!email.trim()) {
            newErrors.email = ["Email is required"];
          } else if (!isValidEmail(email)) {
            newErrors.email = ["Invalid email format"];
          }
        
        if (!password.trim()) {
            newErrors.password = ["Password is required"];
        } else if (password.length < 6) {
            newErrors.password = ["Password must be at least 6 characters long"];
        }


        if (file && !(['image/png', 'image/gif', 'image/jpg', 'image/jpeg'].includes(file.type))) {
            
            newErrors.file = ['File type invalid, Valid file are PNG, GIF and JPEG'];
     
        }

        if (Object.keys(newErrors).length > 0) {
            // If there are validation errors, setErrors and stop form submission
            setErrors(newErrors);
            return;
        }


        const formData = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password
        }

        axios.post(process.env.REACT_APP_DOMAIN + '/users/register', formData)
        .then ((res) => {


            
            axios.post(process.env.REACT_APP_DOMAIN + '/users/login', 
                {   email: formData.email,
                    password: formData.password
                  } )
            .then ((response)=> {

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);

                if (file) {
                    console.log(file);
                    const contentType = file.type;
                    axios.put(process.env.REACT_APP_DOMAIN + '/users/'+ response.data.userId + '/image', 
                        file, 
                        {headers: 
                            {   "Content-Type" : contentType, 
                                "x-authorization" : localStorage.getItem('token')
                            }
                        }
                    )
                    .then ((responses) => {
                        navigate('/');
                        window.location.reload();
                        
                    }, (err) => {

                        console.log(err)
                        navigate('/');
                        window.location.reload();

                    }) 


                    } else {
                        navigate('/');
                        window.location.reload();

                    }

                
        

            }, (err) => {

                console.log(err);
                navigate('/');
                window.location.reload();
            } )

            
            

        }, (err) => {


            switch (err.response.status) {
                case 403:
                    setErrors({email: ["Email already exists"]});
                    break;
                case 400:
                    const newErrors: { [key: string]: string[] } = {};

                    if (err.response.statusText.includes('firstName')) {
                            newErrors.firstName = ["Invalid First Name"];
                    }

                    if (err.response.statusText.includes('lastName')) {
                        newErrors.lastName = ["Invalid last Name"];
                    }


                    if (err.response.statusText.includes('email')) {
                        newErrors.email = ["Invalid email"];
                    }

                    if (err.response.statusText.includes('password')) {
                        newErrors.password = ["Invalid password"];
                    }
                    setErrors(newErrors);

                    break;
            }

            

            
            
        })
       

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
                    setValue={setFirstName}
                    error={errors.firstName}/>

                <FormInput 
                    type='text' 
                    placeholder='Enter last name' 
                    label='Last Name' 
                    isRequired={true} 
                    setValue={setLastName}
                    error={errors.lastName}/>

                
            </div>
            
            <FormInput 
                type='text' 
                placeholder='Enter email' 
                label='Email' 
                isRequired={true} 
                setValue={setEmail}
                error={errors.email}/>

            <FormInput 
                type='password' 
                placeholder='Enter Password' 
                label='Password' 
                isRequired={true} 
                setValue={setPassword}
                error={errors.password}/>


            <FormInput 
             type='file' 
             placeholder='Upload Profile Image' 
             label='Upload Profile Image' 
             isRequired={false} 
             setValue={setFile}
             error={errors.file}/>
            

            <button type="submit" className="transtion duration-200 hover:shadow-md p-2 bg-gray-300 rounded hover:bg-accent hover:text-white" >Resister</button>
           
        </form>



    </div>


</div>
   );
}
 
export default Register;