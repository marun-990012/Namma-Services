import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImagePlus ,Save } from "lucide-react";

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

  const handleSaveImages = async () => {
    try {
      if (!images || images.length === 0) {
        toast.error("Please select at least one image before uploading.");
        return;
      }

      const res = await dispatch(uploadWorkImages({ image: images })).unwrap();

      toast.success("Images uploaded successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.message || "Image upload failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white rounded-md shadow-lg p-4 max-w-md w-full">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-lg font-semibold">Upload Work Images</h2>
          <button
            className="text-gray-500 hover:text-black border border-gray-300 px-3 rounded "
            onClick={() => navigate("/profile")}
          >
          Cancel
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          {files.map((_, index) => (
            <div key={index} className="relative w-16 h-16">
              {images[index] ? (
                <div className="relative w-full h-full">
                  <img
                    src={images[index]}
                    alt={`Uploaded ${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      const updatedFiles = files.filter((_, i) => i !== index);
                      const updatedImages = images.filter(
                        (_, i) => i !== index
                      );
                      setFiles(updatedFiles);
                      setImages(updatedImages);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer w-full h-full border border-dashed flex items-center justify-center text-3xl rounded">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  +
                </label>
              )}

              {uploading.includes(index) && (
                <span className="absolute bottom-0 left-0 text-yellow-600 text-xs bg-white px-1 rounded">
                  Uploading...
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-evenly ">
          <div className="text-center">
            <p className="inline-block  p-1 rounded-full bg-white mb-[-20px]">
              <ImagePlus size={20} color="#FF9F00" />
            </p>
            <button
              onClick={addNewInput}
              className=" w-30 bg-[#c100ff] hover:bg-[#8711ad] cursor-pointer text-white px-2 pb-[2px] pt-[10px] rounded  flex justify-evenly"
            >
              Add More
            </button>
          </div>

          <div className="text-center">
            <p className="inline-block  p-1 rounded-full bg-white mb-[-20px]">
              <Save  size={20} color="green" />
            </p>
            <button
              onClick={handleSaveImages}
              className="w-30 bg-green-400 hover:bg-green-500 cursor-pointer text-white px-2 pb-[2px] pt-[10px] rounded  flex justify-evenly"
            >
              Save Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkImageUpload;
