
import { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";

const Login = () => {

    const [seePassword, setSeePassword] = useState(false)


    return ( 
        <div className="bg-background w-screen h-screen pt-28 flex flex-col gap-2 items-center ">

            <div>
                <h1 className="text-[3rem] font-semibold text-primary">login</h1>
                <a  href='/register'className="transtion duration-200 text-link hover:text-accent">Register?</a>
            </div>

            <div className="w-lg flex justify-center">

                <div className="flex flex-col w-72 gap-2" >
                    
                    <div className="transtion duration-200 p-2 border-2 border-gray-300 rounded w-full focus-within:border-accent hover:border-accent hover:shadow-md focus-within:shadow-md">
                    <input type="text" placeholder="Enter username" className="appearance-none border-none focus:outline-none bg-transparent w-full" />
                    </div>

                    <div className="transtion duration-200 p-2 border-2 border-gray-300 rounded flex flex-row gap-1  focus-within:border-accent hover:border-accent hover:shadow-md focus-within:shadow-md">
                    <input type={seePassword ? "text" : "password"} placeholder="Enter password" className="w-full appearance-none border-none focus:outline-none bg-transparent"/>
                    <button onClick={()=> setSeePassword(!seePassword)}className="transtion duration-200 text-link hover:text-accent ">{seePassword ? <FaEye/> : <FaEyeSlash/>}</button>
                    </div>

                    <button className="transtion duration-200 hover:shadow-md p-2 bg-gray-300 rounded hover:bg-accent hover:text-white" >Login</button>

                </div>

            </div>


        </div>
     );
}
 
export default Login;