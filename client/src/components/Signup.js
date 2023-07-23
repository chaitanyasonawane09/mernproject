import React from 'react'
import signpic from "../Images/registeration1.jpg"
import{Link,useNavigate} from "react-router-dom";
import {useState} from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const [user,setUser]=useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });
  let name,value;
  const handleInputs=(e)=>{
   console.log(e);
   name=e.target.name;
   value=e.target.value;

   setUser({...user,[name]:value});
   console.log("ok");
  }
  const PostData=async(e)=>{
   e.preventDefault();              //to avoid default reloading
  const{name,email,phone,work,password,cpassword} =user;
  console.log("ok1");
  const res=await fetch("/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({ 
      name,email,phone,work,password,cpassword
    })
  });
  const data=await res.json();
 console.log("ok1");
  if(data.status===422 || !data){
  window.alert("Invalid Registeration");
  console.log("Invalid Registeration");
  }
  else
  {
    window.alert("Registeration Successful");
    console.log("Succesful Registeration");
    navigate("../login", { replace: true });
  }



}
  return (
    <div>
      <section className="signup" id="container" >
        <div className="container mt-5"  >
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
             <form method="POST" className="registeration-form" id="register-form" style={{float:'left'}}>
      
                
              <div className="form-group">
               <label htmlFor="name">
               <i className="zmdi zmdi-account"></i>
               </label>
               <input type="text" name="name" id="name" autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                   placeholder="Your Name" required
               />
               </div>

               <div className="form-group">
               <label htmlFor="email">
               <i className="zmdi zmdi-email"></i>
               </label>
               <input type="email" name="email" id="email" autoComplete="off"
               value={user.email}
               onChange={handleInputs}
                   placeholder="Your Email"
               />
               </div>

               <div className="form-group">
               <label htmlFor="phone">
               <i className="zmdi zmdi-phone-in-talk"></i>
               </label>
               <input type="number" name="phone" id="phone" autoComplete="off"
               value={user.phone}
               onChange={handleInputs}
                   placeholder="Your Phone"
               />
               </div>

               <div className="form-group">
               <label htmlFor="work" >
               <i className="zmdi zmdi-slideshow"></i>
               </label>
               <input type="text" name="work" id="work" autoComplete="off"
               value={user.work}
               onChange={handleInputs}
                   placeholder="Your Profession"
               />
               </div>

               <div className="form-group">
               <label htmlFor="password">
               <i className="zmdi zmdi-lock"></i>
               </label>
               <input type="text" name="password" id="password" autoComplete="off"
               value={user.password}
               onChange={handleInputs}
                   placeholder="Your passsword"
               />
               </div>

               <div className="form-group">
               <label htmlFor="cpassword" >
               <i className="zmdi zmdi-lock"></i>
               </label>
               <input type="text" name="cpassword" id="cpassword" autoComplete="off"
                   value={user.cpassword}
                   onChange={handleInputs}
                   placeholder="Confirm Your Password"
               />
               </div>

               <div className="form-group form-button">
                <input type="submit" name="signup" id="signup" className="form-submit"
                value="register" onClick={PostData}/>
               </div>
         
             </form>

             
           
             <div className="signup-image" style={{float:'right'}}>
              <figure>
                <img src={signpic} alt="registration pic"/>
              </figure>
              <Link to="/login" className="signup-image-link">I am already resister</Link>
              </div>
         
        </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
