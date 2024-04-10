import { useEffect, useState} from "react"
import { useSearchParams } from "react-router-dom";

import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";


const PetitionsPagination = (props:any) => {

    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams] = useSearchParams();


    const handleChange = (e: any) => {

        // setCount(10);
        searchParams.delete('count');

        searchParams.append('count', e.target.value);

        props.setParams(searchParams);

    }


    useEffect(() => {

        if (!searchParams.get('count')) {

            searchParams.append('count', '10');

            props.setParams(searchParams);

        }

    }, [props, searchParams])


    useEffect(() => {

        const calculateNumOfPages = () => {

            const count = parseInt(searchParams.get('count') || '10', 10);

            setNumPages(parseInt(props.count, 10)/count);

        }

    
        calculateNumOfPages()

    }, [props]);


    const display_pages_switcher = () => {

        const button = [];

        for (let i = 1; i <= numPages ; i++) {

            button.push(
                <button
                    className="px-4 bg-gray-300 border-r-2"
                    onClick={()=> setCurrentPage(i)}
                
                
                >{i}</button>
            )


        }




        return( <>
                    {button}
                </>)

    }


    return ( 

        <div className="flex justify-between ">

            <div className="flex flex-row rounded border-2 border-gray-300">
            <p className="bg-gray-300  p-2 " >Sort by</p>
            <select onChange={handleChange} className="  p-2">
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option selected >10</option>

            </select>
            
            </div>

            <div className="flex border-gray-300 border-2 rounded-lg">
                <button className=" rotate-180 px-3 bg-gray-300 border-l-2 " ><GrChapterNext/></button>
                <button className=" rotate-180 px-3 bg-gray-300 border-l-2 " ><GrCaretNext/></button>
               
                {display_pages_switcher()}
                <button><GrCaretNext/></button>
                <button><GrChapterNext/></button>
                
            </div>

            <button></button>

    
        </div> );
}
 
export default PetitionsPagination;