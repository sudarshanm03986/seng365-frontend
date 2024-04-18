
import { useState } from "react";
import FormInput from "../components/formInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email: string): boolean => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return emailRegex.test(email);
  };

const Login = () => {
    

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

      
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        const newErrors: { [key: string]: string[] } = {};

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

        if (Object.keys(newErrors).length > 0) {
            // If there are validation errors, setErrors and stop form submission
            setErrors(newErrors);
            return;
        }


        axios.post(process.env.REACT_APP_DOMAIN + '/users/login', 
        {   email: email,
            password: password
          } )
    .then ((res)=> { 
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);

        navigate('/');
        window.location.reload();


    }, (err) => {

        switch (err.response.status) {
            case 400:
                const newErrors: { [key: string]: string[] } = {};
                if (err.response.statusText.includes('email')) {
                    newErrors.email = ["Invalid email"];
                }

                if (err.response.statusText.includes('password')) {
                    newErrors.password = ["Invalid password"];
                }
                setErrors(newErrors);

                break;

            case 401:
                setErrors({login: ["Incorrect email/password"], email: [], password:[]});
                break;

        }




    } )





    }


    return ( 
        <div className="bg-background w-screen h-screen pt-28 flex flex-col gap-2 items-center ">

            <div>
                <h1 className="text-[3rem] font-semibold text-primary">login</h1>
                <a  href='/register'className="transtion duration-200 text-link hover:text-accent">Register?</a>
            </div>

            <div className="w-lg flex justify-center">

                <form onSubmit={handleSubmit}className="flex flex-col w-72 gap-2" >
                    <span className="text-red-500">{errors.login}</span>
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

                    <button type="submit" className="transtion duration-200 hover:shadow-md p-2 bg-gray-300 rounded hover:bg-accent hover:text-white" >Login</button>

                </form>

            </div>


        </div>
     );
}
 
export default Login;