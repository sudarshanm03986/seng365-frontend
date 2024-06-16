import axios from "axios";
import { useEffect , useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";

import PetitionsSupportTiers from "./petitionsSupportTiers";
import PetitionsSimilar from "./petiitionsSimilar";
import Alert from "../layout/alert";
import EditPetitions from "./editPetitions";


const  PetitionView = () => {

    const {id} = useParams();

    const navigate = useNavigate();



    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    // const [categoryName, setCategoryName] = useState("");

    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [newTierErrors,setNewTierErrors] = useState<{[key: string] : string[] }>({})

    //=======Pop up=========
    const [remove, setRemove] = useState(false);
    const [edit, setEdit] = useState(false);
    const [addTier, setAddTier] = useState(false)
    

    //======== New Support Tier ==========
    const [newTierTitle, setNewTierTitle] = useState('');
    const [newTierDescription, setNewTierDescription] = useState('');
    const [newTierCost, setNewTierCost] = useState(0);


    //======= Load Boolean =======================
    const [isPetitionLoaded, setIsPetitionLoaded] = useState(false);
    const [isOwnerLoaded, setIsOwnerLoaded] = useState(false);




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


//========= Get Petition Info ================
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

// ========== Get Image =====================
    useEffect(() => {
        const getOwnerImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + petition.ownerId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroOwnerImage(imageUrl);
                setIsOwnerLoaded(true);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                setIsOwnerLoaded(true);
                
            })

        }

        const getPetitionImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/' + petition.petitionId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroPetitionImage(imageUrl);
                setIsPetitionLoaded(true);


                
            }, (err) => {

                setHeroPetitionImage(DefaultPetitionImg);
                setIsPetitionLoaded(true);
                
            })
        }



        getPetitionImage();
        getOwnerImage();

    }, [petition.petitionId, petition.ownerId])
    

//============= DELETE ========================================================
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

//============== Upload New Support Tier ===============
const handleUploadNewTier = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const newErrors: { [key: string]: string[] } = {};
    //validate
    if (!newTierTitle.trim()) {
        newErrors.title = ["Title is required"];
    }

    if (!newTierDescription.trim()) {
        newErrors.description = ["Description is required"];
    }

    if (!(newTierCost >= 0)) {
        newErrors.cost = ["Cost cant be lower then 0"];
    }

    if (Object.keys(newErrors).length > 0) {
        // If there are validation errors, setErrors and stop form submission
        setNewTierErrors(newErrors);
        return;
    }


    //process 

    const newTier = {title : newTierTitle,
                    description : newTierDescription,
                    cost: newTierCost       
    }

    axios.put(process.env.REACT_APP_DOMAIN + '/petitions/' + petition.petitionId + '/supportTiers', 
    newTier, 
    {headers: 
        {  
            "x-authorization" : localStorage.getItem('token')
        }
    })
    .then ((res) => {

        setAddTier(false);
        window.location.reload();


    }, (err) => {

        switch (err.response.status) {
            case 400:
                const newErrors: { [key: string]: string[] } = {};

                if (err.response.statusText.includes(`title`)) {
                    newErrors.title =  ["Invalid Title"];
                }

                if (err.response.statusText.includes(`description`)) {
                    newTierErrors.description = ["Invalid description"];
                }
                
                if (err.response.statusText.includes(`cost`)) {
                    newTierErrors.cost = ["Invalid cost"];
                }



                setNewTierErrors(newErrors);
                break;
            case 401:

                // Unauthorixed


                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');

                    setAddTier(false);
                    window.location.reload();
                
                break;
            
            case 403: {

                if (err.response.statusText.includes('Duplicate')) {
                    setNewTierErrors ({title: ['Support title not unique within petition']})

                }

            }


            }
        }

    )




}




//============= Alert Delate Petition ===================
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


//=============== Add Supporter Tier ========================
const alertAddTiers = () => {

    

    return (<Alert>
                <div className="w-[500px] h-fit bg-background rounded p-4 flex flex-col gap-10 ">
            <div className="flex flex-col gap-2  items-center">
            <div className="py-4">
                <h1 className="text-primary font-semibold text-[1.6rem]">Add Support Tiers</h1>
            </div>
            
            <form onSubmit={handleUploadNewTier} className={` bg-gray-200 rounded  flex flex-col gap-2 p-2 ${newTierErrors.title || newTierErrors.description || newTierErrors.cost ? 'border-red-500 border-2' : ''}`}>
                
                <div className="text-left">
                    <label className="font-medium text-secondary">Title</label>
                    <input 
                    className={`transtion duration-200 p-2 bg-white border-2 ${newTierErrors.title ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus-within:shadow-md `}
                    type='text'
                    placeholder='Enter title'
                    name="title"
                    required
                    
                    onChange={(e) => setNewTierTitle(e.target.value)}
                    />
                   {newTierErrors.title && <span className="text-red-500">{newTierErrors.title}</span>}
                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Description</label>
                    <textarea 
                    cols={50}
                    rows={4}
                    className={`transtion duration-200 p-2 bg-white border-2 ${newTierErrors.description ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus:shadow-md `}
                    name="description"
                    placeholder='Enter description'
                    required
                    
                    
                    onChange={(e) => setNewTierDescription(e.target.value)}
                    />  
                    {newTierErrors.description && <span className="text-red-500">{newTierErrors.description}</span>}
                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Cost (Enter 0 for Free)</label>
                
                    <input 
                         className={`transtion duration-200 p-2 bg-white border-2 ${newTierErrors.cost ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus-within:shadow-md `}
                        type='number'
                        placeholder={'Enter cost or (Leave empty if free)'}
                        name="cost"
                        required
                        value={newTierCost}
                       
                        onChange={(e) => setNewTierCost(parseInt(e.target.value, 10))}
                    />
                     {newTierErrors.cost && <span className="text-red-500">{newTierErrors.cost}</span>}
                </div>

                <div className="grid grid-cols-2 gap-2 py-3">
                    <button onClick={()=> setAddTier(false)} type="button" className="p-2 bg-gray-300 rounded hover:bg-accent hover:text-white duration-300">Cancel</button>
                    <button type="submit"  className="p-2 bg-secondary text-white rounded hover:bg-accent hover:text-white duration-300">Upload</button>
                      
                </div>

                </form>

        </div>

        
       

          



        </div>

    





    </Alert>)

}

    

    return ( errorFlag ? <div> {errorMessage} </div> :
    <div className="flex flex-col gap-7">
        {remove ? alertRemove() : ""}
        {edit ? <EditPetitions petition={petition} setTrigger={setEdit} /> : ""}
        { addTier ?  alertAddTiers(): ""}
            <div className="flex relative justify-center items-center">
                    <div>
                    </div>
                    <h1 className="text-[2.8rem] font-bold text-primary">{petition.title}</h1>
                    { localStorage.getItem('token') && localStorage.getItem('userId') && parseInt(localStorage.getItem('userId') || '', 10) === petition.ownerId ?  <div className=" absolute right-0 flex justify-end text-[1.2rem] gap-2">
                    <button onClick={()=> setEdit(true)} className=" hover:bg-accent  hover:text-white bg-gray-300 py-1 px-2 rounded duration-300 text-black flex items-center justify-center gap-2 ">Edit <BiEdit/></button>
                        <button  disabled={petition.numberOfSupporters > 0} onClick={()=> setRemove(true)} className=" disabled:bg-link disabled:text-gray-300 hover:bg-red-500  hover:text-white bg-gray-300 py-1 px-2 rounded duration-300 text-black flex items-center justify-center gap-2 "><MdDelete/></button>
                        
                    </div> : <div></div>}

                </div>

        <div className="flex gap-5"> 
        {isPetitionLoaded ?  <div className=" relative h-[384px] shadow-lg rounded-xl w-[384px] bg-white overflow-hidden">
            <img src={heroPetitionImage} alt={petition.petitionId.toString()} className=" w-full h-full object-cover  rounded-xl" />  </div> :  <Skeleton height={"384px"} width={"384px"} borderRadius={"0.75rem"} />} 
            
           

            <div className=" relative flex flex-col w-[50%] gap-2 bg-white rounded-xl shadow-lg justify-evenly p-2">

          
                
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
                        <p>${petition.moneyRaised ? petition.moneyRaised : 0}</p>
                    </div>

                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Created Date</h2>
                        <p>{new Date (petition.creationDate).toLocaleDateString()}</p>
                    </div>

                </div>

            </div>

            <div className="grid grid-rows-2 w-[20%] p-2 bg-white rounded-xl shadow-lg justify-evenly">
                <div className=" flex justify-center items-center ">
                    {isOwnerLoaded ? <img alt={petition.ownerId.toString()} className="w-[150px] h-[150px] border-4 border-secondary  bg-gray-200 rounded-full object-center object-cover " src={heroOwnerImage}/> : <Skeleton width={"150px"} height={"150px"} borderRadius={"100%"}/> }
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
            <div className="grid grid-cols-3  justify-center items-center">
                <div></div>
                <h1 className="text-primary font-semibold text-[2rem]">Support Tiers</h1>
                { localStorage.getItem('token') && localStorage.getItem('userId') && parseInt(localStorage.getItem('userId') || '', 10) === petition.ownerId ?  <div className="flex justify-end text-[1.2rem] gap-2">
                    <button disabled={petition.supportTiers.length >= 3}  onClick={() => setAddTier(true)}className=" disabled:bg-link disabled:text-gray-300 hover:bg-secondary  hover:text-white bg-gray-300 py-1 px-1 rounded duration-300 text-black flex items-center justify-center gap-1 "><IoIosAdd className="text-[2rem]"/></button>

                    </div> : <div></div>}
                
            </div>
           

            <div className="w-full p-3 flex flex-col gap-2 bg-white rounded-xl shadow-lg">
               
                <div className=" grid grid-cols-3  pt-1 ">
                        <h2 className="text-secondary text-xl font-semibold">Title</h2>
                        <h2 className="text-secondary text-xl font-semibold" >Description</h2>
                        <h2 className="text-secondary text-xl font-semibold">Cost</h2>
                       
                    </div>


                <div className={ `flex flex-col w-full gap-2  justify-evenly `} >
                    
                    {petition.supportTiers.map( (data:supportTiers, index) => {

                        return <PetitionsSupportTiers key={index} disabled={petition.supportTiers.length <= 1} ownerId={petition.ownerId} data={data} petitionId={petition.petitionId} tierId={data.supportTierId}/>
                              
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