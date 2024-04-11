import { useEffect, useState} from "react"
import { useSearchParams } from "react-router-dom";

import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";


const PetitionsPagination = (props:any) => {

    const [numPages, setNumPages] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();


    const handleChange = (e: any) => {

        // setCount(10);
        searchParams.delete('count');
        searchParams.delete('startIndex');

        searchParams.append('count', e.target.value);
        searchParams.append('startIndex', '0');

        props.setParams(searchParams);

    }


    useEffect(() => {

        if (!searchParams.get('count')) {

            searchParams.append('count', '10');

            props.setParams(searchParams);

        }

        if (!searchParams.get('startIndex')) {

            searchParams.append('startIndex', '0');

            props.setParams(searchParams);
            

        }

    }, [props, searchParams])


    useEffect(() => {

        const calculateNumOfPages = () => {

            const count = parseInt(searchParams.get('count') || '10', 10);

            setNumPages(Math.ceil(parseInt(props.count, 10)/count));

        }

    
        calculateNumOfPages()

    }, [props, searchParams]);





    const display_pages_switcher = () => {

        const button = [];

        for (let i = 0; i < numPages ; i++) {

            button.push(
                <button
                    disabled={ parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10) === i}
                    className={ "disabled:bg-secondary disabled:text-white duration-300 px-4 bg-gray-300 border-r-2 hover:bg-accent hover:text-white"}
                    onClick={()=> {searchParams.delete('startIndex') ; searchParams.append('startIndex', (i * parseInt( searchParams.get('count') || '0', 10)).toString()) ;props.setParams(searchParams)}}
                
                >{i +1 }</button>
            )


        }




        return( <>
                    {button}
                </>)

    }


    const handlePreview = () => {



        const index = parseInt(searchParams.get('startIndex') || '0', 10);
        const count = parseInt(searchParams.get('count') || '10' ,10)

        if (index !== 0 && index - count  >= 0) {
            
            searchParams.delete('startIndex');

            searchParams.append('startIndex', (index-count).toString());

            props.setParams(searchParams);


        }

        


    }


    const handleNext = () => {



        const index = parseInt(searchParams.get('startIndex') || '0', 10);
        const count = parseInt(searchParams.get('count') || '10' ,10)

        if (index + count  <= props.count) {
            
            searchParams.delete('startIndex');

            searchParams.append('startIndex', (index+count).toString());

            props.setParams(searchParams);


        }

        


    }


    return ( 

        <div className="flex flex-col  gap-10 p-5">

            {parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10)  === numPages-1 ? <p className="text-lg font-semibold text-primary" >End of Petition Results !</p> : ""}
        <div className=" grid grid-cols-3">

            <div className="flex flex-row rounded border-2 border-gray-300 w-fit">
            <p className="bg-gray-300  p-2 " >Sort by</p>
            <select onChange={handleChange} className=" rounded p-2">
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option selected >10</option>

            </select>
            
            </div>

            <div className="flex justify-center">
            <div className="flex rounded-lg">
                <button onClick={()=> {searchParams.delete('startIndex'); searchParams.append('startIndex', '0'); props.setParams(searchParams)}} 
                        disabled={ (parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10)) === 0 } 
                        className={" disabled:bg-link disabled:text-black rounded-r rotate-180 px-3 bg-gray-300 border-l-2 duration-300 hover:bg-accent hover:text-white"} >
                            <GrChapterNext/></button>
                <button 
                        onClick={handlePreview}
                        disabled={parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10)=== 0 }
                        className={"disabled:bg-link disabled:text-black rotate-180 px-3 bg-gray-300 border-l-2 duration-300 hover:bg-accent hover:text-white"}>
                            <GrCaretNext/></button>
                
                {display_pages_switcher()}


                <button 
                        onClick={handleNext}
                        disabled={parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10)  === numPages-1 }
                        className={ " disabled:bg-link disabled:text-black px-3 bg-gray-300 border-r-2 duration-300 hover:bg-accent hover:text-white"}><GrCaretNext/></button>
                <button 
                        onClick={()=> {searchParams.delete('startIndex'); searchParams.append('startIndex', (parseInt(searchParams.get('count') || '10', 10)* (numPages -1)).toString()); props.setParams(searchParams)}} 
                        disabled={parseInt(searchParams.get('startIndex') || '0', 10)/ parseInt( searchParams.get('count') || '0', 10)  === numPages-1 }
                        className={ "disabled:bg-link disabled:text-black px-3 bg-gray-300 rounded-r duration-300 hover:bg-accent hover:text-white"}><GrChapterNext/></button>
                
            </div>
            </div>

            

    
        </div> </div>);
}
 
export default PetitionsPagination;