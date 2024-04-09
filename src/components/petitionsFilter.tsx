import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import Select from 'react-select';

import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const PetitionsFilter = (props:any) => {

    const [searchParams] =  useSearchParams();
    const [filterShow, setFilterShow] = useState(false);
    const [category, setCategory] = useState <Array<Category>>([]);
    const [selectedCategory, setSelectedCategory] = useState <number[]>([]);
    const [supportCost, setSupportCost] = useState(0);


    // useEffect(() => {
    //     document.addEventListener('mousedown', () => setFilterShow(false));
    //     document.addEventListener('scroll', () => setFilterShow(false));
    
    //     return () => {
    //       document.removeEventListener('mousedown',  () => setFilterShow(false));
    //       document.removeEventListener('scroll', () => setFilterShow(false));
    //     };
    //   }, []);


    const handleSelectChange = (selected : any) => {

      const item : {'value': number, 'label': string} [] = selected;
    
      setSelectedCategory(item.map((data) => data.value));
     
    };

    useEffect(() => {

      const setCategory = () => {

        console.log(selectedCategory)

        searchParams.delete("categoryIds");
        
        for (const id of selectedCategory) {
          if (!searchParams.getAll("categoryIds").includes(id.toString())) {

            searchParams.append("categoryIds", id.toString())

            props.setParams(searchParams);

          }
        }
        




      }


      setCategory()

    }, [selectedCategory, Select])

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
        <div>
            <button onClick={()=> setFilterShow(!filterShow)} className=" transition duration-300 py-2 px-6 rounded bg-link text-white hover:shadow-lg focus:shadow-lg hover:bg-accent focus:bg-accent"><div className="flex items-center gap-1 justify-between"><FaFilter/> <p className="font-semibold">Filter</p></div></button>

            {filterShow ? 
            <div className="absolute h-fit bg-background w-[400px] translate-y-1 shadow-md flex flex-col border-[1px] border-gray-300 gap-2 p-2">
                  <div className=" flex flex-row p-3  justify-between items-center">
                    <p className="text-primary text-xl font-semibold">Filters</p>

                    <button onClick={() => setFilterShow(false)} className="transition duration-300 rounded bg-transparent text-link  hover:text-accent focus:text-accent text-[2.5rem]"><IoIosClose/></button>
                  </div>

                  <div className=" flex flex-col gap-2 item-center justify-center place-items-center">
                    <p className="text-secondary font-semibold">Supporting Cost</p>
                    <div className=" p-1 rounded bg-white border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent w-full">
                      <input type="number" placeholder="$0.00" className="appearance-none border-none focus:outline-none  p-1 border-link w-full text-center"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                  <p className="text-secondary font-semibold">Category</p>

                  <Select 
                    options={category.map((data) => ({value: data.categoryId, label: data.name}))}
                    isMulti

                    onChange={handleSelectChange}
                  
                  />
                  

                  </div>

                  <div className="flex flex-row justify-between p-2"> 

                    <button className="transition duration-300 py-2 px-6 rounded bg-link text-white hover:shadow-lg focus:shadow-lg hover:bg-accent focus:bg-accent">Clear filters</button>
                    <button className="transition duration-300 py-2 px-6 rounded bg-link text-white hover:shadow-lg focus:shadow-lg hover:bg-accent focus:bg-accent">Apply filters</button>


                  </div>
            </div> 
            
             : ""}
    
        </div> 
        );
}
 
export default PetitionsFilter;