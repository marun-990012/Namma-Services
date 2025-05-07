import Job from "../models/job-post-model.js";
import axios from "axios";
import mongoose from 'mongoose';

const jobPostController={};

//Controller for create job Post
jobPostController.create = async(req,res)=>{
    const {title,description,address,postalCode,salary,images} = req.body;

    const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
    const encodedAddress = encodeURIComponent(`${address} ${postalCode}`);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
    try{
      

      const response = await axios.get(url);
      const location = response.data.features[0].properties;
      // return { lat: location.lat, lng: location.lon };

        const jobPost = await Job.create({title,description,address:location.formatted,postalCode:location.postcode,location: {type: 'Point',coordinates: [location.lon, location.lat]},salary,images,postedBy:req.userId});
        return res.status(201).json(jobPost);
        // return res.json(location)
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for list all the job posts
jobPostController.list = async(req,res)=>{
    try{
        const jobPosts = await Job.find();
        return res.json(jobPosts);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
}; 


//controller for list all the job posts belongs to users
jobPostController.myJobPosts = async (req,res) =>{
    try{
        const posts = await Job.find({postedBy:req.userId});
        if(posts.length<1){
            return res.status(404).json({message:"You haven't created any posts yet."});
        }
        return res.json(posts);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

//controller for update job post
jobPostController.updatePost = async(req,res)=>{
    const id = req.params.id;
    const {title,description,address,postalCode,salary,images} = req.body;

    const apiKey = '414f3b4ff1ad47088654fae1b1c6ca01';
    const encodedAddress = encodeURIComponent(`${address} ${postalCode}`);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;
    try{
           const response = await axios.get(url);
           const location = response.data.features[0].properties;

        const post = await Job.findOneAndUpdate(
            { _id: id, postedBy: req.userId }, // Ensure user owns the post
            {title,description,address:location.formatted,postalCode:location.postcode,location: {type: 'Point',coordinates: [location.lon, location.lat]},salary,images},
            { new: true }
          );
      
          if (!post) {
            return res.status(404).json({ error: "Job post not found or unauthorized" });
          }
      
          return res.json(post);
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for delete job post
jobPostController.remove = async(req,res)=>{
    const id = req.params.id;
    try{
        const post = await Job.findOneAndDelete({ _id: id, postedBy: req.userId });
        if (!post) {
        return res.status(404).json({ error: "Post not found or unauthorized to delete" });
        }
       return res.json(post);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//job Request Controller
jobPostController.jobRequest = async (req, res) => {
    const id = req.params.id;
    const {serviceProvider,messages} = req.body;
  
    try {
      const jobPost = await Job.findById(id);
      if (!jobPost) {
        return res.status(404).json({ error: "You cannot send a request to this post because it is no longer available." });
      }
  
      // Prevent duplicate request by serviceProvider
      const alreadyRequested = jobPost.jobRequests.some(
        (r) => r.serviceProvider.toString() === serviceProvider
      );
  
      if (alreadyRequested) {
        return res.status(409).json({ error: "You have already applied to this job." });
      }
  
      jobPost.jobRequests.push({serviceProvider,messages});
      await jobPost.save();
  
      return res.status(201).json(jobPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  

//controller for send message to requested job
jobPostController.sendMessage = async(req,res)=>{
    const id = req.params.id;
    const {requestId,message} = req.body;
    try{
        const jobPost = await Job.findById(id);
        if(!jobPost){
            return res.status(404).json({error:"job post not found "})
        }

        const request = jobPost.jobRequests.id(requestId);
        if (!request) {
          return res.status(404).json({ error: "Job request not found." });
        }

        const newMessage = {
          _id: new mongoose.Types.ObjectId(),
          textMessage: message.textMessage,
          response: message.response || [],
          name: message.name,
          profileImage: message.profileImage,
        };
    
        request.messages.push(newMessage);
        await jobPost.save();
        return res.json(jobPost);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for reply to message
jobPostController.sendReply = async(req,res)=>{
    const id = req.params.id;
    const {requestId,messageId,reply} = req.body
    try{
      const jobPost = await Job.findOne({ _id: id, postedBy: req.userId });
        if(!jobPost){
            return res.status(404).json({error:"job post not found or unauthorized access"})
        }

        const request = jobPost.jobRequests.id(requestId);
        if (!request) {
          return res.status(404).json({ error: "Job request not found." });
        }

       const message = request.messages.id(messageId);
        if (!message) {
            return res.status(404).json({ error: "Message not found." });
        }

        message.response.push(reply);
        await jobPost.save();
        return res.json(jobPost);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for considerations 
jobPostController.consideration  = async(req,res)=>{
    const id = req.params.id;
    const {requestId} = req.body
    try{
        const jobPost = await Job.findById(id);
        if(!jobPost){
            return res.status(404).json({error:"this post no longer available."})
        }

        const request = jobPost.jobRequests.id(requestId);
        if (!request) {
          return res.status(404).json({ error: "Job request not found." });
        }

       // Prevent duplicate entries in considerations
      if(!jobPost.considerations.includes(request._id)) {
        jobPost.considerations.push(request._id);
        await jobPost.save();
      }else{
        return res.json({message:"This service provider is already in the consideration list."})
      }
        return res.json(jobPost);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for remove from considerations 
jobPostController.removeConsideration = async (req, res) => {
    const id = req.params.id;
    const { requestId } = req.body;
  
    try {
      const jobPost = await Job.findById(id);
      if (!jobPost) {
        return res.status(404).json({ error: "This post is no longer available." });
      }
  
      const beforeCount = jobPost.considerations.length;
  
      // Filter out the requestId from considerations or removing from consideration
      jobPost.considerations = jobPost.considerations.filter((ele) => ele.toString() !== requestId);
  
      const afterCount = jobPost.considerations.length;
  
      if (beforeCount === afterCount) {
        return res.status(404).json({ error: "Request is not in the consideration list." });
      }
  
      await jobPost.save();
      return res.json(jobPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  

  //select service Provider
  jobPostController.selectServiceProvider = async (req, res) => {
    const { id } = req.params;
    const { requestId } = req.body;
  
    try {
      const jobPost = await Job.findById(id);
      if (!jobPost) {
        return res.status(404).json({ error: "This post is no longer available." });
      }
  
      const request = jobPost.jobRequests.find(req => req._id.toString() === requestId);
      
      if (!request) {
        return res.status(404).json({ message: "Job request not found." });
      }
  
      jobPost.selectedServiceProvider = requestId;
      jobPost.workStatus = 'started';
  
      await jobPost.save();
  
      return res.status(200).json(jobPost);
    } catch (error) {
      console.error("selectServiceProvider error:", error);
      return res.status(500).json({ error: "Something went wrong." });
    }
  };
  


  //task completed controller
  jobPostController.complete = async(req,res)=>{
    const id = req.params.id;
    try{
        const jobPost = await Job.findOne({_id:id,postedBy:req.userId});
      if (!jobPost) {
        return res.status(404).json({ error: "This post is no longer available or aunauthorized access" });
      }
      jobPost.workStatus='completed'
       await jobPost.save();
       return res.status(201).json(jobPost);
    }catch(error){
       console.error(error);
       return res.status(500).json({ error: "Something went wrong" });
    }
  }


export default jobPostController;