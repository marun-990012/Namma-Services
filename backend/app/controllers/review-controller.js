import ReviewRating from "../models/review-model.js";
const reviewRatingController = {};

//review create controller
reviewRatingController.create = async(req,res)=>{
    const {serviceProvider,jobProvider,jobId,rating,review} = req.body;
    try{
        const reviewRating = await ReviewRating.create({serviceProvider,jobProvider,jobId,rating,review});
        return res.status(201).json(reviewRating);
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
    
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

reviewRatingController.list = async(req,res)=>{
    const id = req.params.id;
    try{
        const review = await ReviewRating.find({serviceProvider:id});
        return res.json(review);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
}


reviewRatingController.like = async(req,res)=>{
    const id = req.params.id;
    try{
        const review = await ReviewRating.findById(id);

        if(!review){
            return res.status(404).json({message:"Review not found"});
        }

        review.likes = review.likes +1;
        review.save();
        return res.json(review);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
}


export default reviewRatingController;