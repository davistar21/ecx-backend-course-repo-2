import express from "express";
import { loginUser, registerUser } from "../controller/user.controller";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
export default userRouter;

// 
// 