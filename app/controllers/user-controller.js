import User from '../models/user-model.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
const userController={};
// 9535840603

// user Registration controller
userController.register = async(req,res)=>{
    const body = req.body;
    try{
        const totalUsers= await User.countDocuments();
        if(body.userType=='work-provider'){
            body.isActive=true;
        }else{
            body.isActive=false;
        }

        if(totalUsers==0){
            body.userType = 'admin';
            body.isActive=true;
        } 
        
        const salt = await bcryptjs.genSalt();
        const newPassword = await bcryptjs.hash(body.password,salt); 
        body.password=newPassword;
        const user = await User.create(body);
        return res.status(201).json(user);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"})
    }
};


// user login controller
userController.login = async(req,res)=>{
    // res.json('hello server')
    const {password,email} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            return user.status(404).json({message:"invalid email or password"});
        }

        const isVerified = await bcryptjs.compare(password,user.password);
        // console.log(isVerified)
        if(!isVerified){
            return user.status(404).json({message:"invalid email or password"});
        }
        const tokenData={userId:user._id,role:user.userType}
        // console.log(tokenData)
        const token= jsonwebtoken.sign(tokenData,'Secret@123',{expiresIn:'7d'});
        return res.json({token:token});
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


// controller for list all the users
userController.list = async(req,res)=>{
    // res.json('hello');
    try{
        const users = await User.find();
        return res.json(users);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

export default userController;