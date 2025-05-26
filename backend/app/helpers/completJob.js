import Job from "../models/job-post-model.js";

export const completeJob = async ({jobId, userId }) => {
  // console.log(userId,jobId);
  const jobPost = await Job.findOne({ _id: jobId, postedBy: userId });
  if (!jobPost) throw new Error("This post is no longer available or unauthorized access");

  jobPost.workStatus = "completed";
  await jobPost.save();
  return jobPost;
};
