import PetitionsView from "../components/petitionsView";

const Petitions = () => {
    return (  
        <div className="pt-20 w-screen h-screen bg-background flex justify-center">

            <div className="xl:w-xl  w-full  flex py-2 flex-col ">

                <h1 className="text-[2rem] font-bold text-primary">Browse Petitions</h1>

                
                <PetitionsView />

            </div>


        </div>
    );
}
 
export default Petitions;