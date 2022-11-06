import Navbar from './components/Navbar'
import Cards from "./components/Cards"
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import Search from './components/Search';
import About from './components/About';


const App = () => {

  const pagesize = 12;
  
  // ---------- laoding bar
  
  const [progress, setprogress] = useState(0);

  return (
    <Router>
    <div className="App">
      <Navbar />
      <LoadingBar color="#1b95e0" progress={progress} />

      <Routes>
      <Route  path="/" element={<Cards  setprogress={setprogress}
                pagesize={pagesize}
                />} exact />
      <Route  path="/search" element={<Search  setprogress={setprogress}
                />} exact />

            <Route path="/search/:term" element={<Search setprogress={setprogress}/>} exact />
            <Route path="/AboutUs" element={<About setprogress={setprogress}/>} exact />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
