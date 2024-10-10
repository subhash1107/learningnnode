import e from "express";

const app = e()
const port = 7777;

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



app.listen(port,()=>{
    console.log('this app is running on port',port);
    
})