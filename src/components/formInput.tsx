import { useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";




const FormInput = (props:any) => {
    const [seePassword, setSeePassword] = useState(false);


    const getInput = () => {

        if (props.type === "file") {
            return (
            <div className="text-left">

                <label className=" font-medium text-secondary">{props.label} {props.isRequired ? '*': ''}</label>
                <div className={` transtion duration-200 p-2 bg-white border-2 ${props.error ? "border-red-300" : "border-gray-300 " }  rounded w-full  hover:shadow-md focus-within:shadow-md `}>
                    <input required={props.isRequired} onChange={(e) => props.setValue(e.target.files?.[0] as File)} type="file" accept="image/png,image/gif,image/jpeg, image/jpg" placeholder="Upload you profile image " className="appearance-none border-none focus:outline-none bg-transparent w-full" />
                </div>
                <span className="text-red-500">{props.error}</span>
            </div>
            );
        } else if (props.type === "password") {
           
            return (
                <div className="text-left">

                    <label className=" font-medium text-secondary">{props.label} {props.isRequired ? '*': ''}</label>
                    <div className={`transtion duration-200 p-2 border-2 bg-white rounded flex flex-row gap-1 ${props.error ? "border-red-500" : "border-gray-300 " } hover:shadow-md focus-within:shadow-md`}>
                    <input onChange={(e) => props.setValue(e.target.value) } type={seePassword ? "text" : "password"} placeholder="Enter password" className="w-full appearance-none border-none focus:outline-none bg-transparent"/>
                    <button type="button" onClick={()=> setSeePassword(!seePassword)}className="transtion duration-200 text-link hover:text-accent ">{seePassword ? <FaEye/> : <FaEyeSlash/>}</button>
                    </div>
                    <span className="text-red-500">{props.error}</span>
                </div>
            );
        }else if (props.type === "text-area") {
            return (
            <div className="text-left">

                <label className=" font-medium text-secondary">{props.label} {props.isRequired ? '*': ''}</label>
                <div className={` transtion duration-200 p-2 bg-white border-2 ${props.error ? "border-red-500" : "border-gray-300 " }  rounded w-full  hover:shadow-md focus-within:shadow-md `}>
                    <textarea rows={4} cols={50} onChange={(e) => props.setValue(e.target.value) } required={props.isRequired} placeholder={props.placeholder} className="appearance-none border-none focus:outline-none bg-transparent w-full" />
                </div>
                <span className="text-red-500">{props.error}</span>
            </div>);
        } 
        
        
        
        else {
            return (
            <div className="text-left">

                <label className=" font-medium text-secondary">{props.label} {props.isRequired ? '*': ''}</label>
                <div className={` transtion duration-200 p-2 bg-white border-2 ${props.error ? "border-red-500" : "border-gray-300 " }  rounded w-full  hover:shadow-md focus-within:shadow-md `}>
                    <input type="text" onChange={(e) => props.setValue(e.target.value) } required={props.isRequired} placeholder={props.placeholder} className="appearance-none border-none focus:outline-none bg-transparent w-full" />
                </div>
                <span className="text-red-500">{props.error}</span>
            </div>);
        }

    }


    return (
        <div>
            
            {getInput()}

        </div> );
}
 
export default FormInput;