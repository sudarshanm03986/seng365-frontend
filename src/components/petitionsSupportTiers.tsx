import { useState } from "react";
import PetitionsSupporter from "./petitionsSupporter";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import EditPetitions from "./editPetitions";
import EditSupportTiers from "./editSupportTier";
import axios from "axios";
import Alert from "../layout/alert";
import AddSupporter from "./addSupporter";


const PetitionsSupportTiers = (props: any) => {

    const data = props.data;


    const [editTier, setEditTier] = useState(false);
    const [alertDelete, setAlertDelete] = useState(false);



    
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleDelete = () => {

        axios.delete(process.env.REACT_APP_DOMAIN + '/petitions/' + props.petitionId + '/supportTiers/' + data.supportTierId, 
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        })
        .then((res) => {
            setError(false);
            setErrorMessage('');

            window.location.reload();


            
        }, (err) => {

            switch (err.response.status) { 
                case 401:
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                   
                    window.location.reload();
                    break;

                case 403:
                    setError(true);
                    setErrorMessage(err.toString());
                    break;

                case 404:
                    setError(true);
                    setErrorMessage(err.toString());
                    break;
            }



        })

    }

    const deletePrompt = () => {

        return <Alert>

            <div  className="w-[400px] h-fit bg-background rounded p-2 flex flex-col gap-10">

                <p>Are you sure you want to delete this SupportTier. <br/> This action can not be undone.</p>
                {error ? <span className="text-red-500">{errorMessage}</span> : ""}
                <div className="flex flex-row justify-evenly">
                    <button onClick={()=> setAlertDelete(false)} className="p-2 bg-gray-300 rounded hover:bg-accent duration-300 hover:shadow">Cancel</button>
                    <button onClick={handleDelete} className="p-2 bg-secondary text-white rounded  hover:bg-red-500 duration-300 hover:shadow">Delete</button>
                </div>



            </div>



        </Alert>
    }

   

    return ( 
    <div>
        {editTier ? < EditSupportTiers tiers={props.data}  id={props.petitionId} setTrigger={setEditTier} /> : ""}
        {alertDelete ? deletePrompt() : ""}
        <div className="grid grid-cols-3 gap-1 border-t-2 pt-1 relative h-fit">
                                    
                                        
            <p>{data.title}</p>


            
            <p>{data.description}</p>


        
            <p>{data.cost === 0 ? 'FREE' :'$' + data.cost}</p>

            { localStorage.getItem('token') && localStorage.getItem('userId') && parseInt(localStorage.getItem('userId') || '', 10) === props.ownerId ? <div className="absolute right-1 top-2 flex gap-2 h-full justify-center">
                <button onClick={()=> setEditTier(true)} className=" hover:bg-accent text-[1.2rem] hover:text-white bg-gray-300 py-2 px-2 rounded duration-300 text-black flex items-center justify-center gap-2 "><BiEdit/></button>
                <button disabled={props.disabled} onClick={()=>setAlertDelete(true)} className="text-[1.2rem] disabled:bg-link disabled:text-gray-300 hover:bg-red-500  hover:text-white bg-gray-300 py-2 px-2 rounded duration-300 text-black flex items-center justify-center gap-2 "><MdDelete/></button>
            </div> : <div className="absolute right-1 top-4 flex gap-2 h-full items-center">

                    <AddSupporter tierId={data.supportTierId} title={data.title} petitionId={props.petitionId} ownerId={props.ownerId}/>
                    
                </div>}


        </div> 

        
      
        <PetitionsSupporter id={props.petitionId} tierId={props.tierId}/>
    

</div>);
}
 
export default PetitionsSupportTiers;