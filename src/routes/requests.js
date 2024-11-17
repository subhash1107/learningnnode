import express from "express";
import { userAuth } from "../middleware/auth.js"
import ConnectionRequest from "../models/connections.js";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/request/send/:status/:toUserId", userAuth, async (req,res,next)=>{
    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error("status not allowed");
            
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("The person you are tying to send connection request does not exist.");
            
        };
        

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
        })

        if(existingConnectionRequest){
            throw new Error("You can't send connection request as it is already pending.");
            
        };
        

        const connectionRequest = new ConnectionRequest({
            fromUserId,toUserId,status,
        })

        await connectionRequest.save();

        res.json({message:"connection request sent successfully"})

    } catch (err) {
        res.status(400).send("ERROR: "+err.message)
    }
})

export default router;