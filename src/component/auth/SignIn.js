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
    const navigate=useNavigate();
    const handlesubmit=(e)=>{
      e.preventDefault();
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
        let status;
        
        fetch("http://localhost:8082/authenticate", requestOptions)
          .then(response => response)
          .then(result =>{
            console.log(result.text());
            status=result.status;
            console.log(status)
            if(status===200){
              console.log(status)
              alert('Login successfully.')
              navigate('/employee/list');
            }
          })
          .catch(error => console.log('error', error));
      }else{
        let email=document.getElementById('email');
        let password=document.getElementById('password');
        addError(email)
        addError(password)
      }
      
    }
    function addError(e){
      e.target.classList.remove("is-valid")
      e.target.classList.add("is-invalid")
    }
    function removeError(e){
      e.target.classList.remove("is-invalid")
      e.target.classList.add("is-valid")
    }
    function validEmail(e){
      if(validator.isEmail(email)){
        setValidateEmail(false)
        removeError(e)

      }else{
        setValidateEmail(true)
        addError(e)
      }
    }
    function validPassword(e){
      if(!validator.isEmpty(password)){
        setValidatePassword(false)
        removeError(e)

      }else{
        setValidatePassword(true)
        addError(e)
      }
    }
    return ( <div>
         <div className="container">
        <div className="d-flex justify-content-center align-self-center mt-5">
            <form onSubmit={handlesubmit}>
                <h2 className="text-center mb-4">Login</h2>
                <div className="form-outline mb-4">
                  <label className="form-label" for="email">Email address</label>
                  <input  required value={email}  onBlur={e=>validEmail(e)} onChange={e=>setEmail(e.target.value)} type="email" id="email" className="form-control"></input>
                  {validateEmail && <div className="invalid-feedback">
                    Invalid Email
                  </div>}
                </div>
              
                <div className="form-outline mb-4">
                  <label className="form-label" for="password">Password</label>
                  <input required value={password}  onBlur={e=>validPassword(e)} onChange={e=>setPassword(e.target.value)} type="password" id="password" className="form-control"></input>
                  <div className="invalid-feedback">
                    Invalid Password
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Sign in</button>
              
                <div className="text-center">
                  <p>Not a member? <Link to={'/register'} href="#!">Register</Link></p>
                </div>
              </form>
        </div>
    </div>
    </div>);
}
 
export default SignIn;