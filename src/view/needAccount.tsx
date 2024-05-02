const NeedAccount = (props:any) => {
    return (

        <div className="w-full h-screen justify-center bg-background rounded p-10 flex flex-col gap-10">

        <p className="text-primary font-semibold text-lg">{props.message}</p>
        <p><a href="/register" className="text-blue-500 hover:text-accent duration-300">Create an account</a> or <a href="/login" className="text-blue-500 hover:text-accent duration-300">Login</a> </p>



        </div>


            
       );
}
 
export default NeedAccount;