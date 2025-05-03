import Job from "../models/job-post-model.js";
const findNearestJobController = {};

findNearestJob.nearestJob = async(req,res)=>{
    try{
        const jobs = await Job.aggregate([
            {
                $geoNear:{
                    near:{type:"point",coordinates:[]},
                    distanceField:'dist.calculated',
                    maxDistance:5000,
                    query:{salary:200},
                    includeLocs:'dist.location',
                    spherical:true
                }
            }
        ]);

        if(jobs.length>0){
            return res.status(200).json(jobs);
        }else{
            return res.status(404).json({message:"job not found"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default findNearestJobController;