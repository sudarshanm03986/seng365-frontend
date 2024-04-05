import axios from "axios";
import { useEffect, useState } from "react";


import DefaultPetitionImg from './../assets/default_petiitio_img.jpg'
import DefaultOwnerImg from './../assets/default_owner_img.png'



const PetitionsCard = (props: any) => {
    const [heroPetitionImage, setHeroPetitionImage] = useState("");
    const [heroOwnerImage, setHeroOwnerImage] = useState("");
    const [categoryName, setCategoryName] = useState("")

    useEffect(() => {
        const getImage = () => {

        }

    }, [props.petitions.petitionsId])

    useEffect(() => {
        const getCategory = () => {
            axios.get(process.env.REACT_APP_DOMAIN + '/petitions/categories') 
            .then((res) => {

                for(const category of res.data) {

                    if (category.categoryId === props.petitions.categoryId ) {
                        setCategoryName(category.name);
                    }
                }
                
                
            }, (err) => {
                
            })

        }

        getCategory();

    }, [props.petitions.categoryId])


    console.log(props.petitions.supportingCost)
    return ( 

        <a  href={"/petition/" + props.petitions.petitionId} className=" transition duration-200 flex flex-col gap-2 shadow-lg  hover:shadow-accent py-5 rounded">
            <div className="flex px-4 gap-5 items-center ">

                <img src={DefaultOwnerImg} className="object-fit w-10 h-10 rounded-full"></img>

                <div className="flex flex-col text-left text-sm" >
                    <p className="font-semibold">{props.petitions.ownerFirstName} {props.petitions.ownerLastName}</p>
                    <p className="">{new Date(props.petitions.creationDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div  className="border-y-2">

                <img src={DefaultPetitionImg} className="object-contain w-full h-48"></img>

            </div>

            <div className="flex flex-col gap-3">
                <p className="font-semibold text-primary text-xl">{props.petitions.title}</p>

                <div className=" flex justify-evenly">
                    <div>
                        <p className="font-semibold text-secondary">Category</p>
                        <p>{categoryName}</p>
                    </div>
                    <div>
                        <p  className="font-semibold text-secondary">Minmum Cost</p>
                        <p>${props.petitions.supportingCost}.00</p>
                    </div>
                </div>
               

            </div>



        </a>
     );
}
 
export default PetitionsCard;