import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/NoteState";
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {

  const [alert,setAlert] = useState(null);
  
  const showAlert = (message,type)=> {
      setAlert({
        msg : message,
        type: type
      })

      setTimeout(()=>{
        setAlert(null);
      },1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert = {showAlert} />
          <Alert alert = {alert}/>
          <div className='container my-3'>
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="/Signup" element={<SignUp showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
