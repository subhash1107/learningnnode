import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:String,
        lastName:String,
        eMail:String,
        age:Number,
        gender:{
            type:String
        }
    }
)

const User = mongoose.model("User",userSchema)

export {User}