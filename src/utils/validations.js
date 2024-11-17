import validator from "validator";

const validateSignUpData = async (req,res) => {
  const {
    firstName,
    lastName,
    eMail,
    password,
  } = req.body;
//   const checkMail = await User.findOne({eMail:eMail})
//   console.log(checkMail);
//   if(checkMail){
//     throw new Error("new error");
    
//   }
try{ 
  if (!validator.isEmail(eMail)) {
    throw new Error("enter a valid email Id.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("your password should contain atleast one Upper case, one lowercase, one symbol and one numeric character.");
  } else if (firstName.length>30 || lastName.length > 30) {
        throw new Error("the name should be within 30 characters");
  }}catch(err){
    res.send("ERROR: "+ err.message)
  }
};
const validateEditProfileData = async (req,res)=>{
  try{
  const allowedUpdate = ["firstName", "skills", "gender", "age", "about","photoUrl","lastName"];
  const isUpdateAllowed = Object.keys(req.body).every((field)=>allowedUpdate.includes(field));
  if(!isUpdateAllowed){
    throw new Error("Update not allowed.");
    
  }
  const {firstName, skills, gender, age, about,photoUrl,lastName} = req.body;
  if (firstName.length>30 || lastName.length > 30) {
        throw new Error("the name should be within 30 characters");
      } else if (skills.length > 10) {
        throw new Error("kindly enter your best 10 skills");
      } else if (about.length > 500) {
        throw new Error("kindly brief yourself within 500 characters");
      } else if (age < 18 || age > 90) {
        throw new Error("you are not eligible according to your age");
      } else if (!["male", "female", "others"].includes(gender)) {
        throw new Error("please enter a valid gender for yourself");
      } else if (req.user.gender){
        throw new Error("can't change gender once saved");
      } else if (!validator.isURL(photoUrl,{require_protocol:true})) {
        throw new Error("your url is not valid");
      } }catch(err){
        res.send("ERROR: "+err.message);
        
      }
}
const validatePasswordData = (req,res)=>{
  try{
  const allowedUpdate = ["currentPassword","newPassword"];
  const isUpdateAllowed = Object.keys(req.body).every((field)=>allowedUpdate.includes(field))

  const {currentPassword,newPassword} = req.body;

  if(!isUpdateAllowed){
    throw new Error("enter valid credentials");
  } else if (!validator.isStrongPassword(currentPassword)||!validator.isStrongPassword(newPassword)) {
    throw new Error("your password should contain atleast one Upper case, one lowercase, one symbol and one numeric character.");
  }}catch(err){
    res.send("ERROR: "+ err.message);
    
  }
}


export {
  validateSignUpData,
  validateEditProfileData,
  validatePasswordData,
};
