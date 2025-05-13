import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { imageUpload } from "../../redux/slices/imageUploadSlice";
import { uploadWorkImages } from "../../redux/slices/profileSlice";

function WorkImageUpload() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState([]);

  const handleFileChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);

    await handleImageUpload(file, index);
  };

  const handleImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading((prev) => [...prev, index]);
      const res = await dispatch(imageUpload(formData)).unwrap();
      const newImages = [...images];
      newImages[index] = res;
      setImages(newImages);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading((prev) => prev.filter((i) => i !== index));
    }
  };

  const addNewInput = () => {
    setFiles([...files, ""]);
    setImages([...images, ""]);
  };

  const removeInput = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSaveImages = async()=>{
    try {
    const res =  await dispatch(uploadWorkImages({ image:images })).unwrap();
       if(res){
        toast.success("image uploaded successfully");
       }
      
    } catch (error) {
      toast.error("Image upload failed");
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-md shadow-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Upload Work Images</h2>
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => window.location.reload()}
          >
            ✕
          </button>
        </div>

        {files.map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="file"
              onChange={(e) => handleFileChange(e, index)}
              className="border border-[#c4c4c4] rounded shadow px-2 py-[3px] focus:border-blue-500 outline-none w-[70%] cursor-pointer"
            />
            <button
              onClick={() => removeInput(index)}
              className="ml-2 text-red-500 text-sm"
            >
              ✕
            </button>
            {uploading.includes(index) ? (
              <span className="ml-2 text-yellow-600 text-sm">Uploading...</span>
            ) : images[index] ? (
              <span className="ml-2 text-green-600 text-sm">✅</span>
            ) : null}
          </div>
        ))}

        <button
          onClick={addNewInput}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add More
        </button>

        <button onClick={handleSaveImages}>Save Images</button>
      </div>
    </div>
  );
}

export default WorkImageUpload;
