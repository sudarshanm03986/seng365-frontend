import axios from "axios";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";

import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'

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
    <div className="flex flex-col gap-5">

        

        <div className="flex flex-row gap-5"> 
            <div className="w-fit h-fit shadow-lg rounded-xl">
            <img src={heroPetitionImage} className=" w-[500px] rounded-xl" /> 
            </div>

            <div className="grid grid-rows-3 w-[100%] gap-4 bg-white rounded-xl shadow-lg justify-evenly p-2">
                <div className="flex  justify-center items-center">
                    <h1 className="text-[2rem] font-semibold text-primary">{petition.title}</h1>
              
                </div>
                <div className="flex flex-col gap-2  justify-center items-center">
                    <h2 className="text-secondary text-xl font-semibold">Description</h2>
                    <p>{petition.description}</p>
                </div>

                <div className=" grid grid-cols-3">

                    <div className="flex flex-col gap-2  justify-center items-center">
                        <h2 className="text-secondary text-xl font-semibold">Total number of Supporter</h2>
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

            
            
        </div>

        <div className="flex gap-5">
            <div className="grid grid-rows-2 w-[500px]  p-2 bg-white rounded-xl shadow-lg justify-evenly">
                <div className=" flex justify-center items-center ">
                    <img className="w-[150px] h-[150px] border-2 border-secondary  bg-gray-200 rounded-full object-contain " src={heroOwnerImage}/>
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

            <div className="w-full p-2 flex flex-col gap-2 bg-white rounded-xl shadow-lg">
                <h1 className="text-primary font-semibold text-[1.5rem]">Support Tiers</h1>
                <div className=" grid grid-cols-3  border-t-2 pt-1 ">
                        <h2 className="text-secondary text-xl font-semibold">Title</h2>
                        <h2 className="text-secondary text-xl font-semibold" >Description</h2>
                        <h2 className="text-secondary text-xl font-semibold">Cost</h2>
                    </div>


                <div className={ `flex flex-col w-full gap-2  justify-evenly `} >
                    
                    {petition.supportTiers.map( (data:supportTiers) => {

                        return <div className="grid grid-cols-3 gap-1 border-t-2 pt-1 ">
                            
                                
                                <p>{data.title}</p>
                            
                        
                                
                                <p>{data.description}</p>
                            
                        
                              
                                <p>${data.cost}</p>
                        

                        </div>
                        })}
                    

                </div>
            </div>
        </div>



        
    </div> );
}
 
export default PetitionView;