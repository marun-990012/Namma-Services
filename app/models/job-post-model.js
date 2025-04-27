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
    jobrRequests:[{
        serviceProvider:{
            type: Schema.Types.ObjectId,
            ref: 'User', 
          },
        messages:String,
        response:[String],
        name:String,
        profileImage:''
    }],
    workStatus: {
        type: String,
        enum: ['started', 'In-Progress', 'Completed'],
        default: 'Pending'
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