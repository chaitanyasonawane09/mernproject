const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'});
require('./db/conn');
//const User=require('./model/userSchema');

//we link router files to make our route easy
app.use(express.json());               //convert data into object
app.use(require('./router/auth'));
const PORT= process.env.PORT;




app.get('/',(req,res)=>{
  res.send("helloworlf from server");
});
// app.get('/about',middleware,(req,res)=>{              //middleware Check that before going to this about page user valid or not if valid then go ot next
//     res.send("about");
//   });
  app.get('/contact',(req,res)=>{
    res.send("contact");
  });
  // app.get('/signin',(req,res)=>{
  //   res.send("signin");
  // });
  // app.get('/signup',(req,res)=>{
  //   res.send("signup");
  // });

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})