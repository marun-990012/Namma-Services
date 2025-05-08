import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); 
cloudinary.config({
    cloud_name: 'dxludspye',
    api_key: "594237119177773",
    api_secret: "TiogsJ8kmhz5Fm48y609f3m8Rrc",
  });
  
  export default cloudinary;