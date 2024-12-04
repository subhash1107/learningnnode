import dotenv from "dotenv";
dotenv.config()


const configEnv = {
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    CORS_URL:process.env.CORS_URL,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
}

export default configEnv;