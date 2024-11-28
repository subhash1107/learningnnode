import { v2 as cloudinary } from "cloudinary";
import fs from "fs"
import configEnv from "./config.js";



    // Configuration
    cloudinary.config({ 
        cloud_name: configEnv.CLOUDINARY_CLOUD_NAME, 
        api_key: configEnv.CLOUDINARY_API_KEY, 
        api_secret: configEnv.CLOUDINARY_API_SECRET
    });
    
    
    const uploadOnCloudinary = async (localFilePath)=>{ 
        try {
            if(!localFilePath) return "local path not awailable";
            // uploading files
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto",
            })
            return response.url
            
        } catch (error) {
            fs.unlinkSync(localFilePath)//unlink the path or file that is failed during uploading 
            console.log(error);
            
            return "there is some error";
        }
    }

    export {uploadOnCloudinary}