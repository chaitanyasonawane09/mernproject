const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require("dotenv");

dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;

mongoose.connect(DB
).then(()=>{
  console.log(`connection succesful`);
}).catch((err)=>console.log('no connection'));


//middleware
const middleware=(req,res,next)=>{
console.log("middleware");
next();
}


app.get('/',(req,res)=>{
  res.send("helloworlf");
});
app.get('/about',middleware,(req,res)=>{              //middleware check that before going to this about page user valid or not if valid then go ot next
    res.send("about");
  });
  app.get('/contact',(req,res)=>{
    res.send("contact");
  });
  app.get('/signin',(req,res)=>{
    res.send("signin");
  });
  app.get('/signup',(req,res)=>{
    res.send("signup");
  });

app.listen(3000,()=>{
    console.log(`server is running at port 3000`);
})