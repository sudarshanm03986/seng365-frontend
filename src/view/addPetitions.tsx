import { useEffect, useState } from "react";
import FormInput from "../components/formInput";
import axios from "axios";
import AddSupportTier from "../components/addSupportTier";
import { useNavigate } from "react-router-dom";


const AddPetitions = () => {

    const [category, setCategory] = useState<Array<Category>>([]);

    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        [key: string]: string[];
      }>({});



      const [tierErrors, setTierErrors] = useState<{
        [key: number]: {[key:string] : string[]};
      }>({});

    const [title, setTitle] = useState('');
    const [description , setDescription ] = useState('');
    const [categoryId , setCategoryId ] = useState(-1);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

         //Validation
        const newErrors: { [key: string]: string[] } = {};
        const newTierErrors:{ [key: number]: {[key:string] : string[]} }= {};

        if (!title.trim()) {
            newErrors.title = ["Title is required"];
        }

        if (!description.trim()) {
            newErrors.description = ["Description is required"];
        }

        if (categoryId === -1) {
            newErrors.categoryId = ["Please select a Category"];
        }

        if (supportTiers.length <= 0) {
            newErrors.supportTiers = ["Petition need at least one support tier"];
        }

        for (let i = 0; i < supportTiers.length; i++ ) {
            const tier:newSupportTiers = supportTiers[i];

            if (!tier.title.trim()) {
                newTierErrors[i] = {...newTierErrors[i], title : ["Title is required"]};
            }

            if (!tier.description.trim()) {
                newTierErrors[i] = { ...newTierErrors[i], description: ["Description is required"] };
            }
            
        }

        if (file && !(['image/png', 'image/gif', 'image/jpg', 'image/jpeg'].includes(file.type))) {
            
            newErrors.file = ['File type invalid, Valid file are PNG, GIF and JPEG'];
     
        }

        if (Object.keys(newErrors).length > 0) {
            // If there are validation errors, setErrors and stop form submission
            setErrors(newErrors);
            return;
        }

        if (Object.keys(newTierErrors).length > 0) {
            // If there are validation errors, setErrors and stop form submission
            setTierErrors(newTierErrors);
            return;
        }


        const newPetition:addPetiton = {
                                    title:title,
                                    description: description,
                                    categoryId: categoryId,
                                    supportTiers: supportTiers
        };

        axios.post(process.env.REACT_APP_DOMAIN + '/petitions', 
            newPetition,
            {headers: 
                {  
                    "x-authorization" : localStorage.getItem('token')
                }
        })
        .then ((res) => {
     
            if (file) {

                const contentType = file.type;
                axios.put(process.env.REACT_APP_DOMAIN + '/petitions/' + res.data.petitionId + '/image', 
                    file, 
                    {headers: 
                            {   "Content-Type" : contentType, 
                                "x-authorization" : localStorage.getItem('token')
                        }
                    }
                )
                .then ((responses) => {
                    navigate('/petitions/' + res.data.petitionId);
                    window.location.reload();

                    // console.log()
                    
                }, (err) => {

                    console.log(err)
                    navigate('/');
                    window.location.reload();

                }) 
            } else {
                navigate('/');
                window.location.reload();

            }


        }, (err) => {
            switch (err.response.status) {
                case 400:
                    const newErrors: { [key: string]: string[] } = {};
                    const newTierErrors:{ [key: number]: {[key:string] : string[]} }= {};


                    if (err.response.statusText.includes('data/title')) {
                        newErrors.title = ["Invalid Title"];
                    }

                    if (err.response.statusText.includes('data/description')) {
                        newErrors.description = ["Invalid description"];
                    }

                    if (err.response.statusText.includes('data/categoryId')) {
                        newErrors.categoryId = ["Invalid Catgeory"];
                    }

                    if (err.response.statusText.includes('data/supportTiers')) {
                        newErrors.supportTiers  = ["Invalid Support Tiers"];
                    } 

                    if (err.response.statusText.includes('supportTiers must have unique titles') ) {
                        newErrors.supportTiers = ["The Support Tiers must have unique titles"];
                    }

                    setErrors(newErrors);

                    
                    for (let i = 0; i < supportTiers.length; i++ ) { 


                        if (err.response.statusText.includes(`data/supportTiers/${i}/title`)) {
                            newTierErrors[i] = {...newTierErrors[i], title : ["Invalid Title"]};
                        }

                        if (err.response.statusText.includes(`data/supportTiers/${i}/description`)) {
                            newTierErrors[i] = {...newTierErrors[i], description : ["Invalid description"]};
                        }
                        
                        if (err.response.statusText.includes(`data/supportTiers/${i}/cost`)) {
                            newTierErrors[i] = {...newTierErrors[i], cost : ["Invalid cost"]};
                        }

                    }

                    setTierErrors(newTierErrors);


                    break;

                case 401:

                    // Unauthorixed


                        localStorage.removeItem('token');
                        localStorage.removeItem('userId');

                        navigate('/');
                        window.location.reload();
                    
                    break;

                case 403:

                    setErrors({title: ['Title already exist']});
                    
                    break;
            }


        })


    }




    return  ( 
    <div className="pt-20 pb-10 w-full h-fit min-h-screen bg-background flex justify-center">

        <div className="xl:w-xl  w-full  flex py-2 flex-col items-center gap-5 "> 


        <div>
            <h1 className="text-[2rem] font-semibold text-primary" >Start a Petition</h1>
            <p>Please fill in the form below to start a petition</p>
        </div>
    
        
        <form onSubmit={handleSubmit} className="flex flex-col w-[500px] gap-2" >

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
                <select defaultValue={-1} onChange={(e)=> setCategoryId(parseInt(e.target.value, 10)) }className={`rounded p-2 bg-white ${errors.categoryId ? 'border-red-500' : 'border-gray-300 '} border-2 text-gray`}>
                    <option  value={-1}>Choose a category</option>
                    {category.map((data, index) => <option key={index} value={data.categoryId}>{data.name}</option>)}
                </select>
                <span className="text-red-500">{errors.categoryId }</span>
            </div>

            <div  className="flex flex-col text-left">
            <label className=" font-medium text-secondary" >Support Tiers</label>
            <AddSupportTier error={tierErrors} supportTiers={supportTiers} setSupportTiers={setSupportTiers}/>
            <span className="text-red-500">{errors.supportTiers }</span>
            </div>

            <FormInput 
             type='file' 
             placeholder='Upload Petition Image' 
             label='Upload Petition Image' 
             isRequired={true} 
             setValue={setFile}
             error={errors.file}/>

            
            <button type="submit" className="p-2 bg-gray-300 rounded hover:bg-accent hover:text-white duration-300">Upload</button>


        </form>
        
    
    
    
        </div> 
    </div> );
}
 
export default AddPetitions;