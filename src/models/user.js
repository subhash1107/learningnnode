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
        photoUrl: {
      type: String,
      default: "https://tinyurl.com/profile07200",
      validate: {
        validator: async function(value) {
          
          if (value !== "https://tinyurl.com/profile07200") {
            const existingPic = await User.findOne({ photoUrl: value }); 
            if (existingPic) {
              throw new Error("This photo URL is already taken, please choose another one.");
            }
          }
          return true; 
        },
        message: "Invalid photo URL",
      },
    },
        age:{
            type:Number,
            min:18,
            max:90,
        },
        gender:{
            type:String,
            // validate(value){
            //     if(!["male","female","others"].includes(value)){
            //         throw new Error("Kindly type a valid gender of your choice");
                    
            //     }
            // }
            enum:["male","female","others"]
        },
        about:{
            type:String,
            default:"I don't want to tell about myself."
        },
        skills: {
      type: [String],
      validate: {
        validator: function(value) {
          return value.length <= 10; 
        },
        message: "You can provide a maximum of 10 skills.",
      },
    },
    },{
        timestamps:true
    }
)

const User = mongoose.model("User",userSchema)

export {User}