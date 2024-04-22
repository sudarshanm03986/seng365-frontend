import axios from "axios";
import { useEffect , useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import PetitionsSupportTiers from "./petitionsSupportTiers";
import PetitionsSimilar from "./petiitionsSimilar";
import Alert from "../layout/alert";
import EditPetitions from "./editPetitions";

const  PetitionView = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    const [categoryName, setCategoryName] = useState("");

    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //=======Pop up=========
    const [remove, setRemove] = useState(false);
    const [edit, setEdit] = useState(false);




    const [petition, setPetition] = useState<Petition>({"petitionId" : 0, 
                                                        "title" : "", 
                                                        "categoryId" : 0, 
                                                        "ownerId" : 0, 
                                                        "ownerFirstName" : "", 
                                                        "ownerLastName" : "", 
                                                        "numberOfSupporters" : 0,
                                                        "creationDate" : "",
                                                        "description" : "",
                                                        "moneyRaised" : 0,
                                                        "supportTiers": []});



    useEffect(() => {

        const getPetition = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/' + id)
            .then ((res) => {   

                setErrorFlag(false);
                setErrorMessage("");
                setPetition(res.data);

            

            }, (err) => {
                
                setErrorFlag(true);
                setErrorMessage(err.toString());


            })
        }

        getPetition();

    },[id])


    useEffect(() => {
        const getOwnerImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + petition.ownerId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroOwnerImage(imageUrl);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                
            })

        }

        const getPetitionImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/' + petition.petitionId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroPetitionImage(imageUrl);

                
            }, (err) => {

                setHeroPetitionImage(DefaultPetitionImg);
                
            })
        }



        getPetitionImage();
        getOwnerImage();

    }, [petition.categoryId, petition.petitionId, petition.ownerId])


    const handleTriggerDelete = () => {

        axios.delete(process.env.REACT_APP_DOMAIN + '/petitions/' + petition.petitionId, 
            {headers: 
                {  
                    "x-authorization" : localStorage.getItem('token')
                }
        })
        .then ((res) => {
            

            navigate('/myPetitions');
            window.location.reload();


        }, (err) => {

            switch (err.response.status) { 
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                   
                    window.location.reload();
                    break;

                case 403:
                    setErrorFlag(true);
                    setErrorMessage(err.toString());
                    break;

                case 404:
                    setErrorFlag(true);
                    setErrorMessage(err.toString());
                    break;
            }

        } )


        

    }



    const alertRemove = () =>  {

        return <Alert>

            <div className="w-[400px] h-fit bg-background rounded p-2 flex flex-col gap-10">
                <p className="font-semibold">This action can not be undone.<br/> Are you sure you want to delete this Petition?</p>

                <div className="flex flex-row justify-evenly">
                    <button onClick={()=> setRemove(false)} className="p-2 bg-gray-300 rounded hover:bg-accent duration-300 hover:shadow">Cancel</button>
                    <button onClick={handleTriggerDelete} className="p-2 bg-secondary text-white rounded  hover:bg-red-500 duration-300 hover:shadow">Delete</button>
                </div>
            </div>

            
        </Alert>
    } 


    

    return ( errorFlag ? <div> {errorMessage} </div> :
    <div className="flex flex-col gap-7">

        {remove ? alertRemove() : ""}
        {edit ? <EditPetitions petition={petition} setTrigger={setEdit} /> : ""}
            <div className="grid grid-cols-3  justify-center items-center">
                    <div>
                    </div>
                    <h1 className="text-[2.8rem] font-bold text-primary">{petition.title}</h1>
                    { localStorage.getItem('token') && localStorage.getItem('userId') && parseInt(localStorage.getItem('userId') || '', 10) === petition.ownerId ?  <div className="flex justify-end text-[1.8rem] gap-2">
                        <button onClick={()=> setEdit(true)} className="hover:text-accent duration-300 text-link"><FaRegEdit/></button>
                        <button onClick={()=> setRemove(true)} className="hover:text-red-500 duration-300 text-link"><MdDelete/></button>

                    </div> : <div></div>}

                </div>

        <div className="flex gap-5"> 
            <div className=" h-[384px] shadow-lg rounded-xl w-[384px] bg-white overflow-hidden">
            <img src={heroPetitionImage} alt={petition.petitionId.toString()} className=" w-full h-full object-cover  rounded-xl" /> 
            </div>

            <div className="flex flex-col w-[50%] gap-2 bg-white rounded-xl shadow-lg justify-evenly p-2">

           
                
                <div className="flex flex-col gap-2  justify-center items-center">
                    <h2 className="text-secondary text-xl font-semibold">Description</h2>
                    <p>{petition.description}</p>
                </div>

                <div className=" grid grid-cols-3">

                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Total Supporter</h2>
                        <p>{petition.numberOfSupporters}</p>
                    </div>
                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Total money raised</h2>
                        <p>${petition.moneyRaised}</p>
                    </div>

                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Created Date</h2>
                        <p>{new Date (petition.creationDate).toLocaleDateString()}</p>
                    </div>

                </div>

            </div>

            <div className="grid grid-rows-2 w-[20%] p-2 bg-white rounded-xl shadow-lg justify-evenly">
                <div className=" flex justify-center items-center ">
                    <img alt={petition.ownerId.toString()} className="w-[150px] h-[150px] border-2 border-secondary  bg-gray-200 rounded-full object-contain " src={heroOwnerImage}/>
                </div>

                <div className="flex flex-col justify-evenly items-center">
                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">First Name</h2>
                        <p>{petition.ownerFirstName}</p>
                    </div>

                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Last Name</h2>
                        <p>{petition.ownerLastName}</p>
                    </div>
                    
                </div>

            </div>

            
            
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-primary font-semibold text-[2rem]">Support Tiers</h1>
           

            <div className="w-full p-3 flex flex-col gap-2 bg-white rounded-xl shadow-lg">
               
                <div className=" grid grid-cols-3  pt-1 ">
                        <h2 className="text-secondary text-xl font-semibold">Title</h2>
                        <h2 className="text-secondary text-xl font-semibold" >Description</h2>
                        <h2 className="text-secondary text-xl font-semibold">Cost</h2>
                       
                    </div>


                <div className={ `flex flex-col w-full gap-2  justify-evenly `} >
                    
                    {petition.supportTiers.map( (data:supportTiers) => {

                        return <PetitionsSupportTiers data={data} id={petition.petitionId} tierId={data.supportTierId}/>
                        })}
                    

                </div>
            </div>

            



        </div>
        <div className=" p-2 ">
                <h2 className="text-primary font-semibold text-[2rem]">Similar Petitions</h2>

                
                <PetitionsSimilar id={petition.petitionId} ownerId={petition.ownerId} categoryId={petition.categoryId} />

        </div>



        
    </div> );
}
 
export default PetitionView;