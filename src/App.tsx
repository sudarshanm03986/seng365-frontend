import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<h1 className="">hello</h1>}/>
            <Route path="/" element={<h1>helsdlo</h1>}/>
            <Route path="/" element={<h1>heldslo</h1>}/>

            <Route path="/" element={<h1>helsdlo</h1>}/>

            <Route path="*" element={<h1>Not Found</h1>}/>

          </Routes>
        </div>

      </Router>
      
    </div>
  );
}

export default App;
