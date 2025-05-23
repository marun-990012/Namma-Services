import {
  Star,
  BadgeCheck,
  PhoneCall,
  Mail,
  MapPinHouse,
  Camera,
  UserRound,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import toast from "react-hot-toast";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { imageUpload } from "../../redux/slices/imageUploadSlice";
import ProfileUpdate from "./ProfileUpdate";
import {
  fetchAccount,
  updateProfileImage,
} from "../../redux/slices/profileSlice";
import { fetchAddress } from "../../redux/slices/profileAddressSlice";
import { listCategories } from "../../redux/slices/serviceCategorySlice";
import WorkImageUpload from "./WorkImageUpload";
import ViewImage from "./ViewImage";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [hasUploaded, setHasUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const [showImagePopup, setShowImagePopup] = useState(false);

  // images
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (image) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    dispatch(fetchAccount());
    dispatch(fetchAddress());
    dispatch(listCategories());
  }, [dispatch]);

  const userAccount = useSelector((state) => state.profile);
  const userAddress = useSelector((state) => state.address)?.currentAddress;
  const services = useSelector((state) => state.services)?.data;
  const myServiceType = services.find((service) => {
    return service._id == userAccount.data?.serviceType;
  });
  console.log(myServiceType);
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

  useEffect(() => {
    if (!imageUrl || hasUploaded) return;

    const updateProImage = async () => {
      try {
        await dispatch(updateProfileImage({ imageUrl })).unwrap();
        toast.success("Profile image updated successfully");
        setHasUploaded(true);
        setImageUrl("");
      } catch (error) {
        toast.error("Image upload failed");
      }
    };

    updateProImage();
  }, [imageUrl, dispatch, hasUploaded]);

  const showProfileUpdate = id && path.startsWith("/profile/edit");
  const showImagesUpload = path.startsWith("/profile/image/upload");
  const viewImage = id && path.startsWith("/profile/image/view");

  const handleUpdate = (id) => {
    navigate(`/profile/edit/${id}`);
  };

  const showImageUpload = () => {
    navigate("/profile/image/upload");
  };
  return (
    <div>
      <div className="flex justify-center border-5 border-white rounded-[10px] shadow-[8px] mb-4">
        <div className="w-full rounded-tl-[10px] rounded-tr-[10px]">
          <div
            className={`h-43 bg-gray-300 flex flex-col justify-center items-center `}
          >
            <img
              className="rounded-tl-[10px] rounded-tr-[10px] w-70 h-70 opacity-30 mb-8 "
              src="https://res.cloudinary.com/dxludspye/image/upload/v1747219488/Namma-Services/x4rxf0fq5p5ymhzu81kd.png"
              alt="banner"
            />
          </div>

          <div className="flex justify-between px-5 pt-5">
            <div className="flex justify-evenly w-[55%] ml-10">
              <div className="bg-[#e3e7ef] p-2 rounded-full mt-[-75px]">
                <div
                  className="h-40 w-40 bg-[#e3e7ef] border border-white rounded-full bg-cover bg-center relative"
                  style={
                    userAccount.data?.profileImage
                      ? {
                          backgroundImage: `url(${userAccount.data?.profileImage})`,
                        }
                      : {}
                  }
                >
                  {!userAccount.data?.profileImage && (
                    <div className="flex items-center justify-center h-full w-full text-gray-600 bg-[#8e959d] rounded-full">
                      <UserRound size={147} />
                    </div>
                  )}
                  <label
                    className="absolute bottom-[10px] right-4 bg-green-500 p-1 rounded-full cursor-pointer"
                    onClick={() => setShowImagePopup(true)}
                  >
                    <Camera color="white" size={20} />
                  </label>
                </div>
              </div>
              <div className="mt-[-13px] mr-30 w-[400px] ml-2">
                <p className="text-[25px] flex items-center ">
                  {userAccount.data?.name}
                  <BadgeCheck color="#06f" className="ml-2" />
                </p>
                <p className="text-gray-600 ">
                  {userAccount.data?.userType}{" "}
                  {myServiceType?.name ? ` - ${myServiceType?.name}` : ""}
                </p>
                {userAccount.data?.bio && (
                  <p className="text-gray-800">
                    {userAccount.data?.bio} 
                  </p>
                )}
              </div>
            </div>
            <div className=" w-40 mr-10">
              <div className="flex justify-evenly">
                <Instagram
                  size={45}
                  color="orange"
                  className="bg-white p-2 rounded-[8px] cursor-pointer"
                />
                <Facebook
                  size={45}
                  color="orange"
                  className="bg-white p-2 rounded-[8px] cursor-pointer"
                />
                <Twitter
                  size={45}
                  color="orange"
                  className="bg-white p-2 rounded-[8px] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="">
            {/* <p className="ml-28 text-black font-medium inline-block px-3 cursor-pointer hover:underline">Edit profile</p> */}
            <button
              onClick={() => {
                handleUpdate(userAccount.data?._id);
              }}
              className="ml-25 text-black font-medium inline-block px-3 cursor-pointer hover:underline"
            >
              Edit profile
            </button>
          </div>
          {/* profile div */}
          <div className="mb-4 mt-2 flex gap-2 ml-17">
            {userAccount.data?.phoneNumber && (
              <div className="bg-white px-2 py-1 rounded">
                <p className="text-gray-700 flex items-center gap-3">
                  <PhoneCall size={20} />{" "}
                  <span className="text-gray-500">
                    {userAccount.data?.phoneNumber}
                  </span>
                </p>
              </div>
            )}
            <div className="bg-white px-2 py-1 rounded">
              <p className="text-gray-700 flex items-center gap-3">
                <Mail size={20} />{" "}
                <span className="text-gray-500">{userAccount.data?.email}</span>
              </p>
            </div>

            {userAddress?.address && (
              <div className="bg-white px-2 py-1 rounded">
                <p className="text-[#2E073F] flex items-center gap-3">
                  <MapPinHouse size={20} />{" "}
                  <span className="text-gray-500">{userAddress?.address}</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center px-4">
            <div className="flex justify-between h-50 w-[98%]">
              <div className="bg-white w-[49%] p-4 rounded-[8px] border border-gray-200 shadow-md">
                <p className="text-[17px] font-medium">Review and Ratings</p>
                <div className="mt-2 flex justify-between mr-7">
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
                      <span className="text-[17px]">All reviews</span> -{" "}
                      <span className="text-[35px] font-medium">123</span>
                    </p>
                  </div>
                </div>
                <div className="text-center mt-9">
                  <button className="bg-[#640D6B] hover:bg-orange-600 cursor-pointer w-75 py-2 rounded text-[17px] text-white">
                    View all reviews
                  </button>
                </div>
              </div>

              <div className="bg-white w-[49%] p-4 rounded-[8px] border border-gray-200 shadow-md">
                <p className="text-[17px] font-medium">Total work completed</p>
                <div className="mt-2 flex justify-center mr-7">
                  <div>
                    <p>
                      <span className="text-[17px]">Total work</span> -{" "}
                      <span className="text-[35px] font-medium">304</span>
                    </p>
                  </div>
                </div>
                <div className="text-center mt-9">
                  <button className="bg-[#640D6B] hover:bg-orange-600 cursor-pointer w-75 py-2 rounded text-[17px] text-white">
                    View completed works
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* images div */}

          <div className="flex justify-center px-4 py-2">
            <div className="mb-4 w-[98%]">
              <p className="text-[17px] font-medium">Work related images</p>
              {userAccount.data?.images?.length > 0 && (
                <div className="mt-3 p-2 rounded bg-white flex flex-wrap gap-[11px] text-ceter">
                  {userAccount.data?.images?.map((image, i) => (
                    <img
                      key={i}
                      className="w-37 h-37 rounded border border-gray-300 shadow-[8px] cursor-pointer"
                      src={image}
                      alt=""
                      onClick={() => {
                        navigate(`/profile/image/view/${i}`);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => {
                showImageUpload();
              }}
              className="ml-7 bg-gray-400 hover:bg-gray-500 text-white rounded-[5px] cursor-pointer px-3 py-[3px]"
            >
              Add images
            </button>
          </div>

          {/* select images */}
          {showImagesUpload && <WorkImageUpload />}
          {viewImage && <ViewImage />}

          {/*profile image update popup */}
          {showImagePopup && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
              <div className="bg-white w-72 p-6 rounded-xl shadow-xl relative flex flex-col items-center">
                {/* Close Button */}
                <button
                  onClick={() => setShowImagePopup(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>

                {/* Title */}
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Select Profile Image
                </p>

                {/* File Input */}
                <label className="cursor-pointer w-full flex flex-col items-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (selectedFile) {
                        setFile(selectedFile);
                        setShowImagePopup(false);
                      }
                    }}
                  />

                  {/* Current or Placeholder Image */}
                  {userAccount.data?.profileImage ? (
                    <img
                      src={userAccount.data?.profileImage}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 text-gray-500 shadow-md">
                      <UserRound size={64} />
                    </div>
                  )}

                  {/* Action Text */}
                  <span className="mt-4 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Add or Change
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Profile update popup */}
          {showProfileUpdate && <ProfileUpdate />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
