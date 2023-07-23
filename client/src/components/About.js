import React, { useEffect } from 'react'
import {useState} from 'react'
import imagic from "../Images/aboutus.jpg"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {useNavigate} from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
  const [userData,setuserData]=useState({});
  const  callAboutPage=async()=>{
    try{
         
      const resfrombackened=await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"

        },
        credentials:'include'
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
 callAboutPage();
  },[]);

  return (
    <>

  <div className="container emp-profile">
    <form method="GET">
      <div className="row">
        <div className="col-md-4">
          <img src={imagic}  style={{height:'180px',width:'200px'}} alt="ok"/>
        </div>

      <div className="col-md-6">
        <div className="profile-head">
         <h5>{userData.name}</h5>
         <h6>{userData.work}r</h6>
         <p className="profile-rating mt-3 mb-5">Ranking: <span>1/10</span></p>

          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
            </li>
          </ul>

        </div>
      </div>

      <div className="col-md-2">
        <input type="submit" className='profile-edit-btn' style={{width:'115px'}} name="btnAddMore" value="edit profile"/>
      </div>
    </div>


    <div className="row">
     <div className='col-md-4'>
        <div className="profile-work">
          <p>WORK LINK</p>
          <a href="https://www.youtube.com/results?search_query=arrow+function+vs+normal+function+javascript" target="_thapa">Youtube</a><br/>
          <a href="https://www.youtube.com/results?search_query=arrow+function+vs+normal+function+javascript" target="_thapa">Instragram</a><br/>
          <a href="https://www.youtube.com/results?search_query=arrow+function+vs+normal+function+javascript" target="_thapa">Web developer</a><br/>
        </div>
     </div>


    <div className="col-md-8 pl-5 about-info">
      <div className='tab-content profile-tab' id="myTabContent">
        
      <div className='tab-pane fade show active' id="home" role="tabpanel" aria-labelledby="home-tab">
       
       <div className='row'>
        <div className='col-md-6'>
          <label> USER ID</label>
        </div>
        <div className="col-md-6">
         <p>{userData._id}</p>
        </div>
        </div>

      <div className='row mt-3'>
        <div className='col-md-6'>
          <label>Name</label>
        </div>
        <div className="col-md-6">
         <p>{userData.name}</p>
        </div>
        </div>

        <div className='row mt-3'>
        <div className='col-md-6'>
          <label> Email</label>
        </div>
        <div className="col-md-6">
         <p>{userData.email}</p>
        </div>
        </div>

        <div className='row mt-3'>
        <div className='col-md-6'>
          <label> phone</label>
        </div>
        <div className="col-md-6">
         <p>{userData.phone}</p>
        </div>
        </div>

        <div className='row mt-3'>
        <div className='col-md-6'>
          <label> Profession </label>
        </div>
        <div className="col-md-6">
         <p>{userData.work}</p>
        </div>
        </div>

     </div>
    
     <div className='tab-pane fade show' id="profile" role="tabpanel" aria-labelledby="profile-tab">
        
         <div className='row'>
          <div className='col-md-6'>
            <label> Experience </label>
          </div>
          <div className="col-md-6">
           <p>Expert</p>
          </div>
          </div>
 
        <div className='row mt-3'>
          <div className='col-md-6'>
            <label> Hourly Rate </label>
          </div>
          <div className="col-md-6">
           <p>10$/hr</p>
          </div>
          </div>

          <div className='row mt-3'>
          <div className='col-md-6'>
            <label> Total Projects</label>
          </div>
          <div className="col-md-6">
           <p>230</p>
          </div>
          </div>

          <div className='row mt-3'>
          <div className='col-md-6'>
            <label> English level</label>
          </div>
          <div className="col-md-6">
           <p>Expert</p>
          </div>
          </div>

          <div className='row mt-3'>
          <div className='col-md-6'>
            <label> Availability </label>
          </div>
          <div className="col-md-6">
           <p>6 Months</p>
          </div>
          </div>

      </div>
   

     </div>

    </div>
    </div>
  </form>
</div>

    </>
  )
} 

export default About


    