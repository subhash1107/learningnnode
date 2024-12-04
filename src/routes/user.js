import express from "express";
import { userAuth } from "../middleware/auth.js";
import ConnectionRequest from "../models/connections.js";
import { User } from "../models/user.js";


const userRouter = express.Router();
const SAFE_DATA_OUTPUT = "firstName lastName age about skills gender photoUrl";

userRouter.get("/user/requests", userAuth, async (req,res,next)=>{
    try {
      const loggedInUser = req.user;
      
      const foundRequest = await ConnectionRequest.find({
        toUserId:loggedInUser._id,
        status:"interested"
      }).populate("fromUserId", SAFE_DATA_OUTPUT)

      // if(!foundRequest){
      //   throw new Error("request not exist");
        
      // }



    //  console.log(usersName);    
      return res.send(foundRequest); 
    } catch (err) {
        return res.status(400).send("ERROR: " + err.message)
    }
})

userRouter.get("/user/connections", userAuth, async (req,res,next)=>{
  try {
    const loggedInUser = req.user;
    if(!loggedInUser){
      throw new Error("kindly login to view your connections");  
    }

    const yourConnections = await ConnectionRequest.find({
      $or:[
        {fromUserId:req.user._id},
        {toUserId:req.user._id}
      ],status:"accepted"
    }).populate("fromUserId",SAFE_DATA_OUTPUT)
    .populate("toUserId",SAFE_DATA_OUTPUT);

    const data = await yourConnections.map((reqData)=>{
      if(reqData.fromUserId._id.equals(req.user._id)){
        return reqData.toUserId;
      }
      return reqData.fromUserId;
    })
    if(data.length === 0){
       return res.send("you don't have any connections made")
    }
    
    return res.json({message:data})
  } catch (err) {
    return res.status(400).json({message:"ERROR: "+ err.message})
  }
})

userRouter.get("/user/feed", userAuth, async (req,res,next)=>{

  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50? 50 : limit;
    const skip = (page-1) * limit;
    
    const connectionRequest = await ConnectionRequest.find({
      $or:[{toUserId:loggedInUser._id},{fromUserId:loggedInUser._id}]
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((value)=>{
      hideUserFromFeed.add(value.fromUserId.toString())
      hideUserFromFeed.add(value.toUserId.toString())
    })

    const user = await User.find({
      $and:[
        {_id:{$nin:Array.from(hideUserFromFeed)}},
        {_id:{$ne:loggedInUser._id}}
      ]
    })
    .select(SAFE_DATA_OUTPUT)
    .limit(limit)
    .skip(skip) 
    

    return res.json({message:user})
  } catch (err) {
    return res.status(400).send("ERROR: "+ err.message)
  }
})

export default userRouter;