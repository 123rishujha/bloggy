const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerController = async (req,res,next) =>{
    const { name, email, password } = req.body;

    if(!name || !email || !password ){
        let error = new Error("please fill all the fields");
        error.statusCode = 401;
        next(error);
    }

    try{
        let existUser = await UserModel.findOne({email});
        if(existUser){
            console.log("user exist");
            let err = new Error("user already exist with the provided email");
            err.statusCode = 401;
            next(err);
        }
        else{
            bcrypt.hash(password,5, async (err,hash) => {
                if(err){
                    console.log("error occured while hashing the password");
                    next(err);
                }else{
                    const newUser = new UserModel({
                        name,email,password: hash
                    }) 
                    await newUser.save()
                    // let savedUser = await newUser.save();
                    .then((savedUser)=>{
                        res.json({success:true,user:savedUser,message:"registration successfull"});
                    })
                    .catch(err=>{
                        console.log("error occured while saving the user",err);
                        next(err);
                    })
                    
                }
            });
        }
    }   
    catch(err){
        console.log("error from registerCon")
        let error =  new Error(err);
        // throw error;
        next(error);
    } 

}

const loginController = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        let userFound = await UserModel.findOne({email});
        if(!userFound){
            let err = {message:"User Not Found"};
            err.statusCode = 404;
            next(err);
            return;
        }
        else{
            let match = await bcrypt.compare(password,userFound.password);
            if(match){
                let token = jwt.sign({"userId":userFound._id},`${process.env.JWT_SECRET}`);
                res.json({success:true,message:"login successful",token});
            }else{
                console.log('error occured while comparing password during login',err);
                next(err);
            }
            // bcrypt.compare(password,userFound.password,async (err,success)=>{
            //     if(err){
            //         console.log('error occured while comparing password during login',err);
            //         next(err);
            //     }else{
            //         res.json({success:true,message:"login successful"});
            //     }
            // })
        }
    }
    catch(err){
        err.statusCode = 400;
        next(err);
    }
}

module.exports={
    registerController,
    loginController
}
