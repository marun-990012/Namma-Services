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
    rating:Number, 
    review:[
      {
        message:String,
      },
    ],
},{timestamps:true});

const ReviewRating = model('review',ratingSchema);

export default ReviewRating;