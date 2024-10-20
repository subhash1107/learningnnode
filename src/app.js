import e from "express";
// import { adminAuth, userAuth } from "./middleware/auth.js";
import { connectDb } from "./config/database.js";
import { User } from "./models/user.js";


const app = e()
const port = 7777;

app.post("/signup", async(req,res,next)=>{
    const user = new User({
        firstName:"Virat",
        lastName:"Kohli",
        eMail:"virat.kohli@gmail.com",
        age:25
    })

    await user.save();
    res.send("response is submitted")
    
})
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






connectDb().then(()=>{
    console.log("database connection established successfully");
    app.listen(port,()=>{
        console.log("this app is running on port ",port);
        
    })
}).catch((err)=>{
    console.log("we encountered an error" + err.message)
})