import mongoose from "mongoose";

const {Schema,model} =mongoose;

const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    userType:String,
    phoneNumber:String,
    profileImage:String,
    bio:String,    
    images:[String],
    serviceType:Schema.Types.ObjectId,
    isActive:{
        type:Boolean,
        default:false
    },
    isRejected:{
        type:Boolean,
        default:false
    },
    requested:{
        type:Boolean,

    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifiedBadge:{
        type:String
    },
    verificationToken:String,
    tokenExpires :String,
    passwordResetToken:String,
    passwordResetExpires:String
    
},{timestamps:true});

const User=model('user',userSchema);

export default User;