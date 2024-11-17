import mongoose from "mongoose";



const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            enum:{
                values:["interested","ignored","accepted","rejected"],
                message:"{VALUE} is incorrect status type."
            },
            required:true,
        }
    },        
    {
        timestamps:true,
    }
);

connectionRequestSchema.pre("save",function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("You can't send request to yourself.");
        
    }
    next();
});

connectionRequestSchema.index({fromUserId:1,toUserId:1})


const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);
export default ConnectionRequest;