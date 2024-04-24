import { useEffect, useState } from "react";
import Alert from "../layout/alert";
import FormInput from "./formInput";
import axios from "axios";

const AddSupporter = (props : any) => {

    const [supported, setSupported] = useState(false)

    const [support, setSupport] = useState(false);

    const [message, setMessage] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        axios.post(process.env.REACT_APP_DOMAIN + '/petitions/' + props.petitionId + '/supporters',
            {
                supportTierId : props.tierId,
                ...(message !== '' && {'message' : message}),

            },
            {headers: 
                {  
                    "x-authorization" : localStorage.getItem('token')
                }
            }
        )
        .then ((res)=> {

            setSupport(false);
            window.location.reload();


        }, (err) => {

            switch (err.response.status) { 

                case 400 :
                    setErrorFlag(true);
                    setErrorMessage(err.response.statusText);
                    break;
                case 401:
                    // Unauthor
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');

                    setSupport(false);
                    window.location.reload();

                    break;
                
                case 403:
                    setErrorFlag(true);
                    setErrorMessage(err.response.statusText);
                    break;


                case 404:
                    setErrorFlag(true);
                    setErrorMessage("Petition/SupportTier not found please reload");


            }




        })

    }

    useEffect(() => {
        
        const getSupporter = () => {


            axios.get(process.env.REACT_APP_DOMAIN +  '/petitions/' + props.petitionId + '/supporters')
            .then((res) => {
                
                for (const supporter of res.data.filter((data:Supporter) => {return data.supportTierId === props.tierId})) {
                    if (supporter.supporterId === parseInt(localStorage.getItem('userId')|| '-1', 10)) {
                        setSupported(true);

                    }

                    console.log(supporter.supporterId)

                }

            }, (err) => {

                setErrorFlag(true);
                setErrorMessage(err.toString());

            })

        }

        getSupporter();


    }, [props])

    return ( <div>
        
        <button disabled={supported} onClick={()=> setSupport(true)} className=" hover:bg-accent disabled:bg-link disabled:text-gray-300  font-semibold hover:text-white bg-secondary py-2 px-3 rounded duration-300 text-white flex items-center justify-center gap-2 disabled:text-sm disabled:font-normal">{ supported ? <p>Already <br/>Supported </p> :  'Support'}</button>
        {support ? (localStorage.getItem('token') && localStorage.getItem('userId') ? <Alert>

            <div className="w-[500px] h-fit bg-background rounded p-4 flex flex-col gap-2">

                <p className="text-primary font-semibold text-lg">Are you sure you want to support this Support Tier?</p>

                <div className="pt-2">
                <p className="text-secondary font-semibold">Title</p>
                <p>{props.title}</p>
                </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {errorFlag ? <span className="text-red-500">{errorMessage}</span> : ""}

            <FormInput
                label='Leave a message'
                type='text-area'
                placeholder='Enter your message'
                setValue={setMessage}
                isRequired={false}
                

            />

            <div className="flex gap-2">
            <button type="button" onClick={()=> setSupport(false)} className="p-2 bg-gray-300 text-black w-full rounded hover:bg-accent hover:text-white duration-300 flex justify-center ">Cancel</button>
            <button type='submit' className="p-2 bg-secondary text-white w-full rounded hover:bg-accent hover:text-white duration-300 flex justify-center ">Support</button>
            </div>
            </form>

            </div>




        </Alert> : <Alert>

            <div className="w-[500px] h-fit bg-background rounded p-10 flex flex-col gap-10">

                <p className="text-primary font-semibold text-lg">You need an account to support</p>
                <p><a href="/register" className="text-blue-500 hover:text-accent duration-300">Create an account</a> or <a href="/login" className="text-blue-500 hover:text-accent duration-300">Login</a> </p>


                <button onClick={() => setSupport(false)} className="p-2 bg-gray-300 rounded hover:bg-accent hover:text-white duration-300" >Done</button>

            </div>
        </Alert>): ""}
    
    </div>);
}
 
export default AddSupporter;