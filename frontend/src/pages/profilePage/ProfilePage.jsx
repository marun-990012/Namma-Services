import { Star,BadgeCheck,ImagePlus,PhoneCall,Mail,MapPinHouse,Camera } from "lucide-react";
import { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { fetchAccount } from "../../redux/slices/profileSlice";
function ProfilePage() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAccount());
  },[dispatch]);

  const userAccount = useSelector((state)=>{
    return state.profile;
  });

  console.log(userAccount);
  return (
    <div>
      <div className="flex justify-center border-5 border-white rounded-[10px] shadow-[8px] mb-4">
        <div className=" w-full rounded-tl-[10px] rounded-tr-[10px]">
            {/* banner image div */}
          <div>
            <img
              className="rounded-tl-[10px] rounded-tr-[10px] w-full h-50"
              src="https://res.cloudinary.com/dxludspye/image/upload/v1746890819/Namma-Services/ugqpmgx9texs3ybispn9.png"
              alt=""
            />
          </div>

          {/* profile div */}
          <div className="flex justify-between p-5">
            <div className="flex justify-evenly w-[52%]">
              {/* <div className="mt-[-75px] p-2 bg-[#e3e7ef] rounded-full">
                <img
                  className="w-40 rounded-full"
                  src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png"
                  alt=""
                />

              </div> */}
              <div className="bg-[#e3e7ef] p-2 rounded-full mt-[-75px]">
              <div className="h-40 w-40  bg-[#e3e7ef] rounded-full bg-cover bg-center relative"style={{ backgroundImage: `url(https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png)` }}>
              {/* File input button */}
              <label className="absolute bottom-[10px] right-4 bg-green-500 p-1 rounded-full cursor-pointer">
                <Camera color="white" size={20} />
                <input type="file" className="hidden" />
              </label>
            </div>
            </div>
              <div className="mt-[-13px]">
                <p className="text-[25px] flex items-center">{userAccount.data?.name} < BadgeCheck color="#06f"  className="ml-2" /></p>
                <p className="text-gray-600">{userAccount.data?.userType} - electrician</p>
                <p className="text-gray-800">
                  Arun Rathod Service Provider Service Provider
                </p>
              </div>
            </div>

            <div>
              <p>Social Media</p>
            </div>
          </div>

          {/*contact details div  */}
          <div className=" mb-4 mt-3 flex gap-2 ml-22">
            <div className="bg-white px-2 py-1 rounded">
              <p className="text-gray-700 flex items-center gap-3 "><PhoneCall size={20}/>   <span className="text-gray-500">9900126189</span></p>
            </div>

             <div className="bg-white px-2 py-1 rounded">
              <p className="text-gray-700 flex items-center gap-3"><Mail size={20}/> <span className="text-gray-500">{userAccount.data?.email}</span></p>
            </div>

             <div className="bg-white px-2 py-1 rounded">
              <p className="text-[#2E073F] flex items-center gap-3"><MapPinHouse  size={20}/> <span className="text-gray-500">gandhi bazar basavanagudi bangalore karnataka 560004</span></p>
            </div>
          </div>

          {/* review and rating div */}
          <div className="flex justify-center p-4">
            <div className=" mt-1 flex justify-evenly h-50 w-[98%]">
              <div className="bg-white w-112 p-4 rounded-[8px]">
                <p className="text-[17px] font-medium">Review and Ratings</p>
                <div className="mt-2 flex justify-between mr-7 ">
                  <div>
                    <p className="flex items-center font-medium text-[35px]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} color="#ecd909" />
                      ))}
                      <span className="ml-2">4.5</span>
                    </p>
                  </div>
                   <div>
                    <p>
                      <span className="text-[17px]">All reviews</span> - <span className="text-[35px] font-medium">123</span>
                    </p>
                   </div>
                </div>
                <div className="text-center mt-9">
                    <button className="bg-[#640D6B] hover:bg-orange-600 cursor-pointer w-75 py-2 rounded text-[17px] text-white">View all reviews</button>
                </div>
              </div>

              <div className="bg-white w-112 p-4 rounded-[8px]">
                <p className="text-[17px] font-medium">Total work completed</p>
                <div className="mt-2 flex justify-center mr-7 ">
                  
                   <div>
                    <p>
                      <span className="text-[17px]">Total work</span> - <span className="text-[35px] font-medium">304</span>
                    </p>
                   </div>
                </div>
                <div className="text-center mt-9">
                    <button className="bg-[#640D6B] hover:bg-orange-600 cursor-pointer w-75 py-2 rounded text-[17px] text-white">View completed works</button>
                </div>
              </div>
            </div>
          </div>

          {/* work releted images div */}
          <div className=" mb-4 mt-3 mx-21 ">
            <p className="text-[17px] font-medium">Work releted images</p>
            <div className="mt-3 p-2 rounded bg-white flex justify-evenly">
                <img className="w-45 rounded border" src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png" alt="" />
                <img className="w-45 rounded" src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png" alt="" />
                <img className="w-45 rounded" src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png" alt="" />
                <img className="w-45 rounded" src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png" alt="" />
                {/* <img className="w-45 rounded" src="https://res.cloudinary.com/dxludspye/image/upload/v1746891160/Namma-Services/fvcjr2ts3hvs9d7dod64.png" alt="" /> */}
                <div className="w-45 h-45 flex items-center justify-center border border-[#989695] rounded">
                    <p><ImagePlus size={30} color="#989695"/></p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
