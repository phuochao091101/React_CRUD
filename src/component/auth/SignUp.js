import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator'
import { func } from "prop-types";
import { validate } from "json-schema";


const SignUp = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[firstName,setFirstName]=useState("");
    const[lastName,setLastName]=useState("");
    const[validateFirstName,setValidateFirstName]=useState(true);
    const[validateLastName,setValidateLastName]=useState(true);
    const[validateEmail,setValidateEmail]=useState(true)
    const[validatePassword,setValidatePassword]=useState(true)
    const navigate=useNavigate();
    const handlesubmit=(e)=>{
      e.preventDefault();
      if(!validateEmail&&!validatePassword&&!validateFirstName&&validateLastName){
        console.log(password)
        console.log(email)
       
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
    function validFirstName(e){
      if(!validator.isEmpty(firstName)){
        setValidateFirstName(false)
        removeError(e)

      }else{
        setValidateFirstName(true)
        addError(e)
      }
    }
    function validLastName(e){
      if(!validator.isEmpty(lastName)){
        setValidateLastName(false)
        removeError(e)

      }else{
        setValidateLastName(true)
        addError(e)
      }
    }
    return ( <div>
         <div className="container">
        <div className="d-flex justify-content-center align-self-center mt-5">
            <form onSubmit={handlesubmit}>
                <h2 className="text-center mb-4">Register</h2>
                <div className="form-outline mb-4">
                  <label className="form-label" for="email">FirstName</label>
                  <input  required value={firstName}  onBlur={e=>validFirstName(e)} onChange={e=>setFirstName(e.target.value)} type="text" id="firstName" className="form-control"></input>
                  {validateEmail && <div className="invalid-feedback">
                    Invalid FirstName
                  </div>}
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" for="email">LastName</label>
                  <input  required value={lastName}  onBlur={e=>validLastName(e)} onChange={e=>setLastName(e.target.value)} type="text" id="lastName" className="form-control"></input>
                  {validateEmail && <div className="invalid-feedback">
                    Invalid LastName
                  </div>}
                </div>
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
                <button type="submit" className="btn btn-primary btn-block mb-4 w-100">Register</button>
              
                <div className="text-center">
                  <p>You have an account ?<Link to={'/'} href="#!">Login</Link></p>
                </div>
              </form>
        </div>
    </div>
    </div>);
}
 
export default SignUp;