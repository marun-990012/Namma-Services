import Job from "../models/job-post-model.js";
const jobPostController={};

jobPostController.create = async(req,res)=>{
    const {title,description,workLocation,salary,images} = req.body;
    try{
        const jobPost = await Job.create({title,description,workLocation,salary,images,postedBy:req.userId});
        return res.status(201).json(jobPost);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

jobPostController.list = async(req,res)=>{
    try{
        const jobPosts = await Job.find();
        return res.json(jobPosts);
    }catch(error){
        console.log(error);
        return res.status(500).json({error:"Something went wrong"});
    }
};

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
}
export default jobPostController;