// cloudinary.services.js
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadToCloudinary = async (file,folder) =>{
     if(!file){
         return "File Path not Found"
     }
   try {
      const response = await cloudinary.uploader.upload(file,{
         resource_type:"auto",
         folder
      })

      console.log(response.url);
      return response.url

   } catch (error) {
      console.error("Cloudinary Upload Error:", error);
       throw error;
   }
}

module.exports = UploadToCloudinary;
