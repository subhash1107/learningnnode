import configEnv from "./utils/config.js";
import { connectDb } from "./config/database.js";
import { User } from "./models/user.js";
import express from "express";
import cookieParser from "cookie-parser";
import { userAuth } from "./middleware/auth.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import connectionRouter from "./routes/requests.js";
import userRouter from "./routes/user.js";
import cors from "cors"

const app = express();
const port = configEnv.PORT || 3000;

app.use(cors({
  origin:"https://dev-tinder-f.vercel.app",
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);
app.use("/",userRouter);


connectDb()
  .then(() => {
    console.log("database connection established successfully");
    app.listen(port, () => {
      console.log("this app is running on port ", port);
    });
  })
  .catch((err) => {
    console.log("we encountered an error" + err.message);
  });
