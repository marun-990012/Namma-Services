import mongoose from "mongoose";

const {Schema,model} = mongoose;

const ratingSchema=new Schema({
      serviceProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
      jobProvider: {
        type: Schema.Types.ObjectId,
        ref: 'User',  
      },
      jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
      },
    images:[String],
    rating:Number, 
    review:[
      {
        name:String,
        message:String,
        profileImage:String
      },
    ],
    tipAmount: {
        type: Number,
        default: 0
      },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
      },
    

},{timestamps:true});

const ReviewRating = model('rating',ratingSchema);

export default ReviewRating;