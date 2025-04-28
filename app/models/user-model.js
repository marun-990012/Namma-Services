import mongoose, { Types } from "mongoose";

const {Schema,model} =mongoose;

const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    userType:String,
    phoneNumber:String,
    profileImage:String,
    bio:String,
    address: [
        {
          street:String,
          city:String,
          state:String,
          postalCode:String,
          country: {
            type: String,
            default: 'India'
          },
          latitude: {
            type: Number,  
            default: null
          },
          longitude: {
            type: Number,  
            default: null
          }
        }
      ],      
    images:[String],
    serviceType:{},
    isActive:{
        type:Boolean,
        default:false
    },
    isRejected:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verifiedBadge:{
        type:String
    }
    
},{timestamps:true});

const User=model('user',userSchema);

export default User;