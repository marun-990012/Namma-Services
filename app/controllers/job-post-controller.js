import Job from "../models/job-post-model.js";
const jobPostController={};

jobPostController.create = async(req,res)=>{
    const {title,description,workLocation,salary,images} = req.body;
    try{
        const jobPost = await Job.create({title,description,workLocation,salary,images});
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
}
export default jobPostController;