import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';


import Nav from "./components/nav";

import Landing from "./view/landing";
import Login from "./view/login";
import Register from "./view/register";
import NotFound from "./view/notFound";
import Petitions from "./view/petitions";
import Petition from "./view/petition";
import AddPetitions from "./view/addPetitions";


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav/>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            
            <Route path="/petitions" element={<Petitions/>}/>
            <Route path="/petitions/:id" element={<Petition/>}/>

            {!localStorage.getItem('token') && !localStorage.getItem('userId') ?  <Route path="/login" element={<Login/>}/> : ""}
            {!localStorage.getItem('token') && !localStorage.getItem('userId') ? <Route path="/register" element={<Register/>} />: ""}

            <Route path="/myPetitions" element={ !localStorage.getItem('token') && !localStorage.getItem('userId') ? <Login/> : ""} />
            <Route path="/addPetitions" element={ !localStorage.getItem('token') && !localStorage.getItem('userId') ? <Login/> : <AddPetitions/>} />
            <Route path="*" element={<NotFound/>}/>

          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
