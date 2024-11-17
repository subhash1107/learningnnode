import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 18,
    },
    lastName: {
      type: String,
    },
    eMail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://tinyurl.com/profile07200",
      // validate: [
      //   {
      //     validator: async function (value) {
      //       if (value !== "https://tinyurl.com/profile07200") {
      //         const existingPic = await User.findOne({ photoUrl: value });
      //         if (existingPic) {
      //           throw new Error(
      //             "This photo URL is already taken, please choose another one."
      //           );
      //         }
      //       }
      //       return true;
      //     },
      //     message: "Invalid photo URL",
      //   },
      // ],
    },
    age: {
      type: Number,
      min: 18,
      max: 90,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "others"],
    },
    about: {
      type: String,
      default: "I don't want to tell about myself.",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = this.password;
  const isValidated = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isValidated;
};
userSchema.methods.getJWT = async function () {
  const user = this;
  const createJWT = jwt.sign({ userId: user._id }, "Subhash#00$12@", {
    expiresIn: "7d",
  });
  return createJWT;
};

const User = mongoose.model("User", userSchema);

export { User };
