import mongoose from "mongoose";

export const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://subhash1107:Subhash1108%23@cluster0.bpz8t.mongodb.net/devTinder")
}

