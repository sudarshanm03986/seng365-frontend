import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import DefaultOwnerImg from './../assets/default_owner_img.png';


const Nav = () => {
    const location = useLocation();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [heroOwnerImage, setHeroOwnerImage] = useState("");

    const notActive = "transition duration-300 w-fit text-link font-semibold hover:text-accent"
    const active = "transition duration-300 w-fit text-secondary font-semibold"

    const navigate = useNavigate();

    useEffect(() => {
        const getOwnerImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId') + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroOwnerImage(imageUrl);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                
            })

            

        }

        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            getOwnerImage();
        }
    
    })





    const userImage = () => {


        return <div className=" w-8  h-8 overflow-hidden ">
            <img className="w-full h-full object-cover" alt={localStorage.getItem('userId')?.toString()} src={heroOwnerImage} />
        </div>
    }
    return ( 
        <nav className="w-screen h-20 bg-background shadow-md fixed top-0 left-0 flex items-center justify-center z-10">

            <div className="w-screen px-10 xl:p-0 flex flex-row xl:w-xl justify-between h-fit items-center">
            
            


            <div className="flex flex-row gap-6 items-center"> 
                <h1 className="text-primary font-bold text-[2rem]">Petition</h1>
                <a className={location.pathname === '/' ? active : notActive} href="/">Home</a>
                <a className={location.pathname === '/petitions' ? active : notActive} href="/petitions">Petitions</a>
                <a className={location.pathname === '/supporter' ? active : notActive} href="/supporter">Supporter</a>
                
              
            </div>
            
            <div className="flex flex-row gap-2 ">
                {location.pathname === '/petitions'? "" : <form action="/petitions"className="transition duration-300 p-2 bg-white rounded border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent">
                    <input name='q' placeholder="Search Petition" className="appearance-none border-none focus:outline-none bg-transparent"></input>
                    <button type="submit" className=" transition duration-300  text-link hover:text-accent">Search</button>
                </form>}
                {!localStorage.getItem('token') ? 
                    <a href="/login" className="transition duration-300 p-2 bg-gray-300 rounded border-2 font-semibold border-gray-300 text-black hover:shadow-md hover:bg-accent hover:border-accent hover:text-white">Login</a> :
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
                            <button className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white">Profile</button>
                            <button onClick={()=> {localStorage.removeItem('token'); localStorage.removeItem('userId'); navigate('/');window.location.reload();}} className=" transition duration-300 p-2 text-link hover:bg-accent hover:text-white">Logout</button>


                        </div> : ''}



                    </div>
                
                }
            </div>

            </div>


        </nav>
     );
}
 
export default Nav;