import toast from "react-hot-toast";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { IconCloudUpload,IconPhotoUp  } from '@tabler/icons-react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ViewImage from "./ViewImage";
import ProfileUpdate from "./ProfileUpdate";
import WorkImageUpload from "./WorkImageUpload";
import {
  fetchAccount,
  updateProfileImage,
} from "../../redux/slices/profileSlice";
import { imageUpload } from "../../redux/slices/imageUploadSlice";
import { fetchReviews } from "../../redux/slices/reviewRatingSlice";
import { fetchAddress } from "../../redux/slices/profileAddressSlice";
import { listCategories } from "../../redux/slices/serviceCategorySlice";

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
  const userAddress = useSelector((state) => state.address)?.data;
  const services = useSelector((state) => state.services)?.data;
  const myServiceType = services.find((service) => {
    return service._id == userAccount.data?.serviceType;
  });
  

  useEffect(() => {
  if (userAccount?.data?._id && userAccount?.data?.userType === 'service-provider') {
    dispatch(fetchReviews(userAccount?.data?._id));
  }
}, [userAccount?.data?._id, userAccount?.data?.userType, dispatch]);


  const reviews = useSelector((state) => state.review)?.reviews;
  const averageRating = reviews.length? reviews.reduce((acc, cv) => acc + cv.rating, 0) / reviews.length: 0;

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
      <div className="bg-gray-100 flex justify-center border-5 border-white rounded-[10px] shadow-[8px] mb-4">
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

          <div className=" flex justify-between px-5 pt-5">
            <div className=" flex justify-evenly w-[55%] ml-10">
              <div className="bg-gray-100 p-2 rounded-full mt-[-75px]">
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
                {userAccount?.data?.userType =='service-provider' && (<p className="flex items-center">
                  {[0, 1, 2, 3, 4].map((_, idx) => {
                      const isFilled = idx + 1 <= averageRating;
                      const isHalf =
                        !isFilled &&
                        averageRating > idx &&
                        averageRating < idx + 1;

                      return (
                        <div key={idx}>
                          <Star
                            size={17}
                            color={isFilled || isHalf ? "#e8c008" : "#d1d5db"}
                            fill={
                              isFilled
                                ? "#e8c008"
                                : isHalf
                                ? "url(#half)"
                                : "none"
                            }
                          />
                        </div>
                      );
                    })}

                    <span className="ml-1">{averageRating?.toFixed(1)}</span>
                </p>)}
                
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

          {/* images div */}

          <div className="flex justify-center px-4 py-2">
            <div className="mb-4 w-[98%]">
              <p className="text-[17px] font-medium">Work related images</p>
              {userAccount.data?.images?.length > 0 && (
                <div className="mt-3 p-2 rounded bg-white flex flex-wrap gap-[11px] text-ceter">
                  {userAccount.data?.images?.map((image, i) => (
                    <img
                      key={i}
                      className="w-36 h-36 rounded border border-gray-300 shadow-[8px] cursor-pointer"
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
              className="flex items-center ml-7 bg-gray-400 hover:bg-gray-500 text-white rounded-[5px] cursor-pointer px-3 py-[3px]"
            >
            <IconCloudUpload size={18} className="mr-1"/>  Add images
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
                  <span className="flex items-center mt-4 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <IconPhotoUp size={18} className="mr-1"/>  Add or Change
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
