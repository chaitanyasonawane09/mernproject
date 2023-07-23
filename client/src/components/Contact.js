import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

const Contact = () => {
  const navigate = useNavigate();
  const [userData,setuserData]=useState({});
  const  userContact=async()=>{
    try{
         
      const resfrombackened=await fetch('/getdata',{
        method:"GET",
        headers:{
          //Accept:"application/json",
          "Content-Type":"application/json"

        },
      });
      const data=await resfrombackened.json();
      console.log("ok");
      console.log(data);
     setuserData(data);
      if(!resfrombackened.status===200)
      {
        const error=new Error(resfrombackened.error);
        throw error;
      }
    }catch(err){
      console.log(err);
     navigate("/login", { replace: true });
    }
  }
  
  useEffect(()=>{             //start when first time load page and in Useeffect we doesn't write async function
 userContact();
  },[]);

  return (
    <>
     <div className="contact-info">
      <div className="container-fluid">
        <div className="row">
          <div className='col-lg-10 offset-lg-1 d-flex justify-content-between my-100'>

             <div className='contact_info_item d-flex justify-content-start align-items-center'>
              <i className="zmdi zmdi-smartphone"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                     phone
                  </div>
                  <div className='contact_info_text'>
                     +915468276
                  </div>
                </div>
             </div>

             <div className='contact_info_item d-flex justify-content-start align-items-center'>
             <i className="zmdi zmdi-email"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                    Email
                  </div>
                  <div className='contact_info_text'>
                    chaitanya@gmail.com
                  </div>
                </div>
             </div>

             <div className='contact_info_item d-flex justify-content-start align-items-center'>
              <i className="zmdi zmdi-smartphone"></i>
                <div className='contact_info_content'>
                  <div className='contact_info_title'>
                     Address
                  </div>
                  <div className='contact_info_text'>
                     ram nagar,Pune
                  </div>
                </div>
             </div>

          </div>
        </div>
      </div>
     </div>

    <br></br>
     <div className='contact_form'>
      <div className="container"  style={{borderStyle:'solid',backgroundColor:'white'}}>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1'>
            <div className='contact_form_container py-4'>
              <div className='contact_form_title py-2'>
                <strong>Get in Touch</strong>
              </div>
              <form id="contact_form">
                <div className='contact_form_name d-flex justify-content-between align-items-between mt-3'>
                  <input type="text" id="contact_form_name" className='contact_form_name input_field' value={userData.name}
                  placeholder='Your name' required/>
                  <input type="email" id="contact_form_email" className='contact_form_email input_field' value={userData.email}
                  placeholder='Your email' required/>
                  <input type="number" id="contact_form_phone" className='contact_form_phone input_field' value={userData.phone}
                  placeholder='Your Phone Number' required/>
                </div>
                <div className='contact_form_text mt-4'>
                  <textarea className='text_field contact_form_message' placeholder="Message" cols="81" rows="7"></textarea>
                </div>

                <div className='contact_form_button'>
                  <button type="submit" className='btn btn-primary'>Send Message</button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
     </div>


    </>

  
  )
}

export default Contact
