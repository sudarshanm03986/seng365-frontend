const Alert = (props:any) => {
    return ( 
    <div className="w-screen h-screen fixed bg-link top-0 left-0 z-20  bg-opacity-50 flex justify-center p-2 ">

       {props.children}

    </div>

     );
}
 
export default Alert;