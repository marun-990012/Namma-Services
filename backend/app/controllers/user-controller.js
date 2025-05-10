import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import crypto from 'crypto';
import User from "../models/user-model.js";

import { sendVerificationEamil,senWelcomeEmail,sendResetPasswordEmail } from "../helpers/send-mail.js";
const userController = {};
// 9535840603

// user Registration controller
userController.register = async (req, res) => {
 
  const {name,email,password,userType,passcode} = req.body;
  // const Plainpassword = req.body.password;
  try {
    const user = new User({name,email,password,userType});
    if (userType == "work-provider" || userType == "admin") {
      user.isActive = true;
    } else {
      user.isActive = false;
    }

    if (user.userType === "admin" && passcode != "AdminPass") {
      return res.status(401).json({ message: "Passcode required for admin or enter correct passcode" });
    }

    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationToken=verificationToken;
    // console.log(verificationToken)
    await user.save();
    sendVerificationEamil({email:user.email,message:'Verify your account',verificationToken:verificationToken});
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//verify email
userController.verfiyEmail = async(req,res)=>{
  try {
      const {code,email}=req.body 
      const user = await User.findOne({ email, verificationToken: code });
      if (!user) {
          return res.status(400).json({success:false,message:"Inavlid or Expired Code"})      
      }
        
   user.isVerified=true;
   user.verificationToken=undefined;
   await user.save()
   await senWelcomeEmail({email:user.email,name:user.name,message:"Email Verifed Successfully! Welcome to website"})
   return res.status(200).json({success:true,message:"Email Verifed Successfully"})
         
  } catch (error) {
      console.log(error)
      return res.status(500).json({success:false,message:"internal server error"})
  }
};


userController.forgotPassword = async(req,res)=>{
  const {email} = req.body;
  try{
     const user = await User.findOne({email});
     if(!user){
      return res.status(404).json({error:"userr not found"});
     }

     // Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      sendResetPasswordEmail({token:resetToken,email:user.email});

     // Hash it before storing in DB for security
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

     // Set expiry time (e.g., 15 minutes from now)
      const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

     // Save to user document (example)
      user.passwordResetToken = hashedToken;
      user.passwordResetExpires = tokenExpiry;

      await user.save();
      return res.json({success:true,message:`reset token has be sent your ${user.email}`});

  }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"internal server error"})
  }
}

//reset password
userController.resetPassword = async(req,res)=>{
  const { token, newPassword } = req.body;
  try {
      // Hash token to match what was stored
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        // Find user with matching token and check expiry
        const user = await User.findOne({
           passwordResetToken: hashedToken,
           passwordResetExpires: { $gt: Date.now() }
         });

      if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
      }

      // Update password and clear reset fields
       const salt = await bcryptjs.genSalt();
       const hashedPassword = await bcryptjs.hash(newPassword,salt);
       user.password = hashedPassword;
       user.passwordResetToken = undefined;
       user.passwordResetExpires = undefined;
       await user.save();
       return res.json({success:true,message:'password chenged succefully'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:"internal server error"})
  }
}

userController.loginOtp = async (req,res) => {
  const {email} = req.body; 
   try{
    const user = await User.findOne({email});
    const verificationToken= Math.floor(100000 + Math.random() * 900000).toString();
    if(user){
      user.verificationToken=verificationToken;
      user.tokenExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
      await user.save();
      sendVerificationEamil({email:user.email,message:'Login OTP',verificationToken:verificationToken});
      return res.status(200).json({message:'otp send successfully check email'});
    }

    return res.status(404).json({message:'Invalid email or no account found.'})
   }catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:"internal server error"})
   }
}
// user login controller
userController.login = async (req, res) => {
  // console.log(process.env.JWT_SECRET)
  const { password, email,otp } = req.body;
  console.log(password, email,otp );
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    if(!user.isVerified){
      return res.json({message:"please verify your account!"});
    }

    if(otp != user.verificationToken){
      return res.json({message:"please please enter valid OTP"});
    }
    if (user.tokenExpires < Date.now()) {
      return res.json({ message: "OTP has expired resend otp" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    // console.log(isVerified)
    if (!isMatch) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const tokenData = { userId: user._id, role: user.userType };
    // console.log(tokenData)
    const token = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    await user.save();
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
    const {image} = req.body;
    try{
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{profileImage:image},{new:true});
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


//upload image controller
userController.uploadPhotos = async(req,res)=>{
    const id = req.params.id;
    const {image} = req.body;
    try{
        if(req.userId==id){
            const user = await User.findByIdAndUpdate(id,{image},{new:true});
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
