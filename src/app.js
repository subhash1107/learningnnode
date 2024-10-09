import e from "express";

const app = e()
const port = 7777;

// app.use('/hello',(req,res)=>{
//     res.send('hello')
// })
// app.use('/test',(req,res)=>{
//     res.send('test')
// })

app.get("/user/:userID/:name",(req,res)=>{
    console.log(req.params)
    res.send({"name":"subhash","post":"senior software developer"})
})

app.listen(port,()=>{
    console.log('this app is running on port',port);
    
})