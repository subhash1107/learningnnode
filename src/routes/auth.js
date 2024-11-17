import { User } from "../models/user.js";
import express from "express";
import {validateSignUpData} from "../utils/validations.js";
import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";
// import { userAuth } from "./middleware/auth.js";


const authRouter = express.Router();


//########## signup api ##########
authRouter.post("/signup", async (req, res, next) => {
    const {
      firstName,
      lastName,
      eMail,
      password,
    } = req.body;
    const checkMail = await User.findOne({ eMail: req.body.eMail });
  
    try {
      // checking uniqueness of email
      if (checkMail) {
        throw new Error("user already exist");
      }
  
      // bcrypting password hash
      // const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
        
      // validating data
      validateSignUpData(req,res);
  
      // creating new instance of model
      const user = new User({
        firstName,
        lastName,
        eMail,
        password: hashedPassword,
      });
  
      // saving to db
      await user.save();
      res.send("response is submitted");
    } catch (err) {
      res.send("there is some error\n" + err.message);
    }
  });
  
  // ########### login api #############
  authRouter.post("/login", async (req, res, next) => {
    try {
      const { eMail, password } = req.body;
  
      // checking if email is valid
      const user = await User.findOne({ eMail: eMail });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
  
      // checking if password is correct
      const isPassword = await user.verifyPassword(password);
      if (isPassword) {
        // creating jwt
        const token = await user.getJWT();
          
        // sending cookie to req header
        res.cookie("token1", token);
        res.send("login successful");
      } else {
        throw new Error("invalid credentials");
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  });


  // ############ logout api ###############
 authRouter.post("/logout", async(req,res,next)=>{

  // res.cookie("token1",null,{expires:new Date(Date.now())})

  res.clearCookie("token1")
  res.send("logout successfully")
 })

  export default authRouter;