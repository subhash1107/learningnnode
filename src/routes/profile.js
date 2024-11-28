import express from "express"
import { userAuth } from "../middleware/auth.js";
import bcrypt from "bcrypt"
import { validateEditProfileData } from "../utils/validations.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const profileRouter = express.Router();


// ################  logged user profile #################
profileRouter.get("/profile/view", userAuth, async (req, res, next) => {
    // verifying jwt
    try {
      res.send(req.user);
    } catch (err) {
      res.send("ERROR : " + err.message);
    }
  });

// ################ editing profile ###############
profileRouter.patch("/profile/edit", userAuth,upload.single("photo"),validateEditProfileData, async (req,res,next) =>{
  
  try {
    const loggedInUser = req.user;
      
           
    Object.keys(req.body).forEach((key)=>{
      if(key != "photoUrl"){
        loggedInUser[key]=req.body[key]
      }
  });
  if(req.file){
    const cloudinary_response = await uploadOnCloudinary(req.file.path);
    loggedInUser.photoUrl = cloudinary_response;    
  }
    
    await loggedInUser.save();    
    res.send(loggedInUser)
  } catch (err) {
    res.status(400).send("ERROR: "+ err.message)
  }

})  

// ################# update password ###############
profileRouter.patch("/profile/updatePassword", userAuth, async (req,res,next) =>{
  try {
    const userData = req.user;
    const {currentPassword,newPassword} = req.body;
    const newPasswordHash = await bcrypt.hash(newPassword,10);
    const isValidPassword = await bcrypt.compare(currentPassword,userData.password);
    if(!isValidPassword){
      throw new Error("entered password is wrong")
    }
    userData.password = newPasswordHash;

    await userData.save();

     res.send()  

  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
  }
})

export default profileRouter