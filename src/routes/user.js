import express from "express";
import { userAuth } from "../middleware/auth.js";
import ConnectionRequest from "../models/connections.js";


const userRouter = express.Router();

userRouter.get("/user/requests", userAuth, async (req,res,next)=>{
    try {
      const loggedInUser = req.user;
      
      const foundRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
      }).populate("fromUserId","firstName lastName age about skills gender photoUrl")

      if(!foundRequest){
        throw new Error("request not exist");
        
      }

      const usersName = foundRequest.map((requests)=>{
        const {firstName,lastName} = requests.fromUserId;
        return `${firstName} ${lastName}`
      }) 

    //  console.log(usersName);    
      res.send(usersName.join(", ")+" sent you request"); 
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

export default userRouter;