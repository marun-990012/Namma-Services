import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { listCategories } from "../../redux/slices/serviceCategorySlice";
function CategoryList(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listCategories());
    },[dispatch]);

    const serviceData = useSelector((state)=>{
        return state.services;
    });

    console.log(serviceData);
    return (
       <div className="bg py-6 pb-7 px-4 rounded-[8px] border-2 border-white mb-4">
  <h2 className="text-2xl font-bold text-center mb-6 border-b border-white pb-2 ">Trending  service categories</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-5">
    {serviceData.data.map((cat, index) => (
      <div key={index} className="flex flex-col items-center text-center bg-white py-2 rounded-[5px]">
        <img
          src={cat.imageUrl}
          alt={`${cat.name} icon`}
          className="w-20 h-20 object-contain mb-3"
        />
        <p className="text-sm font-medium text-gray-700">{cat.name}</p>
        <button className="mt-2 bg-green-500 hover:bg-green-600 text-white text-[13px] px-11 py-1 rounded cursor-pointer">
          Select
        </button>
      </div>
    ))}
  </div>
</div>

    )
}
export default CategoryList;