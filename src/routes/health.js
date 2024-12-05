import express from "express";

const healthRouter = express.Router()

healthRouter.get("/health", (req,res)=>{
    res.send("your api health is good")
})

export default healthRouter;