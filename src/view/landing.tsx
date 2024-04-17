


const Landing = () => {
    return ( <div className="bg-background w-screen h-screen flex justify-center ">

        <div className="w-xl flex flex-col justify-center items-center gap-3">

            <h1 className="text-primary text-[5rem]">Petition</h1>
            <div className="flex gap-10">
            {!localStorage.getItem('token')?
            <><a href="/login" className="transtion duration-200 text-link hover:text-accent text-[1.5rem]">Login</a>
            <a href="/register" className="transtion duration-200 text-link hover:text-accent text-[1.5rem]">Register</a></>:
            <><a href="/petitions" className="transtion duration-200 text-link hover:text-accent text-[1.5rem]">View</a>
            <a href="/users" className="transtion duration-200 text-link hover:text-accent text-[1.5rem]">Add</a>
            <a href="/users" className="transtion duration-200 text-link hover:text-accent text-[1.5rem]">Profile</a></> }
            </div>


        </div>
        
        </div> );
}
 
export default Landing;