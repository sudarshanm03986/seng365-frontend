import { useEffect, useState } from "react";
import FormInput from "../components/formInput";
import axios from "axios";
import AddSupportTier from "../components/addSupportTier";




const AddPetitions = () => {

    const [category, setCategory] = useState<Array<Category>>([]);
    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});

    const [title, setTitle] = useState('');
    const [description , setDescription ] = useState('');
    const [categoryId , setCategoryId ] = useState(0);
    const [supportTiers, setSupportTiers] = useState <Array<newSupportTiers>> ([]);
    const [file, setFile] = useState<File>()

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

    return ( 
    <div className="pt-20 w-full h-fit min-h-screen bg-background flex justify-center">

        <div className="xl:w-xl  w-full  flex py-2 flex-col items-center gap-5 "> 


        <div>
            <h1 className="text-[2rem] font-semibold text-primary" >Start a Petiiton</h1>
            <p>Please fill in the form below to start a petition</p>
        </div>
    
        
        <form className="flex flex-col w-[500px] gap-2" >

            <FormInput 
                type='text'
                placeholder="Enter title"
                label='Title'
                isRequired={true}
                setValue={setTitle}
                error={errors.title}
            />

            <FormInput 
                    type='text-area'
                    placeholder="Enter the description of this new petition"
                    label='Description'
                    isRequired={true}
                    setValue={setDescription}
                    error={errors.description}
            />
            

            <div className="flex flex-col text-left">
            <label className=" font-medium text-secondary">Category *</label>
                <select onChange={(e)=> setCategoryId(parseInt(e.target.value, 10)) }className="rounded p-2 bg-white border-gray-300 border-2 text-gray">
                    <option selected >Choose a category</option>
                    {category.map((data) => <option value={data.categoryId}>{data.name}</option>)}
                </select>
            </div>

            <AddSupportTier aupportTiers={supportTiers} setSupportTiers={setSupportTiers}/>
            
            <FormInput 
             type='file' 
             placeholder='Upload Petition Image' 
             label='Upload Petition Image' 
             isRequired={false} 
             setValue={setFile}
             error={errors.file}/>

            


        </form>
        
    
    
    
        </div> 
    </div> );
}
 
export default AddPetitions;