import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

const SignUp = (props) => {

    const [credentials, setcredentials] = useState({email:"" , password:""});
    let navigate = useNavigate();

    const HandleSubmit = async(e) => {
        
        e.preventDefault();
        const {name,email,password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password})
      });
      
      const json = await response.json();  
      console.log(json)

      if(json.success)
      {
        localStorage.setItem("token",json.authToken);
        navigate("/");
        props.showAlert("Signup Successful","success")
      }
      else{
        props.showAlert("Invalid Credentials","danger")
      }
    }

    const OnChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={OnChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={OnChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={OnChange} minLength={5} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={OnChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
