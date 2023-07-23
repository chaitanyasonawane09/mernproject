import React from 'react'
import Navbar from "./components/Navbar";
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import{Route,Routes} from "react-router-dom";
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import Signup from './components/Signup';
import "./App.css";
import Errorpage from './components/Errorpage';

const App = () => {
  return (
    <div>
     <Navbar/>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/about" element={<About />} />
     <Route path="/contact" element={<Contact />} />
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Errorpage />} />
     </Routes>
    
    </div>
  )
}

export default App
