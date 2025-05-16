import Job from "../models/job-post-model.js";
const findNearestJobController = {};

findNearestJobController.nearestJob = async(req,res)=>{
    const { lat, lng} = req.query;
    try{
        const jobs = await Job.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: [parseFloat(lng), parseFloat(lat)]
                },
                distanceField: "dist.calculated",
                // query:{
                //     title: {
                //       $regex: "plumber",
                //       $options: 'i' // case-insensitive
                //     }
                //   },
                maxDistance: 4000, // in meters
                includeLocs: "dist.location",
                spherical: true
              }
            }
          ]);

         
        if(jobs.length>0){
             // Convert distance from meters to kilometers
             const jobsInKilometers = jobs.map((job) => {
                return ({...job,dist: {...job.dist,calculated: (job.dist.calculated / 1000).toFixed(2)+' '+'KM'},})
            });
            return res.status(200).json(jobsInKilometers);
        }else{
            return res.status(404).json({message:"job not found"});
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({error:'Something went wrong'});
    }
}
export default findNearestJobController;