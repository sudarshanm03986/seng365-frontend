import Skeleton from "react-loading-skeleton";


const CardSkeleton = () => {
    return ( 
    

         <div  className="flex flex-col gap-2 shadow-lg bg-white  py-5 rounded">
        <div className="flex px-4 gap-5 items-center ">

           
            {/* <img src={""} alt={""} className="rounded-full w-12 h-12 object-cover border-2 border-secondary"></img> */}
           
            <Skeleton  circle width={45} height={45}/>
            <div className="flex flex-col text-left text-sm w-20" >
                <p className="font-semibold"><Skeleton /></p>
                <p className=""><Skeleton/></p>
            </div>
        </div>

        <div  className="border-y-2">

            {/* <img src={""} alt={""} className="object-contain w-full h-48"></img> */}
            <div className="flex w-full justify-center"> <div className="h-48 w-48">
            <Skeleton height={"100%"}  borderRadius={0}/>
            </div></div>


        </div>

        <div className="flex flex-col gap-3">
            <p className="font-semibold text-primary text-lg"><Skeleton width={200}/></p>

            <div className=" flex justify-evenly">
                <div className="w-20">
                    
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                </div>
                <div className="w-20">
                <p><Skeleton/></p>
                <p><Skeleton/></p>
                </div>
            </div>
           

        </div>



    </div>);
}
 
export default CardSkeleton;