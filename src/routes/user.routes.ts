import express from "express";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})

export default userRouter;

// 
// 