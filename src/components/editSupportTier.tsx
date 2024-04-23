import axios from "axios";
import Alert from "../layout/alert";
import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const EditSupportTiers = (props : any) => {

    const [tierErrors, setTierErrors] = useState<{
        [key: string]: string[]}>({});

    const [tiers, setTiers] = useState<supportTiers>({title:'', description:'', cost:0, supportTierId:0})
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(-1);


    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 


        const patchSupportTier = {
            ...(title !== '' && title !== tiers.title && {'title' : title}),
            ...(description !== '' && description !== tiers.description && {'description' : description}),
            ...(cost !== -1 && cost !== tiers.cost && {'cost' : cost}),
        }

        axios.patch(process.env.REACT_APP_DOMAIN + '/petitions/' + props.id + '/supportTiers/' + tiers.supportTierId, 
        patchSupportTier,
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        })
        .then((res) => {

            console.log('patch successful')
            props.setTrigger(false)
            window.location.reload();

        }, (err) => {

            switch (err.response.status) { 

                case 400:
                    const newErrors: { [key: string]: string[] } = {};


                    if (err.response.statusText.includes('data/title')) {
                        newErrors.title = ["Invalid Title"];
                    }

                    if (err.response.statusText.includes('data/description')) {
                        newErrors.description = ["Invalid description"];
                    }

                    if (err.response.statusText.includes('data/cost')) {
                        newErrors.categoryId = ["Invalid cost"];
                    }


                  

                    setTierErrors(newErrors);

                    break;
                
                case 401:

                    // Unauthorixed


                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');

                        props.setTrigger(false);
                        window.location.reload();
                    
                    break;

                case 403: 

                    if (err.response.statusText.includes('Duplicate')) {
                        setTierErrors({title: ['Support title not unique within petition']})

                    }

                    else if (err.response.statusText.includes('supporter')) {
                        setTierErrors({main: ['Can not edit a support tier if a supporter already exists for it']})
                    }
                

            }




        })



    }

    useEffect (() => {

        const setSupportTiers = () => {

            setTiers(props.tiers);

        }



        setSupportTiers()
    },[props.tiers])


    return ( 
        <Alert>

        <div className="w-[500px] h-fit bg-background rounded p-4 flex flex-col gap-10 ">
            <div className="flex flex-col gap-2  items-center">
            <div className="py-4">
                <h1 className="text-primary font-semibold text-[1.6rem]">Edit Support Tiers</h1>
            </div>
            
            <form onSubmit={handleUpdate}className={` bg-gray-200 rounded  flex flex-col gap-2 p-2 ${tierErrors.title || tierErrors.description || tierErrors.cost ? 'border-red-500 border-2' : ''}`}>
                {tierErrors.main && <span className="text-red-500">{tierErrors.main}</span>}
                <div className="text-left">
                    <label className="font-medium text-secondary">Title</label>
                    <input 
                    className={`transtion duration-200 p-2 bg-white border-2 ${tierErrors.title ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus-within:shadow-md `}
                    type='text'
                    placeholder={tiers.title}
                    name="title"
                    
                    
                    onChange={(e) => setTitle(e.target.value)}
                    />
                   {tierErrors.title && <span className="text-red-500">{tierErrors.title}</span>}
                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Description</label>
                    <textarea 
                    cols={50}
                    rows={4}
                    className={`transtion duration-200 p-2 bg-white border-2 ${tierErrors.description ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus:shadow-md `}
                    name="description"
                    placeholder={tiers.description}
                    
                    
                    onChange={(e) => setDescription(e.target.value)}
                    />  
                    {tierErrors.description && <span className="text-red-500">{tierErrors.description}</span>}
                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Cost (Enter 0 for Free)</label>
                
                    <input 
                         className={`transtion duration-200 p-2 bg-white border-2 ${tierErrors.cost ? 'border-red-500' :'border-gray-300'}  rounded w-full  hover:shadow-md focus-within:shadow-md `}
                        type='number'
                        placeholder={ '$' + tiers.cost.toString()}
                        name="cost"
                       
                        onChange={(e) => setCost(parseInt(e.target.value, 10))}
                    />
                     {tierErrors.cost && <span className="text-red-500">{tierErrors.cost}</span>}
                </div>

                <div className="grid grid-cols-2 gap-2 py-3">
                    <button onClick={()=> props.setTrigger(false)} type="button" className="p-2 bg-gray-300 rounded hover:bg-accent hover:text-white duration-300">Cancel</button>
                    <button type="submit"  className="p-2 bg-secondary text-white rounded hover:bg-accent hover:text-white duration-300">Update</button>
                      
                </div>

                </form>

        </div>

        
       

          



        </div>




        </Alert>
     );
}
 
export default EditSupportTiers;