import express from "express";


const userRouter = express.Router();


userRouter.get('/', (req, res)=>{
  res.send("Hello World!");
  console.log("User Router is working!")
})

export default userRouter;

// mongodb+srv://eyitayobembe:<db_password>@usersdatabase.lrupb.mongodb.net/?retryWrites=true&w=majority&appName=usersDatabase
// k5SA6DJihSe6UheG