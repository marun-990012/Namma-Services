import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { fetchAccount,updateProfile} from "../../redux/slices/profileSlice";
import { fetchAddress, updateAddress } from "../../redux/slices/profileAddressSlice";
import { listCategories } from "../../redux/slices/serviceCategorySlice";
function ProfileUpdate(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name,setName] = useState('');
    const [service,setService] = useState('');
    const [bio,setBio] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [street,setStreet] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [loading, setLoading] = useState(false);

     useEffect(()=>{
         dispatch(fetchAccount());
         dispatch(fetchAddress());
         dispatch(listCategories());
    },[dispatch]);

    const userAddress = useSelector((state)=>{
        return state.address;
    }).data;

    const userAccount = useSelector((state)=>{
        return state.profile;
    }).data;

    console.log(userAccount?.userType)
    const listCategory = useSelector((state)=>{
      return state.services;
    }).data
    console.log(service)
    console.log(userAccount?.name)

   useEffect(() => {
  if (userAccount && userAddress ) {
    
      setName(userAccount?.name || '');
      setBio(userAccount?.bio || '');
      setService(userAccount?.serviceType || '')
      setPhoneNumber(userAccount?.phoneNumber || '');
      setStreet(userAddress.street);
      setCity(userAddress.city);
      setPostalCode(userAddress.postalCode);
      setState(userAddress.state);
      setCountry(userAddress.country);
       
  }
}, [userAccount, userAddress]);

const validations = ()=>{
    if(name.trim().length<2){
        toast.error('Name field required');
        return false;
    }

    if (userAccount?.userType !== "work-provider" && service.trim().length < 2) {
    toast.error("Select Service Type");
    return false;
  }

    if(phoneNumber.trim().length<10){
        toast.error('Number required');
        return false;
    }

    if(street.trim().length<5){
        toast.error('Street required');
        return false;
    }

    if(city.trim().length<2){
        toast.error('City required');
        return false;
    }

    if(postalCode.trim().length<4){
        toast.error('postalCode required');
        return false;
    }

    if(state.trim().length<2){
        toast.error('state required');
        return false;
    }

    if(country.trim().length<4){
        toast.error('country required');
        return false;
    }

    return true;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validations()) return;

  const payload = {
    name,
    bio,
    phoneNumber,
  };

  if (userAccount?.userType !== "work-provider") {
    payload.serviceType = service;
  }

  try {
    setLoading(true); // start loading
    await Promise.all([
      dispatch(updateProfile(payload)).unwrap(),
      dispatch(updateAddress({ street, city, state, postalCode, country })).unwrap(),
    ]);

    toast.success("Profile updated successfully");
    navigate('/profile');
  } catch (error) {
    toast.error(error?.message || "Profile update failed");
  } finally {
    setLoading(false); // stop loading
  }
};

    

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 backdrop-blur-md ">
            <div className="bg-white px-7 py-5 rounded-[8px] border border-gray-300 shadow-[10px]">
               <div className="flex justify-between">
                <p className="text-[20px]">Edit Profile</p>
                <button onClick={(()=>{navigate('/profile')})} className="border border-gray-400 hover:bg-gray-300 text-gray-500 cursor-pointer px-3 rounded outline-none ">Cancel</button>
               </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-600">Name</label>
                    <input type="text" placeholder="Ex : Mr xyz" value={name} onChange={(e)=>{setName(e.target.value)}} className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"/>
                  </div>

                  {userAccount?.userType=='service-provider' && (
                    <div className="flex flex-col mt-2">
                    {/* <label htmlFor="" className="text-gray-600">Select service type</label> */}
                    <select name="" className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]" value={service} onChange={(e)=>{setService(e.target.value)}} id="">
                      <option value="" className="text-gray-500">Select service type</option>
                      {listCategory.map((service)=>{
                        return(
                          <option key={service._id} value={service._id}>{service.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  )}
                  

                  <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-600">Bio</label>
                    <input type="text" placeholder="Ex : My bio" value={bio} onChange={(e)=>{setBio(e.target.value)}} className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"/>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-600">Phone Number</label>
                    <input type="text" placeholder="Ex : 1234567890" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}}  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"/>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-600">Street</label>
                    <input type="text" placeholder="Ex : my address city postal address" value={street} onChange={(e)=>{setStreet(e.target.value)}} className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"/>
                  </div>

                   <div className="flex flex-col">
                    <label htmlFor="" className="text-gray-600">City</label>
                    <input type="text" placeholder="Ex : my address city postal address" value={city} onChange={(e)=>{setCity(e.target.value)}} className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px]"/>
                  </div>

                  <div className="flex gap-2">
                   <div className="flex flex-col">
                     <label htmlFor="" className="text-gray-600">PostalCode</label>
                    <input type="text" placeholder="Ex : 123456" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}}  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-26"/>
                   </div>

                   <div className="flex flex-col">
                     <label htmlFor="" className="text-gray-600">State</label>
                    <input type="text" placeholder="Ex : State" value={state} onChange={(e)=>{setState(e.target.value)}}  className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[8px] py-[4px] w-40"/>
                   </div>

                   <div className="flex flex-col">
                     <label htmlFor="" className="text-gray-600">Country</label>
                    <input type="text" placeholder="Ex:Country" value={country} onChange={(e)=>{setCountry(e.target.value)}} className="border border-gray-300 shadow rounded focus:outline-none focus:border-orange-200 px-[3px] py-[4px] text-center w-22"/>
                   </div>
                  </div>

                  <div className="mt-5 text-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white text-[17px] w-full py-2 rounded-[5px] cursor-pointer">{loading ? "Updating..." : "Save Changes"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
    )
}
export default ProfileUpdate;