import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconSearch, IconBriefcaseOff } from "@tabler/icons-react";
import { fetchAccount } from "../../redux/slices/profileSlice";
import { findNearestJobs } from "../../redux/slices/jobPostSlice";
import { fetchAddress } from "../../redux/slices/profileAddressSlice";
import { listCategories } from "../../redux/slices/serviceCategorySlice";

function LatestJobPosts() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  // Fetch user profile and categories on mount
  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(listCategories());
  }, [dispatch]);

  // Get needed redux state slices
  const userAddress = useSelector(
    (state) => state.address?.data?.location?.coordinates
  );
  const userAccount = useSelector((state) => state.profile?.data);
  const categories = useSelector((state) => state.services?.data);
  const nearestJobs = useSelector((state) => state.jobs?.latest) || [];

  const filteredNearestJobs = nearestJobs.filter(
    (job) =>
      !job.jobRequests.some((req) => req.serviceProvider === userAccount?._id)
  );

  const searchJob = useMemo(() => {
    const searchText = search.toLowerCase().trim();
    return filteredNearestJobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(searchText) ||
        job.salary?.toString().includes(searchText) ||
        job.description?.toLowerCase().includes(searchText) ||
        job.address?.toLowerCase().includes(searchText)
      );
    });
  }, [search, filteredNearestJobs]);

  useEffect(() => {
    if (!userAddress) {
      dispatch(fetchAddress());
    }
  }, [dispatch, userAddress]);

  // Find user's service category object from categories list
  const userServiceType = categories?.find(
    (category) => category._id === userAccount?.serviceType
  );

  useEffect(() => {
    if (
      userAddress &&
      Array.isArray(userAddress) &&
      userAddress.length >= 2 &&
      userServiceType &&
      userServiceType._id
    ) {
      dispatch(
        findNearestJobs({
          lat: userAddress[1],
          lng: userAddress[0],
          serviceType: userServiceType?._id,
        })
      );
    }
  }, [userAddress, userServiceType, dispatch]);

  // Show loading if essential data not ready yet
  if (!userServiceType || !userAddress) {
    return (
      <div className="p-10 text-center text-gray-600">
        Loading latest jobs...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center border-3 border-white shadow-xl rounded-[8px] p-10 mb-4">
      <div className="w-full">
        <div className="flex items-center">
          <p>
            Latest Job Posts -{" "}
            <span className="border border-green-300 rounded bg-green-200 text-green-700 font-medium px-3">
              {filteredNearestJobs.length}
            </span>
          </p>
          <div className="flex ml-10 w-full max-w-md">
            <div className="flex items-center w-full bg-white border border-gray-300 rounded-xl shadow-sm px-4 py-2 focus-within:ring-1 focus-within:ring-orange-400 transition">
              <IconSearch size={20} className="text-gray-500 mr-3 " />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs by title, address, or salary"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {Array.isArray(searchJob) && searchJob.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full bg-white mt-22 mb-20 p-8 rounded-[10px] shadow-inner border border-gray-200">
            <IconBriefcaseOff size={48} className="text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              No Jobs Nearby
            </h2>
            <p className="text-gray-500 text-sm text-center max-w-md">
              Currently, there are no job posts near your location that you
              haven't applied to. Please check back later or try exploring other
              services.
            </p>
          </div>
        ) : (
          searchJob.map((job) => (
            <div key={job._id} className="flex justify-center">
              <div className="flex items-center justify-between bg-white w-full py-2 px-6 rounded-[8px] shadow-md mt-4">
                <div>
                  <div className="flex gap-4 text-gray-400 text-[14px]">
                    <p>{job.postTime}</p>
                    <p>{job.postDate}</p>
                  </div>
                  <div>
                    <p className="text-[17px] text-gray-800 font-medium">
                      {job.title}
                    </p>
                  </div>
                  <div className="mt-1">
                    <p className="text-gray-700">
                      Work location:
                      <span className="text-gray-500"> {job.address}</span>
                    </p>
                  </div>
                  <div className="flex gap-10 mt-1 text-sm">
                    <p className="text-gray-700 font-semibold">
                      Salary: ₹{" "}
                      <span className="text-green-600 font-semibold">
                        {job?.salary}
                      </span>
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Distance:{" "}
                      <span className="text-green-600 font-semibold">
                        {job?.dist?.calculated} KM
                      </span>
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Applicants:{" "}
                      <span className="text-green-600 font-semibold">
                        {job?.jobRequests?.length}
                      </span>
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Considered:{" "}
                      <span className="text-green-600 font-semibold">
                        {job?.considerations?.length}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    to={`/jobs/recent/detail/${job?._id}/${job?.dist?.calculated}`}
                  >
                    <button className="bg-green-300 hover:bg-green-400 text-green-600 hover:text-green-800 px-6 py-1 rounded-[6px] font-semibold shadow-sm cursor-pointer">
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJobPosts;
