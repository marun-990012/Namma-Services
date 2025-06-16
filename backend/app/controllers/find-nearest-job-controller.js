
import mongoose from "mongoose";
import Job from "../models/job-post-model.js";

const findNearestJobController = {};

findNearestJobController.nearestJob = async (req, res) => {
  const { lat, lng,serviceCategory} = req.query;
  
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


      return res.status(200).json(jobsInKm);
    } else {
      return res.status(404).json({ message: "No recent nearby jobs found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export default findNearestJobController;
