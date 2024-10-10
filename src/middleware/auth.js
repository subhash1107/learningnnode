const adminAuth = (req,res,next)=>{
    const token = "xyz";
    if(token === "xyz"){
        next();
    }else{
        res.status(404).send("error 404 not found")
    }
}
const userAuth = (req,res,next)=>{
    const token = "abc";
    if(token === "xyz"){
        next();
    }else{
        res.status(404).send("error 404 not found")
    }
}

export {
adminAuth,userAuth
}