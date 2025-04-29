
import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const jobPostSchema=new Schema({
    title:String,
    description:String,
    salary:Number,
    workLocation:String,
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
        messages:String,
        response:[String],
        name:String,
        profileImage:String
    }],
    selectedServiceProvider:Schema.Types.ObjectId,
    workStatus: {
        type: String,
        enum: ['started', 'in-progress', 'completed'],
        // default: 'pending'
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

const Job=model('job',jobPostSchema);

export default Job;