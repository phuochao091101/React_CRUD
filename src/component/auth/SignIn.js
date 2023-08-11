import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator'
import { func } from "prop-types";
import { validate } from "json-schema";


const SignIn = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[validateEmail,setValidateEmail]=useState(true)
    const[validatePassword,setValidatePassword]=useState(true)
    const handlesubmit=(e)=>{
      e.preventDefault();
      console.log(validateEmail)
      console.log(validatePassword)
      if(!validateEmail&&!validatePassword){
        console.log(password)
        console.log(email)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "email": email,
          "password": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8082/authenticate", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
      
    }
    function validEmail(e){
      if(validator.isEmail(email)){
        setValidateEmail(false)
        e.target.classList.remove("is-invalid")
        e.target.classList.add("is-valid")

      }else{
        setValidateEmail(true)
        e.target.classList.remove("is-valid")
        e.target.classList.add("is-invalid")
      }
    }
    function validPassword(e){
      if(!validator.isEmpty(password)){
        setValidatePassword(false)
        e.target.classList.remove("is-invalid")
        e.target.classList.add("is-valid")

      }else{
        setValidatePassword(true)
        e.target.classList.remove("is-valid")
        e.target.classList.add("is-invalid")
      }
    }
    return ( <div>
         <div className="container">
        <div className="d-flex justify-content-center align-self-center mt-5">
            <form onSubmit={handlesubmit}>
                <h2 className="text-center mb-4">Login</h2>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form2Example1">Email address</label>
                  <input  required value={email}  onBlur={e=>validEmail(e)} onChange={e=>setEmail(e.target.value)} type="email" id="form2Example1" className="form-control"></input>
                  {validateEmail && <div className="invalid-feedback">
                    Invalid Email
                  </div>}
                </div>
              
                <div className="form-outline mb-4">
                  <label className="form-label" for="form2Example2">Password</label>
                  <input required value={password}  onBlur={e=>validPassword(e)} onChange={e=>setPassword(e.target.value)} type="password" id="form2Example2" className="form-control"></input>
                  <div className="invalid-feedback">
                    Invalid Password
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
              
                <div className="text-center">
                  <p>Not a member? <a href="#!">Register</a></p>
                </div>
              </form>
        </div>
    </div>
    </div>);
}
 
export default SignIn;