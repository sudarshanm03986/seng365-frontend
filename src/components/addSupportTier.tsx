
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const AddSupportTier = (props:any) => {

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [cost, setCost] = useState(0);

    const handleChange = (index:number, e: any ) => {

        const tiers = [...props.supportTiers];
        tiers[index][e.target.name] = e.target.value;
        props.setSupportTiers(tiers);
    }

    const add = () => {

        props.setSupportTiers([...props.supportTiers, {title:'', description:'', cost:0 }])

    }

    const remove = (index:number) => {
        const tiers = [...props.supportTiers];
        tiers.splice(index,1);
        props.setSupportTiers(tiers);
    }

    return ( 
    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
            {props.supportTiers?.map((data:newSupportTiers, index:number) => 
            <form className=" bg-gray-200 rounded flex flex-col gap-2 p-2">
                <div className="flex justify-between items-center">
                    <h2>Support Tier {index +1}</h2>
                    <button type='button' onClick={() => remove(index) } className="text-[1.3rem] hover:text-red-500 duration-300 "><MdDelete/></button>
                </div>
                <div className="text-left">
                    <label className="font-medium text-secondary">Title *</label>
                <input 
                className="transtion duration-200 p-2 bg-white border-2 border-gray-300  rounded w-full  hover:shadow-md focus-within:shadow-md  "
                type='text'
                placeholder='Enter title'
                name="title"
                required
                value={data.title}
                onChange={(e) => handleChange(index, e)}
                />
                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Description *</label>
                <textarea 
                cols={50}
                rows={4}
                className="transtion duration-200 p-2 bg-white border-2 border-gray-300  rounded w-full  hover:shadow-md focus-within:shadow-md  "
                name="description"
                placeholder='Enter description'
                required
                value={data.description}
                onChange={(e) => handleChange(index, e)}
                />  

                </div>

                <div className="text-left">
                    <label className="font-medium text-secondary">Cost *</label>
                
                    <input 
                        className="transtion duration-200 p-2 bg-white border-2 border-gray-300  rounded w-full  hover:shadow-md focus-within:shadow-md  "
                        type='number'
                        placeholder='Enter cost'
                        name="cost"
                        required
                        value={data.cost}
                        onChange={(e) => handleChange(index, e)}
                    />
                </div>

                </form> )}

        </div>

        <button disabled={props.supportTiers.length >=3 } onClick={() => add() }className={`p-1 bg-secondary text-white w-full rounded hover:bg-accent hover:text-white duration-300 flex justify-center text-[2rem] disabled:text-gray-300 disabled:bg-link`} type="button"><IoIosAddCircleOutline/></button>
            
        

    </div> );
}
 
export default AddSupportTier;