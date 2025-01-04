import express, { RequestHandler } from "express";
import { getUser, getUsers, loginUser, registerUser } from "../controller/user.controller";
import { userParamsSchema, validateParams } from "../middleware/user.validate.middleware";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/:userId' /*, validateParams(userParamsSchema) as RequestHandler*/, getUser)
userRouter.get('/users', getUsers)
export default userRouter;

// 
// 