const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const authenticate=require("../middleware/authenticate");
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser());

require('../db/conn');
const User=require("../model/userSchema");
router.get('/',(req,res)=>{
    res.send("helloworld from router");
  });


  //**registeration route
  router.post('/register',async(req,res)=>{                        //async function for async-wait
    const{name,email,phone,work,password,cpassword}=req.body;
    if(!name||!email||!phone||!work||!password||!cpassword)
    {
        return res.status(422).json({error:"plz fill all data"});
    }

    //***promise
    // User.findOne({email:email})
    // .then((userExist)=>{
    //     if(userExist)
    //     {
    //         return res.status(422).json({error:"email already exist"});
    //     }
    //     //const user=new User(req.body)   //this way all entries are required
    //     const user=new User({name,email,phone,work,password,cpassword})  //new instance of User is created i.e document(row)
    //     user.save().then(()=>{
    //        res.status(201).json({error:"user registered succesfully"});
    //     }).catch((err)=>res.status(500).json({error:"Failed to registered"}));
    // }).catch((err=>{console.log(err);}))
  

    //***async await

    try{
    const userExist = await User.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({error:"email already exist"});
        }
        else if(password!=cpassword)
        {
          return res.status(422).json({error:"password are not matchong"});
        }
        else
        {
          if(!userExist)
          res.status(422).json({error:"Invlaid Credientials"});
          else
          {
        const user=new User({name,email,phone,work,password,cpassword})
        await user.save();
         res.status(201).json({error:"user registered succesfully"});
          }
        }
    }catch(err)
    {
        console.log(err);
    }


    // console.log(req.body);
    // res.json({message:req.body});
  });


     //**login route */

     router.post('/signin',async(req,res)=>{
      try{
       
        const{email,password}=req.body;
        // console.log(req.body)
        if(!email||!password)
        {
          return res.status(400).json({error:"plz filled the data"});
        }
        const userLogin=await User.findOne({email:email});
        // console.log(`${password}`);
        if(userLogin)
        {
        // console.log(`${userLogin.password}`);
        const isMatch=await bcrypt.compare(password,userLogin.password);
        
        const token=await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken",token,
        {
          expires:new Date(Date.now()+25892000000),
          httpOnly:true
        });
   
        if(!isMatch) res.status(400).json({error:"Invalid Credientials"});
        else
        res.status(200).json({mesaage:"user signin Successfully"});
        }
        else
        res.status(400).json({error:"Invalid Credientials"});

      }catch(err){
        console.log(err); 
      }


      // console.log(req.body);
      // res.json({message:req.body});
     });

     router.get('/about',authenticate,(req,res)=>{     //middleware Check that before going to this about page user valid or not if valid then go ot next
      res.send(req.rootUser);
      //res.clearCookie('jwtoken');         

    });

    //contact us page 
    router.get('/getdata',authenticate,(req,res)=>{  
      //res.clearCookie('jwtoken');            
      res.send(req.rootUser);

    });




  module.exports=router;