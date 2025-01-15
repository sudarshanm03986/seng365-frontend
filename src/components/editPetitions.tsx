import Alert from "../layout/alert";
import { useEffect, useState } from "react";
import FormInput from "../components/formInput";
import axios from "axios";


const EditPetitions = (props:any) => {


    const [category, setCategory] = useState<Array<Category>>([]);

    // const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});



    const [title, setTitle] = useState('');
    const [description , setDescription ] = useState('');
    const [categoryId , setCategoryId ] = useState(props.petition.categoryId);
    

    useEffect(() => {

        const getCategory = () => {
          axios.get(process.env.REACT_APP_DOMAIN + '/petitions/categories') 
          .then((res) => {
  
                setCategory(res.data);
          
          }, (err) => {
  
              console.log(err)
              
          })
  
      }
  
      getCategory();
    
    }, [])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 




        const patchPetition  = {

            ...(title !== '' && title !== props.petition.title && {'title' : title}),
            ...(description !== '' && description !== props.petition.description && {'description' : description}),
            ...(categoryId !== -1 && categoryId !== props.petition.categoryId && {'categoryId' : categoryId})

        }

        axios.patch(process.env.REACT_APP_DOMAIN + '/petitions/' + props.petition.petitionId, 
        patchPetition,
        {headers: 
            {  
                "x-authorization" : localStorage.getItem('token')
            }
        })
        .then((res) => {

           

                props.setTrigger(false);
                window.location.reload();



        },(err) => {

            switch (err.response.status) { 

                case 400:
                    const newErrors: { [key: string]: string[] } = {};


                    if (err.response.statusText.includes('data/title')) {
                        newErrors.title = ["Invalid Title"];
                    }

                    if (err.response.statusText.includes('data/description')) {
                        newErrors.description = ["Invalid description"];
                    }

                    if (err.response.statusText.includes('data/categoryId')) {
                        newErrors.categoryId = ["Invalid Catgeory"];
                    }

                  

                    setErrors(newErrors);

                    break;

                case 401:

                    // Unauthorixed


                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');

                        props.setTrigger(false);
                        window.location.reload();
                    
                    break;

                case 403:

                    setErrors({title: ['Title already exist']});
                    
                    break;
            }


            
        })
       
           
};
       




    return ( <Alert>
                <div className="bg-background w-[600px] rounded px-2 py-5 h-fit flex flex-col items-center ">

                    <div className="py-4">
                        <h1 className="text-[1.6rem] font-semibold text-primary">Edit Petition</h1>
                    </div>

                    <form className="flex flex-col w-[500px] gap-2 " onSubmit={handleSubmit}>

                    <FormInput 
                        type='text'
                        placeholder={props.petition.title}
                        label='Title'
                        isRequired={false}
                        setValue={setTitle}
                        error={errors.title}
                    />

                    <FormInput 
                        type='text-area'
                        placeholder={props.petition.description}
                        label='Description'
                        isRequired={false}
                        setValue={setDescription}
                        error={errors.description}
                    />


                    <div className="flex flex-col text-left">
                    <label className=" font-medium text-secondary">Category *</label>
                        <select onChange={(e)=> setCategoryId(parseInt(e.target.value, 10)) }className={`rounded p-2 bg-white ${errors.categoryId ? 'border-red-500' : 'border-gray-300 '} border-2 text-gray`}>
                           
                            {category.map((data) => <option selected={data.id === categoryId } value={data.id}>{data.name}</option>)}
                        </select>
                        <span className="text-red-500">{errors.categoryId }</span>
                    </div>



                    <div className="grid grid-cols-2 gap-2 py-3">
                    <button onClick={()=> props.setTrigger(false)} type="button" className="p-2 bg-gray-300 rounded hover:bg-accent hover:text-white duration-300">Cancel</button>
                    <button type="submit" className="p-2 bg-secondary text-white rounded hover:bg-accent hover:text-white duration-300">Update</button>
                      
                    </div>


                    </form>


                </div>
            </Alert> );
}
 
export default EditPetitions;



