import express from "express"
import userRouter from "./routes/user.routes";
import { connectDB } from "./config/connectdb";
import requestLogger from "./middleware/requestLogger.middleware";
import { errorHandler } from "./config/errorHandler";
import { getUsers } from "./controller/user.controller";

const PORT = 5182

const app = express();

connectDB()

app.use(express.json());

//catch any errors before calling the API
app.use(requestLogger);

app.use('/user', userRouter);

app.use(errorHandler)

// app.get('/users', (req, res)=>{
//   res.send("users will be with you shortly")
//   console.log("users fetched successfully!")
// })

app.listen(PORT, ()=>{
  console.log(`Server started on ${PORT}`)
})