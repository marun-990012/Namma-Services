
import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const jobPostSchema = new Schema({
    title:String,
    description:String,
    salary:Number,
    address:String,
    postalCode:String,
    location:{
      type: {
        type: String,
        enum: ['Point'],
        default:'Point'
      },
      coordinates:[Number]
    },
    images:[String],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    jobRequests:[{
        serviceProvider:{
            type: Schema.Types.ObjectId,
            ref: 'User', 
          },
        messages:[
          {
            textMessage:String,
            response:[String],
            name:String,
            profileImage:String
          }
        ],
    }],
    considerations :[String],
    selectedServiceProvider:{
      type: Schema.Types.ObjectId,
      ref: 'User', 
    },
    workStatus: {
        type: String,
        enum: ['not-assigned','started', 'completed'],
        default: 'not-assigned'
    },
    postDate: {
        type: String,
        default: () => new Date().toLocaleDateString()
      },
    postTime: {
        type: String,
        default: () => new Date().toLocaleTimeString()
      }
},{timestamps:true});

jobPostSchema.index({ location: '2dsphere' });
const Job=model('job',jobPostSchema);

export default Job;