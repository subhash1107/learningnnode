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
const port = 7777;

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
  // const found = await User.find({eMail:"sbhash.y02@gmail.com"})
  // const found = await User.findOne({eMail:"rohit.kohli@gmail.com"})
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

//########## signup api ##########
// app.post("/signup", async (req, res, next) => {
//   const {
//     firstName,
//     lastName,
//     eMail,
//     password,
//     about,
//     skills,
//     age,
//     photoUrl,
//     gender,
//   } = req.body;
//   const checkMail = await User.findOne({ eMail: req.body.eMail });

//   try {
//     // checking uniqueness of email
//     if (checkMail) {
//       throw new Error("user already exist");
//     }

//     // bcrypting password hash
//     const { password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);

//     // validating data
//     validateSignUpData(req);

//     // creating new instance of model
//     const user = new User({
//       firstName,
//       lastName,
//       eMail,
//       password: hashedPassword,
//       about,
//       skills,
//       age,
//       photoUrl,
//       gender,
//     });

//     // saving to db
//     await user.save();
//     res.send("response is submitted");
//   } catch (err) {
//     res.send("there is some error\n" + err.message);
//   }
//   // res.send("response submitted")
//   // console.log(req.body);
// });

// // ########### login api #############
// app.post("/login", async (req, res, next) => {
//   try {
//     const { eMail, password } = req.body;

//     // checking if email is valid
//     const user = await User.findOne({ eMail: eMail });
//     if (!user) {
//       throw new Error("Invalid Credentials");
//     }

//     // checking if password is correct
//     const isPassword = await user.verifyPassword(password);
//     if (isPassword) {
//       // creating jwt
//       const token = await user.getJWT();
//       console.log(token);

//       // sending cookie to req header
//       res.cookie("token1", token);
//       res.send("login successful");
//     } else {
//       throw new Error("invalid credentials");
//     }
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

// ############ profile api ###########
// app.get("/profile", userAuth, async (req, res, next) => {
//   // verifying jwt
//   try {
//     res.send(req.user);
//   } catch (err) {
//     res.send("ERROR : " + err.message);
//   }
// });

// ############ connection request api #############
app.post("/connectionrequest", userAuth, async (req, res) => {
  try {
    const user_Name = req.user.firstName;
    res.send(user_Name + " has sent new connection request");
  } catch (err) {
    res.status(400).send("ERROR: ", err.message);
  }
});

// ################### deleting user details ###################
app.delete("/deleteuser", async (req, res, next) => {
  const UserId = req.body.UserId;
  try {
    const user = await User.findByIdAndDelete(UserId);
    if (!user) {
      res.send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch {
    res.send("we've encountered an error while doing operation");
  }
});

// ################### Updating data using patch #################
app.patch("/updatedata/:UserId", async (req, res, next) => {
  const UserId = req.params?.UserId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(UserId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user)

    if (!user) {
      return res.status(404).send("User not found");
    }
    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "age",
      "about",
      "photoUrl",
      "skills",
      "password",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("the field you want to update is not allwed");
    }

    res.send("User updated successfully");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("There is some error in updating data\n" + err.message);
  }
});

// ############   #######################
app.patch("/updatebyemail", async (req, res, next) => {
  const Email = req.body.eMail;
  const data = req.body;
  try {
    const user = await User.findOneAndUpdate({ eMail: Email }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    // console.log(user)

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("There is some error in updating data\n" + err.message);
  }
});
// #################### Finding all data #####################
// app.get("/users", async (req, res, next)=>{
//     const uSers = await User.find()
//     try{
//         console.log(uSers);
//         res.send("user found successfully")
//     }catch{
//         res.send("user not found")
//     }

// })

// const {adminAuth,userAuth} = require("./middleware/auth")

// app.use('/hello',(req,res)=>{
//     res.send('hello')
// })
// app.use('/test',(req,res)=>{
//     res.send('test')
// })

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send({"name":"subhash","post":"senior software developer"})
// })
// app.get("/user/:userID/:name",(req,res)=>{
//     console.log(req.params)
//     res.send({"name":"subhash","post":"senior software developer"})
// })

//########### handling route ############

// app.use("/user",(req,res,next)=>{
//     console.log("handling the case 1");
//     next();

// },
// (req,res,next)=>{
//     console.log("handling the case 2");
//     next();

// },
// (req,res,next)=>{
//     console.log("handling the case 3");
//     next();
//     res.send("hii this is case 3 ")

// },
// (req,res,next)=>{
//     console.log("handling the case 4");
//     res.send("hii this is case 4")
//     // next(); in this case putting next here is not necessary

// }
// );
// ################### end ########################

// ################ middlewares and need for it #####################

//1. this is the hard way to write middleware

// app.get("/admin",(req,res,next)=>{
//     const token = "xy";
//     if(token === "xyz"){
//         next();
//     }else{
//         res.status(404).send("error 404 not found")
//     }
// },
// (req,res,next)=>{
//     res.send("admin authorized")
// })

// 2. this is the effective way to use middleware

// app.use("/admin",adminAuth)

// app.get("/admin",(req,res,next)=>{
//     res.send("successfully authenticated")
// })
// app.get("/user",userAuth,(req,res,next)=>{
//     res.send("successfully authenticated")
// })
// app.get("/user/login",(req,res,next)=>{
//     console.log("login");

//     res.send("proceed to login")
// })

// ########### error handlers#########

// 1. the best way to handle error is to use try catch method

// app.get("/user",adminAuth,(req,res,next)=>{
//     // throw new error("parameter is not defined")
//     try{
//        res.send("hii this is me")
//     }
//     catch(err){
//         res.send("this is error message" + err.message)
//     }
// })
// app.get("/admin",(req,res,next)=>{
//     throw new error("wrong input")
// })

// // 2. this is the way that should we memorise while writing node code
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.send(err.message)
//     }
// })

// ########################################/

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
