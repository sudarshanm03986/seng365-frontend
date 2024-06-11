import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'


import Nav from "./components/nav";

import Landing from "./view/landing";
import Login from "./view/login";
import Register from "./view/register";
import NotFound from "./view/notFound";
import Petitions from "./view/petitions";
import Petition from "./view/petition";
import AddPetitions from "./view/addPetitions";
import MyPetitions from "./view/myPetitions";
import ViewProfile from "./view/viewProfile";
import NeedAccount from "./view/needAccount";


function App() {
  return (
    <div className="App">
      
      <Router>
      <SkeletonTheme baseColor="#d3d3d3" highlightColor="#eee">
        <div>
          <Nav/>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            
            <Route path="/petitions" element={<Petitions/>}/>
            <Route path="/petitions/:id" element={<Petition/>}/>

            {!localStorage.getItem('token') && !localStorage.getItem('userId') ?  <Route path="/login" element={<Login/>}/> : ""}
            {!localStorage.getItem('token') && !localStorage.getItem('userId') ? <Route path="/register" element={<Register/>} />: ""}
            {localStorage.getItem('token') && localStorage.getItem('userId') ? <Route path="/profile" element={<ViewProfile/>} />: ""}

            <Route path="/myPetitions" element={ !localStorage.getItem('token') && !localStorage.getItem('userId') ? <NeedAccount message={'You need an account to view your Petitions'}/> : <MyPetitions/>} />
            <Route path="/addPetitions" element={ !localStorage.getItem('token') && !localStorage.getItem('userId') ? <NeedAccount message={'You need an account to create a Petitions'}/>: <AddPetitions/>} />
            <Route path="*" element={<NotFound/>}/>

          </Routes>
        </div>
        </SkeletonTheme>
      </Router>
      
    </div>
  );
}

export default App;
