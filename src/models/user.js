import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String
        },
        eMail:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,

        },
        photoUrl:{
            type:String,
            default:"https://tinyurl.com/profile07200",
            validate(value){
                if(value!="https://tinyurl.com/profile07200"){
                    const existingPic = User.findOne(value);
                if(existingPic){
                    throw new Error("User already exist");
                    
                }                }
            }
        },
        age:{
            type:Number,
            min:18,
            max:90,
        },
        gender:{
            type:String,
            validate(value){
                if(!["male","female","others"].includes(value)){
                    throw new Error("Kindly type a valid gender of your choice");
                    
                }
            }
        },
        about:{
            type:String,
            default:"I don't want to tell about myself."
        },
        skills:[String],

    },{
        timestamps:true
    }
)

const User = mongoose.model("User",userSchema)

export {User}