import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { listCategories } from "../../redux/slices/serviceCategorySlice";
import { createJobPost } from "../../redux/slices/jobPostSlice";
function JobPostForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [salary, setSalary] = useState("");
  const [images, setImages] = useState("");

    useEffect(()=>{
           dispatch(listCategories());
      },[dispatch]);
      
          const listCategory = useSelector((state)=>{
            return state.services;
          }).data
          console.log(listCategory)
         

  const validations = () => {

    if (!title.trim()) {
      toast.error("title field required");
      return false;
    }
    if (title.trim().length < 4) {
      toast.error("title should be atleast 4 character");
      return false;
    }

    if (description.trim().split(" ").length < 10) {
      toast.error("Description should be at least 10 words");
      return false;
    }

    if (!serviceCategory.trim()) {
      toast.error("Service category required");
      return false;
    }

    if (address.trim().length < 20) {
      toast.error("address should be atleast 20 character");
      return false;
    }

    if (!postalCode.trim()) {
      toast.error("postalCode required");
      return false;
    }

    if (postalCode.trim().length < 4) {
      toast.error("Enter correct postalCode");
      return false;
    }

    if (!salary) {
      toast.error("salary required");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validations()) return;

    try {
      const res = await  dispatch(createJobPost({title,description,serviceCategory,address,postalCode,salary,images,})).unwrap();
      toast.success("Job post created successfully");
      navigate("/job/posts");
    } catch (error) {
      toast.error(error?.message || "failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-md ">
      <div className="bg-white px-7 py-5 rounded-[8px] border border-gray-300 shadow-[10px] w-100">
        <div className="flex justify-between">
          <p className="text-[20px]">Create job post</p>
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="border border-gray-400 hover:bg-gray-300 text-gray-500 cursor-pointer px-3 rounded outline-none "
          >
            Cancel
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
           <div className="flex flex-col gap-1">

             <div className="flex flex-col">
              <label htmlFor="" className="text-gray-600">
                Title
              </label>
              <input
                type="text"
                placeholder="Ex : Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-600">
                Description
              </label>
              <input
                type="text"
                placeholder="Ex : Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              />
            </div>


            <div className="flex flex-col mt-2">
              {/* <label htmlFor="" className="text-gray-600">Select service type</label> */}
              <select
                name=""
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
                value={serviceCategory}
                onChange={(e) => {
                  setServiceCategory(e.target.value);
                }}
                id=""
              >
                <option value="" className="text-gray-500">
                  Select service type
                </option>
                {listCategory.map((service) => {
                  return (
                    <option key={service._id} value={service._id}>
                      {service.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="flex flex-col">
              <label htmlFor="" className="text-gray-600">
                Bio
              </label>
              <input
                type="text"
                placeholder="Ex : My bio"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              />
            </div> */}

            

            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-600">
                Address
              </label>
              <input
                type="text"
                placeholder="Ex : my address city postal address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col">
                <label htmlFor="" className="text-gray-600">
                  PostalCode
                </label>
                <input
                  type="text"
                  placeholder="Ex : 123456"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-26"
                />
              </div>
            </div>


            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-600">
                Salary
              </label>
              <input
                type="number"
                placeholder="Ex : Rs.123"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
                className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
              />
            </div>

            

            <div className="mt-5 text-center">
              <button className="bg-green-500 hover:bg-green-700 text-white text-[17px] w-full py-2 rounded-[5px] cursor-pointer">
                Save Changes
              </button>
            </div>

           </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default JobPostForm;
