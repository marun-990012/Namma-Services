import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CopyPlus } from "lucide-react";
import toast from "react-hot-toast";
import { createServiceCategory,listCategories, updateCategory } from "../../redux/slices/serviceCategorySlice";
import { imageUpload } from "../../redux/slices/imageUploadSlice";
function CategoryForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");

 const { data } = useSelector((state) => state.services);

useEffect(() => {
  dispatch(listCategories());
}, [dispatch]); // only dispatch once

useEffect(() => {
  if (id && data?.length) {
    const cat = data.find((cat) => cat._id === id);
    if (cat) {
      setname(cat.name);
      setDescription(cat.description);
      setImageUrl(cat.imageUrl);
    }
  }
}, [id, data]);

  useEffect(() => {
    if (!file) return;

    const upload = async () => {
      try {
        const fileData = new FormData();
        fileData.append("file", file);

        const response = await dispatch(imageUpload(fileData)).unwrap();
        setImageUrl(response);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    };
    upload();
  }, [file, dispatch]);

  //validations
  const validations = () => {
    if (name.trim().length < 4) {
      toast.error("Category name should be at least 4 characters");
      return false;
    }

    if (description.trim().split(" ").length < 10) {
      toast.error("Description should be at least 10 words");
      return false;
    }

    if(!imageUrl.trim()){
        toast.error('Image is required. Please select an image.');
        return false;
    }
    return true;
  };

  //handle submit 
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validations()) return;

  const formData = { name, description, imageUrl };

  if (id) {
    try {
      const res = await dispatch(updateCategory({ id, formData })).unwrap();
      console.log("response:", res);
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success("Category updated successfully", { duration: 5000 });
        navigate('/service-category');
      }
    } catch (error) {
      const errorMessage = error?.message || "Error while updating category. Please try again.";
      toast.error(errorMessage);
    }
  } else {
    try {
      const res = await dispatch(createServiceCategory(formData)).unwrap();
      console.log("response:", res);
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success("Category created successfully", { duration: 5000 });
        navigate('/profile');
      }
    } catch (error) {
      const errorMessage = error?.message || "Error while creating category. Please try again.";
      toast.error(errorMessage);
    }
  }
};

  return (
    <div className="border-2 border-white shadow rounded-[12px] flex justify-center items-center p-11 mb-2">
      <div className="border border-gray-300 shadow rounded-[12px] py-5 px-7 w-90 bg-white">
        {id ? (<p className="text-center text-[22px]">Edit service category</p>):(<p className="text-center text-[22px]">Add new service category</p>)}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Ex : new category"
                value={name}
                onChange={(e) => setname(e.target.value)}
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="" className="text-sm font-medium text-gray-600">
              Description
            </label>
            <input
              type="text"
              placeholder="Ex : write description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-sm font-medium text-gray-600">
              Select Category Image
            </label>
            <div>
              <label className="relative cursor-pointer flex justify-center items-center border border-gray-300 shadow rounded-[12px] w-18 h-18 bg-green-200 overflow-hidden">
                {imageUrl ? (
                  <>
                    <img
                      src={imageUrl}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent opening file picker
                        setImageUrl("");
                        setFile(null);
                      }}
                      className="absolute top-[2px] right-[3px] bg-white text-red-600 text-[12px] rounded-full px-2 py-0.5 shadow hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </>
                ) : (
                  <span className="text-[32px] text-green-500">+</span>
                )}

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white text-[16px] rounded-[7px] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CopyPlus size={19} />
                {id? "Save Category":"Add Category"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CategoryForm;
