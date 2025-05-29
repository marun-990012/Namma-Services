import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ratingSchema = new Schema({
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
  rating: Number,
  likes:{
    type:Number,
    default:0
  },
  review: {message: String},
  
  reviewDate: String, // will be auto-set
}, { timestamps: true });

// Pre-save hook to format and set reviewDate
ratingSchema.pre("save", function (next) {
  if (!this.reviewDate) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options); // e.g., "28 May 2025"
    this.reviewDate = formattedDate;
  }
  next();
});

const ReviewRating = model('review', ratingSchema);
export default ReviewRating;
