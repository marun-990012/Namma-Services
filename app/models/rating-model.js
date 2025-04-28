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
      images: {
        type: [String],
        default: []
      },

    rating:Number, 
    review:[String],
    tipAmount: {
        type: Number,
        default: 0
      },
    status: {
        type: String,
        enum: ['in-progress', 'Completed'],
        default: 'in-progress'
      }

},{timestamps:true});

const Rating=model('rating',ratingSchema);

export default Rating;