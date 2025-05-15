import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { Eye } from 'lucide-react';
import { listJobPosts } from "../../redux/slices/jobPostSlice";
function MyJobPosts(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listJobPosts());
    },[dispatch]);

    const listJobs = useSelector((state)=>{
        return state.jobs;
    }).data;

    console.log(listJobs);
    return(
        <div className="flex justify-center items-center border-3 border-white p-4 rounded-[8px]">
            
   <div className="w-[95%] overflow-hidden rounded-lg shadow">
  <table className="w-full border-collapse">
    <thead>
      <tr className="text-center bg-gray-300 text-black">
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Title
        </th>
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Salary
        </th>
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Applicants
        </th>
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Selected
        </th>
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Status
        </th>
        <th className="border-b border-[#dfdee3] px-4 py-2  whitespace-nowrap align-middle">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white">
      {listJobs.map((ele) => (
        <tr key={ele._id}>
          <td className="border-b border-[#dfdee3] py-2 text-center">{ele.title}</td>
          <td className="border-b border-[#dfdee3] py-2 text-center">{ele.salary}</td>
          <td className="border-b border-[#dfdee3] py-2 text-center">{ele.jobRequests.length}</td>
          <td className="border-b border-[#dfdee3] py-2 text-center">
            {ele.selectedServiceProvider ? ele.selectedServiceProvider : 'Not Selected'}
          </td>
          <td className="border-b border-[#dfdee3] py-2 text-center">{ele.workStatus}</td>
          <td className="border-b border-[#dfdee3] py-2 text-center">
            <div className="flex justify-evenly items-center">
              <Link to={`/job/post/detail/${ele._id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-800 py-1 px-4 rounded-[6px] text-white cursor-pointer flex gap-1">
               {<Eye/>} Details
              </button>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        </div>
    )
}
export default MyJobPosts;