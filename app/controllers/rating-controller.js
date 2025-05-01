import ReviewRating from "../models/rating-model.js";
const reviewRatingController = {};

//review create controller
reviewRatingController.create = async(req,res)=>{
    const {serviceProvider,jobProvider,jobId,images,rating,review} = req.body;
    try{
        const reviewRating = await ReviewRating.create({serviceProvider,jobProvider,jobId,images,rating,review});
        return res.status(201).json(reviewRating);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//add more review to current post
reviewRatingController.moreReview = async(req,res)=>{
    const jobId = req.params.id;
    // console.log(jobId)
    const {name,message,profileImage} = req.body;
    try{
        const review = await ReviewRating.findOne({jobId:jobId});
        if(!review){
            return res.status(404).json({message:"your previous review is deleted"});
        }
      const newReview = {name,message,profileImage};
      review.review.push(newReview);
      await review.save();

      return res.status(201).json(review);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


export default reviewRatingController;