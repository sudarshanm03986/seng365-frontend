import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../layout/alert";
import FormInput from "./formInput";
import axios from "axios";

const isValidEmail = (email: string): boolean => {
    // Regular expression for basic email validation
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    return emailRegex.test(email);
  };



const EditProfile = (props:any) => {

    const navigate = useNavigate();
    const [showPopUp, setShowPopUp] =  useState(false);

    const userInfo:User = props.user ;

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});
 
    const handleLogout = () => {

        axios.post(process.env.REACT_APP_DOMAIN + '/users/logout', 
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        }) 
        .then ((res) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
            window.location.reload();
    



        }, (err) => {
            
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
            window.location.reload();
    

        })



       


    }

    const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation
        const newErrors: { [key: string]: string[] } = {};


        if (firstName === userInfo.firstName) {
            newErrors.firstName = ["Same first name as old first name"];
            }

        if (lastName === userInfo.lastName) {
            newErrors.lastName = ["Same last name as old last name"];
            }


        if ( email && !isValidEmail(email)) {
        newErrors.email = ["Invalid email format"];
        }

        if ( oldPassword && oldPassword.length < 6) {
            newErrors.oldPassword = ["Password must be at least 6 characters long"];
        }

        
        else if ( newPassword && newPassword.length < 6) {
            newErrors.newPassword = ["Password must be at least 6 characters long"];
        }

        else if (oldPassword && newPassword && oldPassword === newPassword) {
            newErrors.oldPassword = ["Password must not be same"];
            newErrors.newPassword = ["Password must not be same"];
        } else if ((oldPassword && !newPassword) || (!oldPassword && newPassword) ) {
            newErrors.oldPassword = ["Both Password Field are requierd"];
            newErrors.newPassword = ["Both Password Field are requierd"];
        }

        if (Object.keys(newErrors).length > 0) {
            // If there are validation errors, setErrors and stop form submission
            setErrors(newErrors);
            return;
        }

        
        const formData = {
            ...(firstName !== '' && firstName !== userInfo.firstName && {firstName : firstName} ),
            ...(lastName !== '' && lastName !== userInfo.lastName && {lastName : lastName} ),
            ...(email !== '' && email !== userInfo.email && {email : email} ),
            ...(newPassword !== '' && { password : newPassword} ),
            ...(oldPassword !== '' && { currentPassword  : oldPassword} )
            
        }

        axios.patch(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId'), formData,
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        })
        .then ((res) => {

            window.location.reload();

        }, (err) => {

            
            switch (err.response.status) { 

                case 400:

                    const newErrors: { [key: string]: string[] } = {};


                    if (err.response.statusText.includes('data/firstName')) {
                        newErrors.firstName = ["Invalid firstName"];
                    }

                    if (err.response.statusText.includes('data/lastName')) {
                        newErrors.lastName = ["Invalid lastName"];
                    }

                    if (err.response.statusText.includes('data/email')) {
                        newErrors.email = ["Invalid email"];
                    }

                    if (err.response.statusText.includes('data/password')) {
                        newErrors.newPassword = ["Invalid Password"];
                    }

                    if (err.response.statusText.includes('data/currentPassword')) {
                        newErrors.oldPassword = ["Invalid password"];
                    }

                    setErrors(newErrors);

                    break;

                case 401:

                    if (err.response.statusText.includes('currentPassword')) {
                        setErrors({oldPassword : [err.response.statusText]})
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');
                        navigate('/');
                        window.location.reload();
                    }

                    break;
                case 403:
                    
                    if (err.response.statusText.includes('Email')) {
                        setErrors({email : [err.response.statusText]})
                    }

                    if (err.response.statusText.includes('password')) {
                        setErrors({newPassword : [err.response.statusText], oldPassword : [err.response.statusText]})
                    }

                    break;
            }


        })

    

        


    }


    const alertEdit = () => {

        return <Alert>

            <div className="bg-white rounded w-[500px] flex max-h-full h-fit flex-col p-4 gap-2  overflow-y-auto">
                <p className="text-primary font-semibold text-[1.4rem]">Edit Profile</p>
                <p className="text-secondary font-semibold">Only enter in the field you want to update</p>

                <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-2">

                    <FormInput 
                        type='text'
                        placeholder={userInfo.firstName}
                        label='First name'
                        
                        setValue={setFirstName}

                        error={errors.firstName}
                    
                    />
                    <FormInput 
                        type='text'
                        placeholder={userInfo.lastName}
                        label='Last name'
                        
                        setValue={setLastName}
                        error={errors.lastName}
                    
                    
                    />
                     <FormInput 
                        type='text'
                        placeholder={userInfo.email}
                        label='Email'
                        error={errors.email}
                        setValue={setEmail}
                    
                    
                    />

                    <p className="text-red-500 pt-3">Enter your current and new password to change your password</p>


                    <FormInput 
                        type='password'
                      
                        label='Current password'
                        isRequired={newPassword || oldPassword}
                        error={errors.oldPassword}
                        setValue={setOldPassword}
                    
                    
                    />


                    <FormInput 
                        type='password'
                        error={errors.newPassword}
                        label='New password'
                        isRequired={oldPassword || newPassword}
                        setValue={setNewPassword}
                    
                    
                    />

                    <div className=" grid grid-cols-2 gap-2 pt-2">
                        <button type='button' onClick={()=> {setShowPopUp(false); setErrors({})}} className="rounded p-2 bg-gray-300 duration-300 hover:bg-accent hover:text-white">Cancel</button>
                        <button type='submit' className="rounded p-2 bg-secondary text-white duration-300 hover:bg-accent" >Update</button>
                    </div>
                </form>

            </div>



        </Alert>

    }


   
    return  ( 
    <div className=" grid grid-cols-2 gap-2 w-[500px]">

        {showPopUp ? alertEdit() : ""}
        <button className="rounded p-2 bg-gray-300 duration-300 hover:bg-accent hover:text-white" onClick={handleLogout}>Logout</button>
        <button className="rounded p-2 bg-secondary text-white duration-300 hover:bg-accent" onClick={()=> setShowPopUp(true)}>Edit Profile</button>

    </div> );
}
 
export default EditProfile;