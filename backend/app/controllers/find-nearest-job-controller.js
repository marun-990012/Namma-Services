// import Job from "../models/job-post-model.js";
// const findNearestJobController = {};

// findNearestJobController.nearestJob = async(req,res)=>{
//     const { lat, lng} = req.query;
//     const {serviceCategory} = req.body;
//     try{
//         const jobs = await Job.aggregate([
//             {
//               $geoNear: {
//                 near: {
//                   type: "Point",
//                   coordinates: [parseFloat(lng), parseFloat(lat)]
//                 },
//                 distanceField: "dist.calculated",
//                 query:{
//                     title: {
//                       $regex: serviceCategory, //electrician
//                       $options: 'i' // case-insensitive
//                     }
//                   },
//                 maxDistance: 4000, // in meters
//                 includeLocs: "dist.location",
//                 spherical: true
//               }
//             }
//           ]);

         
//         if(jobs.length>0){
//              // Convert distance from meters to kilometers
//              const jobsInKilometers = jobs.map((job) => {
//                 return ({...job,dist: {...job.dist,calculated: (job.dist.calculated / 1000).toFixed(2)},})
//             });
//             return res.status(200).json(jobsInKilometers);
//         }else{
//             return res.status(404).json({message:"job not found"});
//         }
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({error:'Something went wrong'});
//     }
// }
// export default findNearestJobController;

import mongoose from "mongoose";
import Job from "../models/job-post-model.js";

const findNearestJobController = {};

findNearestJobController.nearestJob = async (req, res) => {
  const { lat, lng,serviceCategory} = req.query;
  // const {serviceCategory} = req.body;
  // console.log(serviceCategory,lat,lng)

  try {
    // Validate coordinates
    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    // Calculate date 3 days ago
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 2);

    // Geo + date + category filter
    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          distanceField: "dist.calculated",
          query: {
            ...(serviceCategory && {
              serviceCategory: new mongoose.Types.ObjectId(serviceCategory)
            })
          },
          maxDistance: 9000,
          includeLocs: "dist.location",
          spherical: true
        }
      },
      {
        $match: {
          createdAt: { $gte: threeDaysAgo }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    if (jobs.length > 0) {
      const jobsInKm = jobs.map((job) => ({
        ...job,
        dist: {
          ...job.dist,
          calculated: (job.dist.calculated / 1000).toFixed(2)
        }
      }));

      // console.log(jobsInKm);

      return res.status(200).json(jobsInKm);
    } else {
      return res.status(404).json({ message: "No recent nearby jobs found" });
    }
  } catch (error) {
    console.error("Error in nearestJob:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default findNearestJobController;
