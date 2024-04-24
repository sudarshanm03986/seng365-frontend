import { useEffect, useState , useRef} from "react";

import DefaultOwnerImg from './../assets/default_owner_img.png'
import axios from "axios";

import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Alert from "../layout/alert";
import EditProfile from "../components/editProfile";

const ViewProfile = () => {

    

    const[userInfo, setUserInfo] = useState<{firstName: string, lastName: string, email: string}>({firstName:"", lastName: "", email: ""});
    const[heroOwnerImage, setHeroOwnerImage] = useState("");
    const [hasImage, setHasImage] = useState(false);

    const inputFile = useRef<HTMLInputElement>(null);
    


    const [deleteImg, setDeleteImg] = useState(false);


    useEffect(() => {

        const getOwnerImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId') + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroOwnerImage(imageUrl);
                setHasImage(true);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                setHasImage(false);
                
            })

            

        }


        const getUserInfo = () => {

            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId'),
            {headers: 
                {  
                    "x-authorization" : localStorage.getItem('token')
                }
            })
            .then((res) => {

                setUserInfo(res.data);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                
            })


        }



        if (localStorage.getItem('token') && localStorage.getItem('userId')) {
            getOwnerImage();
            getUserInfo();
        }




    },[])

    

    const handleDeleteImg = () => {

        axios.delete(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId') + '/image',
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        }
        ) 
        .then ((res) => { 

            window.location.reload();

        }, (err) => {

            window.location.reload();

        })
    }

    const handleUplaodImg = (e:any) => {
        const file = e.target.files?.[0] as File;
        const contentType = file.type

        // console.log(file);

        if (file && (['image/png', 'image/gif', 'image/jpg', 'image/jpeg'].includes(contentType))) {

            axios.put(process.env.REACT_APP_DOMAIN + '/users/' + localStorage.getItem('userId') + '/image', 
                file, 
                {headers: 
                    {   "Content-Type" : contentType, 
                        "x-authorization" : localStorage.getItem('token')
                    }
                }
            ) 
            .then ((res) => {

                console.log('Image Update Succesfull')
                window.location.reload();


            }, (err) => {
                console.log(err);
                window.location.reload();


            })

        } else {

            console.error("Invalid Image")

        }
        

    }

    const alertDeleteImg = () => {

        return <Alert>

            <div className="w-[400px] h-fit flex flex-col bg-white rounded gap-4 p-4 ">

                <p>Are you sure you want to delete your profile image? This action can not be undone.</p>


                <div className=" grid grid-cols-2 gap-2">
                    <button onClick={()=> setDeleteImg(false)} className="p-2 bg-gray-300 rounded duration-300 text-black hover:text-white hover:bg-accent">Cancel</button>
                    <button onClick={handleDeleteImg} className="p-2 bg-secondary rounded duration-300 text-white hover:bg-red-500">Delete</button>

                </div>


            </div>





        </Alert>
    }

    

    return ( 
    <div className=" w-full h-fit pt-20 min-h-screen bg-background flex justify-center ">
        {deleteImg ? alertDeleteImg() : ""}
        <div className="xl:w-xl  w-full  flex py-2   flex-col items-center gap-5 ">

            <h1 className="text-[2rem] font-bold text-primary">Your Profile</h1>

            <div className=" relative">
                <img alt={localStorage.getItem('userId')?.toString()} className="h-[300px] w-[300px] object-cover object-center rounded-lg shadow-lg" src={heroOwnerImage}/>

                <button  onClick={() => inputFile.current?.click()} className=" absolute bottom-2 right-2 text-[1.8rem] text-white p-2 bg-secondary rounded-lg shadow-md duration-300 hover:bg-accent"><BiEdit/></button>
                <button disabled={!hasImage} onClick={()=> setDeleteImg(true)} className=" disabled:bg-link disabled:text-gray-300 absolute bottom-2 left-2 text-[1.8rem] text-black shadow-md duration-300 hover:bg-red-500 hover:text-white  p-2 bg-gray-300 rounded-lg"><MdDelete/></button>

            </div> 


            <div className="bg-white w-[500px] shadow-lg rounded-lg flex flex-col p-4 gap-4">

                <div>
                    {/* <p className="text-secondary font-semibold text-lg " >Name</p> */}

                    <p className="text-[1.5rem] text-primary font-semibold ">{userInfo.firstName} {userInfo.lastName}</p>
                </div>

                <div>
                    <p className="text-secondary font-semibold text-lg "  >Email</p>
                    <p className="">{userInfo.email}</p>
                </div>



            </div>


            <EditProfile  user={userInfo}/>


            <input type="file" ref={inputFile} onChange={handleUplaodImg} accept="image/png,image/gif,image/jpeg, image/jpg" hidden />
    
        </div> 
    </div> );
}
 
export default ViewProfile;