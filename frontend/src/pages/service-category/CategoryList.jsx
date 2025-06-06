import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { SquarePen, Trash2,CopyPlus   } from 'lucide-react';
import toast from "react-hot-toast";
import { listCategories,deleteCategory } from "../../redux/slices/serviceCategorySlice";
function CategoryList(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(listCategories());
    },[dispatch]);

    const serviceData = useSelector((state)=>{
        return state.services;
    });

    const handleEdit = (id)=>{
      navigate(`/category/edit/${id}`);
    }

    const handleDelete = async(id)=>{
        try {
        const res = await dispatch(deleteCategory(id)).unwrap()
        console.log(res)
          if(res.message){
          toast.error(res.message);
      }else{
        toast.success("deleted successful",{
        duration: 5000 // in milliseconds (e.g., 5 seconds)
      })}

        } catch (error) {
           const errorMessage = error?.message || "Login failed";
           toast.error(errorMessage);
        }
    };


    return (
       <div className="bg-gray-150 pb-7 rounded-[8px] border-2 border-white mb-4 shadow">
  <h2 className="bg-white p-4 text-2xl font-bold text-center mb-6 border-b border-white pb-2 ">Trending  service categories</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-5 px-4">
    {serviceData.data.map((cat, index) => (
      <div key={index} className="flex flex-col items-center text-center bg-white py-2 rounded-[5px]">
        <img
          src={cat.imageUrl}
          alt={`${cat.name} icon`}
          className="w-20 h-20 object-contain mb-3"
        />
        <p className="text-sm font-medium text-gray-700">{cat.name}</p>
        <div className="flex w-[90%] justify-between">
          <button onClick={()=>{handleEdit(cat._id)}} className="mt-2 bg-green-500 hover:bg-green-600 text-white text-[13px] px-5 py-1 rounded cursor-pointer flex items-center gap-[2px]">
          <SquarePen size={17}/> edit 
        </button>
        <button onClick={()=>{handleDelete(cat._id)}} className="mt-2 bg-red-500 hover:bg-red-600 text-white text-[13px] px-4 py-1 rounded cursor-pointer flex items-center gap-[2px]">
         <Trash2 size={17}/>  Delete 
        </button>
        </div>
      </div>
    ))}


  </div>
  <div className="mt-5 px-5">
    <button onClick={()=>{navigate('/category/new')}} className="mt-2 bg-green-500 hover:bg-green-600 text-white text-[13px] px-5 py-1 rounded cursor-pointer flex items-center gap-[4px]"> <CopyPlus size={17}/> Add Category</button>
  </div>
</div>

    )
}
export default CategoryList;