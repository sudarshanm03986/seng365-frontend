import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";


import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'



const PetitionsCard = (props: any) => {
    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    const [categoryName, setCategoryName] = useState("")
    const [isHeroImageLoading, setIsHeroImageLoading] = useState(true);
    const [isOwnerLoading, setIsOwnerLoading] = useState(true);

    useEffect(() => {
        const getOwnerImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/users/' + props.petitions.ownerId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroOwnerImage(imageUrl);
                setIsOwnerLoading(false);

                
            }, (err) => {

                setHeroOwnerImage(DefaultOwnerImg);
                setIsOwnerLoading(false);
                
            })

        }

        const getPetitionImage = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/' + props.petitions.petitionId + '/image', { responseType: 'blob'}) 
            .then((res) => {

                const imageUrl = URL.createObjectURL(res.data);
                setHeroPetitionImage(imageUrl);
                setIsHeroImageLoading(false);

                
            }, (err) => {

                setHeroPetitionImage(DefaultPetitionImg);
                setIsHeroImageLoading(false);
                
            })
        }


        const getCategory = async () => {
            await axios.get(process.env.REACT_APP_DOMAIN + '/petitions/categories') 
            .then((res) => {


                for(const category of res.data) {

                    if (category.id === props.petitions.categoryId ) {
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

    }, [props.petitions.categoryId, props.petitions.petitionId, props.petitions.ownerId])


    return ( 

        <a  href={"/petitions/" + props.petitions.petitionId} className=" transition duration-200 flex flex-col gap-2 shadow-lg bg-white  hover:shadow-accent py-5 rounded">
            <div className="flex px-4 gap-5 items-center ">

                {isOwnerLoading && <Skeleton  circle width={45} height={45}/>}
                {!isOwnerLoading && <img src={heroOwnerImage} alt={props.petitions.petiitonId} className="rounded-full w-12 h-12 object-cover border-2 border-secondary"></img>}
               

                <div className="flex flex-col text-left text-sm" >
                    <p className="font-semibold">{props.petitions.ownerFirstName} {props.petitions.ownerLastName}</p>
                    <p className="">{new Date(props.petitions.creationDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div  className="border-y-2">
                {isHeroImageLoading && <div className="flex w-full justify-center"> <div className="h-48 w-48">
            <Skeleton height={"100%"}  borderRadius={0}/>
            </div></div>}

                { !isHeroImageLoading && <img src={heroPetitionImage} alt={props.petitions.ownerId} className="object-contain w-full h-48"></img>}

            </div>

            <div className="flex flex-col gap-3">
                <p className="font-semibold text-primary text-lg">{props.petitions.title}</p>

                <div className=" flex justify-evenly">
                    <div>
                        <p className="font-semibold text-secondary">Category</p>
                        <p>{categoryName || <Skeleton/>}</p>
                    </div>
                    <div>
                        <p  className="font-semibold text-secondary">Minmum Cost</p>
                        <p>{props.petitions.supportingCost === 0 ? 'FREE' :  '$' + props.petitions.supportingCost + '.00'}</p>
                    </div>
                </div>
               

            </div>



        </a>
     );
}
 
export default PetitionsCard;