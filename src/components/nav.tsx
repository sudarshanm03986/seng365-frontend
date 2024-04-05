import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";


const Nav = () => {
    const location = useLocation();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const notActive = "transition duration-300 w-fit text-link font-semibold hover:text-accent"
    const active = "transition duration-300 w-fit text-secondary font-semibold"


    useEffect(() => {
        document.addEventListener('mousedown', () => setShowUserMenu(false));
        document.addEventListener('scroll', () => setShowUserMenu(false));
    
        return () => {
          document.removeEventListener('mousedown',  () => setShowUserMenu(false));
          document.removeEventListener('scroll', () => setShowUserMenu(false));
        };
      }, []);




    const userImage = () => {


        return <div className="">

            <BsPersonFill  className="text-[2rem]"/>
        </div>
    }
    return ( 
        <nav className="w-screen h-20 bg-background shadow-md fixed top-0 left-0 flex items-center justify-center">

            <div className="w-screen px-10 xl:p-0 flex flex-row xl:w-xl justify-between h-fit items-center">
            
            


            <div className="flex flex-row gap-6 items-center"> 
                <h1 className="text-primary font-bold text-[2rem]">Petition</h1>
                <a className={location.pathname === '/' ? active : notActive} href="/">Home</a>
                <a className={location.pathname === '/petitions' ? active : notActive} href="/petitions">Petitions</a>
                <a className={location.pathname === '/supporter' ? active : notActive} href="/supporter">Supporter</a>
                
              
            </div>
            
            <div className="flex flex-row gap-2 ">
                {location.pathname === '/petitions'? "" : <form action="/petitions"className="transition duration-300 p-2 rounded border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent">
                    <input name='q' placeholder="Search Petition" className="appearance-none border-none focus:outline-none bg-transparent"></input>
                    <button type="submit" className=" transition duration-300  text-link hover:text-accent">Search</button>
                </form>}
                {!localStorage.getItem('token') ? 
                    <a href="/login" className="transition duration-300 p-2 rounded border-2 border-gray-300 text-link hover:shadow-md hover:border-accent hover:text-accent">Login</a> :
                    <div className="flex">
                        <button className="transition 
                                            duration-300 
                                            rounded
                                             border-2 
                                              border-gray-300 p-1 
                                               text-link  w-full h-full
                                               flex items-center 
                                               justify-center 
                                               hover:border-accent 
                                               hover:text-accent
                                               focus:shadow-md
                                               hover:shadow-md
                                               focus:border-secondary
                                               focus:text-secondary" 
                        type="button" onClick={() => setShowUserMenu(!showUserMenu)}>{userImage()}</button>

                        {showUserMenu ? 
                        <div className="fixed h-fit translate-y-[3.9rem] -translate-x-10  bg-background w-[8rem] shadow-md flex flex-col border-[1px] border-gray-300 sl">
                            <button className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white"> Profile</button>
                            <button className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white">Logout</button>


                        </div> : ''}



                    </div>
                
                }
            </div>

            </div>


        </nav>
     );
}
 
export default Nav;