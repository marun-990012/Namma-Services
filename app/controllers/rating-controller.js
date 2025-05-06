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
        const review = await ReviewRating.findOne({jobId:jobId,jobProvider:req.userId});
        if(!review){
            return res.status(404).json({message:"your previous review is deleted or unauthorixed access"});
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


//remove or delete review
reviewRatingController.removeReview = async(req,res)=>{
    //main id and review id
    const {id,reviewid} = req.params;
    try{
        const review = await ReviewRating.findOneAndUpdate({_id:id,jobProvider:req.userId},{ $pull: { review: { _id: reviewid } } },{new:true});
        if(!review){
            return res.status(404).json({message:"your previous review is deleted"});
        }
      
    //   await review.save();

      return res.json(review);
    // return res.json('hello');
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//update review
reviewRatingController.updateReview = async(req,res)=>{
    //main id and review id
    const {id,reviewid} = req.params;
    const {message} = req.body;
    try{
        const review = await ReviewRating.findOne({_id:id,jobProvider:req.userId});
        if(!review){
            return res.status(404).json({error:"your previous review is deleted or unauthorized access"});
        }
        const reviewToUpdate = review.review.id(reviewid); // find subdocument by _id from array
        if (!reviewToUpdate) {
            return res.status(404).json({ error: "Review not found" });
        }
        reviewToUpdate.message = message;
       await review.save();
    
      return res.json(review);
    // return res.json('hello');
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

reviewRatingController.list = async(req,res)=>{
    try{
        const review = await ReviewRating.find();
        return res.json(review);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
}
export default reviewRatingController;