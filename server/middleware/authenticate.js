const jwt=require('jsonwebtoken');
const User=require("../model/userSchema");
const cookieParser = require('cookie-parser')
const express = require('express');

function parseCookies (request) {
  const list = {};
  const cookieHeader = request.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function(cookie) {
      let [ name, ...rest] = cookie.split(`=`);
      name = name?.trim();
      if (!name) return;
      const value = rest.join(`=`).trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
  });
  return list;
}

const app = express();
app.use(cookieParser())

var token;
const Authenticate=async(req,res,next)=>{
try{
  const cookies = parseCookies(req);
  console.log((cookies['jwtoken']));
   token=cookies['jwtoken'];
  const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
  const rootUser=await User.findOne({_id:verifyToken._id,"tokens.tokendata":token});
  if(!rootUser)
  {
    throw new Error('User Not Found');
  }
  else
  {
    // req.token=token;
     req.rootUser=rootUser;
  
    // req.userID=rootUSer._id;
    next();
  }
}catch(err){
  console.log(err);
    res.status(401).send("Unauthorized:No token provided")
}

}

module.exports=Authenticate;