import axios from "axios";
import mongoose from 'mongoose';
import User from '../models/user-model.js';
import Job from "../models/job-post-model.js";
import { sendNotification } from "../helpers/notify.js";
import { deductCoin } from "../services/walletService.js";
import Transaction from "../models/transactions-model.js";
import { sendConsiderNotification, sendSelectNotification } from "../helpers/send-mail.js";

const jobPostController={};

//Controller for create job Post
jobPostController.create = async(req,res)=>{
    const {title,description,serviceCategory,address,postalCode,salary,images} = req.body;

    const apiKey = process.env.GEOAPIFY_API_KEY;
    console.log(process.env.GEOAPIFY_API_KEY)
    const encodedAddress = encodeURIComponent(`${address} ${postalCode}`);
    const url = `${process.env.GEOAPIFY_URL}=${encodedAddress}&apiKey=${apiKey}`;
    try{
      

      const response = await axios.get(url);
      const location = response.data.features[0].properties;
      
      const jobPost = await Job.create({title,description,serviceCategory,address:location.formatted,postalCode:location.postcode,location: {type: 'Point',coordinates: [location.lon, location.lat]},salary,images,postedBy:req.userId});

    await sendNotification({
     userId: req.userId,
     title: "New Job Post Created Successfully",
     message: `The job post "${jobPost.title}" has been created successfully.`,
     type: "success",
    });

        return res.status(201).json(jobPost);
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};


//controller for list all the job posts
jobPostController.list = async(req,res)=>{
  console.log('hi')
    try{
        const jobPosts = await Job.find();
        return res.json(jobPosts);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
}; 

//controller for show job detail
jobPostController.show = async (req,res) =>{
    const id = req.params.id;
  try {
    const job = await Job.findById(id);
    // console.log(job)
    if(!job){
      return res.status(404).json({message:'Job post not found'})
    }
    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"Something went wrong"});
  }
}

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

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const encodedAddress = encodeURIComponent(`${address} ${postalCode}`);
    const url = `${process.env.GEOAPIFY_URL}=${encodedAddress}&apiKey=${apiKey}`;
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
  const { serviceProvider, messages } = req.body;

  try {
    const jobPost = await Job.findById(id);
    if (!jobPost) {
      return res.status(404).json({
        error: "You cannot send a request to this post because it is no longer available.",
      });
    }

    // Prevent duplicate request by serviceProvider
    const alreadyRequested = jobPost.jobRequests.some(
      (r) => r.serviceProvider.toString() === serviceProvider
    );

    if (alreadyRequested) {
      return res.status(409).json({ error: "You have already applied to this job." });
    }

    // Deduct 1 coin BEFORE saving the job request
    const transactionData = {
      amount: 1,
      status: 'success',
    };

    try {
      await deductCoin(req.userId);
      transactionData.user = serviceProvider;
      transactionData.purpose = 'debit_wallet';
      const transaction = new Transaction(transactionData);
      await transaction.save();
    } catch (walletError) {
      return res.status(400).json({ error: walletError.message });
    }

    // Now add the job request safely
    jobPost.jobRequests.push({ serviceProvider, messages });
    await jobPost.save();

    // In-app notifications
    await sendNotification({
      userId: jobPost.postedBy,
      title: "New Job Request",
      message: `A service provider has applied to your job post "${jobPost.title}". You can review their request from your job dashboard.`,
      type: "info",
    });

    await sendNotification({
      userId: serviceProvider,
      title: "Job Request Submitted",
      message: `Your request for the job "${jobPost.title}" has been submitted successfully. You can track its status from your dashboard.`,
      type: "success",
    });

    return res.json(jobPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

  

//controller for send message to requested job
jobPostController.sendMessage = async(req,res)=>{
    const id = req.params.id;
    const {message} = req.body;
    // console.log(id,message)
    // const userId = req.userId;
    try{
        const jobPost = await Job.findById(id);
        if(!jobPost){
            return res.status(404).json({error:"job post not found "})
        }

        // const request = jobPost.jobRequests.id(req.userId);
        //  const request = jobPost.jobRequests.find((req) => req.serviceProvider === req.userId);
         const jobRequest = jobPost.jobRequests.find(
        (request) => request.serviceProvider.toString() === req.userId
         );

         console.log(jobRequest)
        if (!jobRequest) {
          return res.status(404).json({ error: "Job request not found." });
        }
   
      const newMessage = {
              message: message,
              sender: req.userId
             };
        // const response=reply
       jobRequest.messages.push(newMessage);
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
    const {sender,serviceProvider,reply} = req.body
    // console.log(serviceProvider ,'id')
    try{
      const jobPost = await Job.findOne({ _id: id, postedBy: req.userId });
        if(!jobPost){
            return res.status(404).json({error:"job post not found or unauthorized access"})
        }

        const request = jobPost.jobRequests.find((req) => req.serviceProvider.toString() === serviceProvider.toString());
        // const request = jobPost.jobRequests.id(requestId);
        console.log(request)
        if (!request) {
          return res.status(404).json({ error: "Job request not found." });
        }
        const newMessage = {
              message: reply,
              sender: sender
             };
        // const response=reply
       request.messages.push(newMessage);
        await jobPost.save();
        return res.json(jobPost);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

// Controller to check if the service provider is currently working on another job
jobPostController.checkIfWorking = async(req,res)=>{
    const serviceProvider = req.params.serviceProvider;
    console.log(serviceProvider)
    try {
    
    const exists = await Job.exists({
      selectedServiceProvider: serviceProvider,
      workStatus: "started",
    });

    // If a job exists, send true, otherwise false
    res.status(200).json({ activeJobExists: !!exists });
  } catch (error) {
    console.error("Error checking active job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}


//controller for considerations 
jobPostController.consideration = async (req, res) => {
  const { id } = req.params;
  const { serviceProvider } = req.body;

  try {
    const jobPost = await Job.findById(id);
    if (!jobPost) {
      return res.status(404).json({ error: "This post is no longer available." });
    }

    const request = jobPost.jobRequests.find(
      (req) => req.serviceProvider.toString() === serviceProvider.toString()
    );

    if (!request) {
      return res.status(404).json({ error: "Job request not found." });
    }

    const alreadyConsidered = jobPost.considerations.includes(serviceProvider.toString());
    if (alreadyConsidered) {
      return res.status(400).json({
        message: "This service provider is already in the consideration list.",
      });
    }

    // Push service provider to considerations
    jobPost.considerations.push(serviceProvider);
    await jobPost.save();

    // Send Notifications
    const user = await User.findById(serviceProvider);
    if (user?.email) {
      sendConsiderNotification({
        email: user.email,
        title: jobPost.title,
      });
    }

    await sendNotification({
      userId: serviceProvider,
      title: "Job Consideration",
      message: `Good news! You're being considered for the "${jobPost.title}" job.`,
      type: "info",
    });

    return res.status(200).json({ message: "Added to consideration list.", jobPost });

  } catch (error) {
    console.error("Error in consideration controller:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};



//controller for remove from considerations 
jobPostController.removeConsideration = async (req, res) => {
    const id = req.params.id;
    const { serviceProvider } = req.body;
  
    try {
      const jobPost = await Job.findById(id);
      if (!jobPost) {
        return res.status(404).json({ error: "This post is no longer available." });
      }
  
      const beforeCount = jobPost.considerations.length;
  
      // Filter out the requestId from considerations or removing from consideration
      jobPost.considerations = jobPost.considerations.filter((ele) => ele.toString() !== serviceProvider);
  
      const afterCount = jobPost.considerations.length;
  
      if (beforeCount === afterCount) {
        return res.status(404).json({ error: "Request is not in the consideration list." });
      }
  
      await jobPost.save();

       await sendNotification({
       userId: serviceProvider,
       title: "Job Update",
       message: `You've been removed from consideration for the "${jobPost.title}" job.`,
       type: "warning",
      });


      return res.json(jobPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
  

  //select service Provider
  jobPostController.selectServiceProvider = async (req, res) => {
  const { id } = req.params;
  const { serviceProvider } = req.body;

  try {
    const jobPost = await Job.findById(id);
    if (!jobPost) {
      return res.status(404).json({ error: "This job post is no longer available." });
    }

    const request = jobPost.jobRequests.find(
      (req) => req.serviceProvider.toString() === serviceProvider
    );

    if (!request) {
      return res.status(404).json({ message: "Job request not found." });
    }

    if (jobPost.selectedServiceProvider?.toString() === serviceProvider) {
      return res.status(400).json({ message: "This service provider is already selected." });
    }

    // Remove from considerations if present
    jobPost.considerations = jobPost.considerations.filter(
      (userId) => userId.toString() !== serviceProvider
    );

    jobPost.selectedServiceProvider = serviceProvider;
    jobPost.workStatus = "started";

    await jobPost.save();

    // Fetch selected user
    const user = await User.findById(serviceProvider);

    // Email notification
    if (user?.email) {
      sendSelectNotification({
        email: user.email,
        title: jobPost.title,
      });
    }

    // In-app notification
    await sendNotification({
      userId: serviceProvider,
      title: "You’ve been selected!",
      message: `You've been selected to work on "${jobPost.title}". Please check your dashboard for more details.`,
      type: "success",
    });

    return res.status(200).json({ message: "Service provider selected successfully.", jobPost });

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
      
      jobPost.considerations = jobPost.considerations.filter((serviceProvider)=>{
        return serviceProvider != jobPost.selectedServiceProvider
      });
      
      jobPost.workStatus='completed';
       await jobPost.save();
       return res.status(201).json(jobPost);
    }catch(error){
       console.error(error);
       return res.status(500).json({ error: "Something went wrong" });
    }
  }


export default jobPostController;