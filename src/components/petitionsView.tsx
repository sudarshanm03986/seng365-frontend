import axios from "axios";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";

import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'
import PetitionsSupporter from "./petitionsSupporter";

const  PetitionView = () => {

    const {id} = useParams();

    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    const [categoryName, setCategoryName] = useState("");

    //========ERROR=======
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");




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


        const getCategory = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/categories') 
            .then((res) => {

                for(const category of res.data) {

                    if (category.categoryId === petition.categoryId ) {
                        setCategoryName(category.name);
                    }
                }
                
                
            }, (err) => {

                console.log(err)
                
            })

        }

        getCategory();
        getPetitionImage();
        getOwnerImage();

    }, [petition.categoryId, petition.petitionId, petition.ownerId])

    return ( errorFlag ? <div> {errorMessage}</div> :
    <div className="flex flex-col gap-7">

            <div className="flex  justify-center items-center">
                    <h1 className="text-[2.8rem] font-bold text-primary">{petition.title}</h1>
              
                </div>

        <div className="flex gap-5"> 
            <div className="h-fit shadow-lg rounded-xl w-[30%] bg-white">
            <img src={heroPetitionImage} alt={petition.petitionId.toString()} className=" w-full rounded-xl" /> 
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
               
                <div className=" grid grid-cols-3   pt-1 ">
                        <h2 className="text-secondary text-xl font-semibold">Title</h2>
                        <h2 className="text-secondary text-xl font-semibold" >Description</h2>
                        <h2 className="text-secondary text-xl font-semibold">Cost</h2>
                    </div>


                <div className={ `flex flex-col w-full gap-2  justify-evenly `} >
                    
                    {petition.supportTiers.map( (data:supportTiers) => {

                        return <div className="grid grid-cols-3 gap-1 border-t-2 pt-1 ">
                            
                                
                                <p>{data.title}</p>
                            
                        
                                
                                <p>{data.description}</p>
                            
                        
                              
                                <p>{data.cost === 0 ? 'FREE' :'$' + data.cost}</p>
                        

                        </div>
                        })}
                    

                </div>
            </div>

            



        </div>
        <div className=" p-2 ">
                <h2 className="text-primary font-semibold text-[1.7rem]">Supporter</h2>

                <PetitionsSupporter  id={petition.petitionId} supporterTiers={petition.supportTiers}/>


        </div>



        
    </div> );
}
 
export default PetitionView;