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




    const customStyles = {
      container: (provided:any, state:any) => ({
          ...provided,
          width: '100%',
          margin: '0 auto',
          // height : '3rem'
        
          
      }),
      control: (provided:any, state:any) => ({
          ...provided,
         
          borderColor: state.isFocused ? '#F6AD55' : provided.borderColor,
          borderWidth: 2, 
          boxShadow: state.isFocused ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' : provided.boxShadow,
          '&:hover': {
              borderColor: state.isFocused ? '#F6AD55' : provided.borderColor
          }
      }),
      option: (provided:any, state:any) => ({
          ...provided,
          backgroundColor: state.isFocused ? '#007bff' : provided.backgroundColor,
          color: state.isFocused ? 'white' : provided.color,
          '&:hover': {
              backgroundColor: '#007bff',
              color: 'white'
          }
      })
  };


    const handleSelectChange = (selected : any) => {

      const item : {'value': number, 'label': string} [] = selected;

      searchParams.delete("categoryIds");
        
      for (const id of item) {
        if (!searchParams.getAll("categoryIds").includes(id.value.toString())) {

          searchParams.append("categoryIds", id.value.toString())



        }
      }
      
      props.setParams(searchParams);
     
    };

    const handleSupportCostChange = (e:any) => {
      searchParams.delete("supportingCost");

      if ( e.target.value && e.target.value >= 0 ) {
        searchParams.append("supportingCost", parseInt(e.target.value, 10).toString());
      }

      props.setParams(searchParams);
    }


    const handleClearFilter = () => {


      searchParams.delete('categoryIds'); 
      searchParams.delete('supportingCost'); 
      props.setParams(searchParams)


    }

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


  const getSelectedCategory = () => {
    const list = [];

    for (const categorie of category) {
      
      if (searchParams.getAll('categoryIds').includes(categorie.categoryId.toString()))

        list.push({'value': categorie.categoryId, 'label' : categorie.name});

    }

    return list;

  }



    return ( 
        <div>
            <button onClick={()=> setFilterShow(!filterShow)} className=" transition duration-300 py-2 border-2 border-gray-300 px-6 rounded bg-gray-300 hover:text-white focus:text-white hover:shadow-lg focus:shadow-lg hover:bg-accent hover:border-accent focus:border-accent focus:bg-accent"><div className="flex items-center gap-1 justify-between"><FaFilter/> <p className="font-semibold">Filter</p></div></button>

            {filterShow ? 
            <div className="absolute h-fit bg-background w-[400px] translate-y-1 shadow-md flex flex-col border-[1px] border-gray-300 gap-2 px-2 rounded">
                  <div className=" flex flex-row p-3  justify-between items-center">
                    <p className="text-primary text-xl font-semibold">Filters</p>

                    <button onClick={() => setFilterShow(false)} className="transition duration-300 rounded bg-transparent text-link  hover:text-accent focus:text-accent text-[2.5rem]"><IoIosClose/></button>
                  </div>

                  <div className=" flex flex-col gap-2 item-center justify-center place-items-center">
                    <p className="text-secondary font-semibold">Supporting Cost</p>
                    <div className=" p-1 rounded bg-white border-2 border-gray-300 hover:shadow-md hover:border-accent focus-within:shadow-md focus-within:border-accent w-full">
                      <input type="number"  value={searchParams.get('supportingCost')?.toString()} placeholder="$All (0 for free)" onChange={handleSupportCostChange} className="appearance-none border-none focus:outline-none  p-1 border-link w-full text-center"/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                  <p className="text-secondary font-semibold">Category</p>

                  <Select 
                    options={category.map((data) => ({value: data.categoryId, label: data.name}))}
                    isMulti

                    onChange={handleSelectChange}
                    styles={customStyles}
                    value={getSelectedCategory()}
                    isClearable
                  
                  />
                  

                  </div>

                  <div className="flex flex-row justify-center py-3"> 

                    <button onClick={handleClearFilter}  className="transition duration-300 py-2 px-6 w-full rounded bg-link text-white hover:shadow-lg focus:shadow-lg hover:bg-accent focus:bg-accent">Clear filters</button>
                    
                  </div>
            </div> 
            
             : ""}
    
        </div> 
        );
}
 
export default PetitionsFilter;