import e from "express";

const app = e()
const port = 7777;

app.use('/hello',(req,res)=>{
    res.send('hello')
})
app.use('/test',(req,res)=>{
    res.send('test')
})

app.listen(port,()=>{
    console.log('this app is running on port',port);
    
})