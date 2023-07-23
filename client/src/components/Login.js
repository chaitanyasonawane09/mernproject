import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import signinpic from "../Images/loginimage.png"

const Login = () => {
  const navigate = useNavigate();
  const[email,setEmail]=useState(' ');
  const[password,setPassword]=useState('');

  const loginUser=async(e)=>{
    e.preventDefault();
    if(email.length===0 || password.length===0)
    window.alert("Please fill information");

   
   const res=await fetch('/signin',{
    method:"POST",
    credentials: 'include',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      email,
      password
    })
   });

   const data=res.json();
   if(res.status!==200 || !data){
    window.alert("Invalid LOGIN");
    console.log(res.status);
    }
    else
    {
      console.log(res.status);
      window.alert("LOGIN Successful");
      console.log("Succesful LOGIN");
     navigate("/", { replace: true });
    }
  }
  return (
    <div>
      <section className="signin" id="container" >
        <div className="container mt-5"  >
        <div className="signin-content">
        <h2 className="form-title">Sign In</h2>
        <div className="signin-image" style={{float:'left'}}>
              <figure>
                <img src={signinpic} alt="Login pic"/>
              </figure>
              <Link to="/signup" className="signup-image-link">Create an account</Link>
              </div>

          <div className="signin-form">
            
             <form method="POST" className="registeration-form" id="register-form" style={{float:'right'}}>
              
              
               <div className="form-group">
               <label htmlFor="email">
               <i className="zmdi zmdi-email"></i>
               </label>
               <input type="email" name="email" id="email" autoComplete="off"
                   value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" required="required"
               />
               </div>

               <div className="form-group">
               <label htmlFor="password">
               <i className="zmdi zmdi-lock"></i>
               </label>
               <input type="text" name="password" id="password" autoComplete="off"
                    value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your password" required="required"
               />
               </div>

               <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit"
                value="Login" onClick={loginUser}/>
               </div>
             
             </form>

             
    
         
        </div>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Login
