
import cloudinary from "../../config/cloudinaryConfig.js";

const mediaController = {};
/**
 * This function is used to Upload the image into cloudinary
 * @param { file } - This  function takes images as a aggument upload it into cloudinary
 * @returns - it returns the address of the image stored in cloudinary
*/

mediaController.uploadImage = async(req,res)=>{
    try {
          const file = req.file.path;
      
          const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: 'Namma-Services',
          });
      
          return res.json(cloudinaryResponse.secure_url);
        } catch (err) {
          console.error("Error uploading image to Cloudinary:", err);
          return res.status(500).json({ error: "Failed to upload image" });
        }
}

export default mediaController;