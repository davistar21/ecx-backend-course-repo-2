import express from "express";
import { registerUser } from "../controller/user.controller";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})
userRouter.post('/register', registerUser)

export default userRouter;

// 
// 