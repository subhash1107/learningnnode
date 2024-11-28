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
  origin:"http://localhost:5173",
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);
app.use("/",userRouter);

app.get("/get", async (req, res, next) => {

  const found = await User.findOne({});
  if (found.length != 0) {
    try {
      console.log(found);
      res.send("user found");
    } catch {
      res.send("user not found");
    }
  } else {
    res.send("ther is some error finding in User");
  }
});
app.get("/feed", async (req, res, next) => {
  const found = await User.find({});
  if (found.length != 0) {
    try {
      console.log(found);
      res.send("user found");
    } catch {
      res.send("user not found");
    }
  } else {
    res.send("ther is some error finding in User");
  }
});

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
