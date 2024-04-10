import axios from "axios";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";

import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'

const  PetitionView = () => {

    const {id} = useParams();

    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    const [categoryName, setCategoryName] = useState("")

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

                setPetition(res.data);

            

            }, (err) => {
                console.log(err)


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

    return ( 
    <div className="flex flex-col">

        <h1 className="text-[3rem] font-semibold text-primary">{petition.title}</h1>

        <div className="flex flex-row pt-10"> 
            <img src={heroPetitionImage} className="w-[30%] rounded-xl" /> 

            <div>


            </div>
            
        </div>

        
    </div> );
}
 
export default PetitionView;