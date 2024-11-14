import validator from "validator";
import { User } from "../models/user.js";

const validateSignUpData = async (req) => {
  const {
    firstName,
    lastName,
    eMail,
    password,
    about,
    skills,
    age,
    photoUrl,
    gender,
  } = req.body;
//   const checkMail = await User.findOne({eMail:eMail})
//   console.log(checkMail);
//   if(checkMail){
//     throw new Error("new error");
    
//   }

  if (!validator.isEmail(eMail)) {
    throw new Error("enter a valid email Id.");
  } else if (!validator.isURL(photoUrl,{require_protocol:true})) {
    throw new Error("your url is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("your password should contain atleast one capital letter, one small letter, one symbol and one numeric character.");
  } else if (skills.length > 10) {
    throw new Error("kindly enter your best 10 skills");
  } else if (about.length > 500) {
    throw new Error("kindly brief yourself within 500 characters");
  } else if (firstName.length>30 || lastName.length > 30) {
    throw new Error("the name should be within 30 characters");
  } else if (age < 18 || age > 90) {
    throw new Error("you are not eligible according to your age");
  } else if (!["male", "female", "others"].includes(gender)) {
    throw new Error("please enter a valid gender for yourself");
  }
};


export default validateSignUpData;
