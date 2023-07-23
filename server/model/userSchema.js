const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//document structure define
const userSchema=new mongoose.Schema({               //new instant create
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    phone:{
        type:Number,
        required:true 
    },
    work:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true 
    },
    cpassword:{
        type:String,
        required:true 
    },
    tokens:[
        {
            tokendata:{
                type:String,
                required:true
            }
       }
    ]
})  

//attach this strucure with project so made models(create collection)

//we hasing the password
//this use opposite of fat arrow  hence suse normal function here
//next use as middlware parameter
userSchema.pre('save',async function(next){
    console.log("well done pre");
if(this.isModified('password'))
{
    this.password=await bcrypt.hash(this.password,12);    
    this.cpassword=await bcrypt.hash(this.cpassword,12);
}
next();
});

//we are generating token
//userSchema is instance method
//userSchema is instance and it contain methods hence we get data from it by following way
userSchema.methods.generateAuthToken=async function(){
    try{
 
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({tokendata:token});

    await this.save();
    return token;
    }catch(err){
        console.log(err);
    }
}

const User=mongoose.model('USER',userSchema);
module.exports=User;