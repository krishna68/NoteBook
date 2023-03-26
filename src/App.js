import './App.css';
import Navbar from './components/Navbar';
import React,{useState} from 'react';
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
      <div className='container'>
    <Routes>
        <Route exact path="/" element={<Home showAlert={showAlert}/>} />
        <Route  exact path="/about" element={<About/>} />
        <Route  exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route  exact path="/signup" element={<Signup showAlert={showAlert}/>} />
    </Routes>
      </div>
      
    </BrowserRouter>
    
    </NoteState>
    </>
  );
}

export default App;
