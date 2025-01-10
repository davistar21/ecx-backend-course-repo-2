import express, { RequestHandler } from "express";
import { getMe, getUser, getUsers, loginUser, registerUser } from "../controller/user.controller";
import { userParamsSchema, validateParams } from "../middleware/user.validate.middleware";
import { authenticateToken } from "../middleware/auth.middleware";
import { tokenToString } from "typescript";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', authenticateToken, getMe)
userRouter.get('/users', getUsers)
userRouter.get('/:userId' , validateParams(userParamsSchema) as RequestHandler, getUser)
export default userRouter;

// 
// 