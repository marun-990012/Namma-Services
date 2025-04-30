import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const userController = {};
// 9535840603

// user Registration controller
userController.register = async (req, res) => {
  const body = req.body;
  try {
    const totalUsers = await User.countDocuments();
    if (body.userType == "work-provider") {
      body.isActive = true;
    } else {
      body.isActive = false;
    }

    if (totalUsers == 0) {
      body.userType = "admin";
      body.isActive = true;
    }

    const salt = await bcryptjs.genSalt();
    const newPassword = await bcryptjs.hash(body.password, salt);
    body.password = newPassword;
    const user = await User.create(body);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// user login controller
userController.login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    const isVerified = await bcryptjs.compare(password, user.password);
    // console.log(isVerified)
    if (!isVerified) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const tokenData = { userId: user._id, role: user.userType };
    // console.log(tokenData)
    const token = jsonwebtoken.sign(tokenData, "Secret@123", {
      expiresIn: "7d",
    });
    return res.json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// controller for list all the users
userController.list = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//account controller
userController.account = async (req, res) => {
   try{
    const user = await User.findById(req.userId);
    return res.json(user);
   }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
   }
};

//profile image update controller
userController.updateProfileImage = async(req,res)=>{
    const id = req.params.id;
    const {profileImage} = req.body;
    try{
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{profileImage},{new:true});
            if(!user){
                return res.status(404).json({message:"user not found"});
            }
            return res.json({user,message:"succefully updated"});
        }
        return res.json({error:"Unauthorized access"});
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


//profile image update controller
userController.uploadPhotos = async(req,res)=>{
    const id = req.params.id;
    const {images} = req.body;
    try{
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{images},{new:true});
            if(!user){
                return res.status(404).json({message:"user not found"});
            }
            return res.json({user,message:"succefully updated"});
        }
        return res.json({error:"Unauthorized access"});
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

//profile update controller
userController.updateProfile = async(req,res)=>{
    const id = req.params.id;
    const {bio,name,phoneNumber} = req.body;
    try{
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{bio,name,phoneNumber},{new:true});
            if(!user){
                return res.status(404).json({message:"user not found"});
            }
            return res.json({user,message:"succefully updated"});
        }
        return res.json({error:"Unauthorized access"});
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};


//address update controller(not done)
userController.updateAddress = async(req,res)=>{
    const id = req.params.id;
    const {address} = req.body;
    try{
        
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{address},{new:true});
            if(!user){
                return res.status(404).json({message:"user not found"});
            }
            return res.json({user,message:"succefully updated"});
        }
        return res.json({error:"Unauthorized access"});
    }catch(error){
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

//delete account controller
userController.remove = async(req,res)=>{
    const id = req.params.id;
   try{
    if(req.userId == id){
        const account = await User.findByIdAndDelete(id,{new:true});
        if(!account){
            return res.status(404).json({message:"User account not found"});
        }
        return res.json(account);
    }
    return res.json({error:"Unauthorized access"});
   }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
   }
}
export default userController;
