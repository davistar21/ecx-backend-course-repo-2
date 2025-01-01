import express from "express"
import userRouter from "./routes/user.routes";

const PORT = 5182

const app = express();

app.use(express.json());
app.use('/', userRouter)

// app.get('/users', (req, res)=>{
//   res.send("users will be with you shortly")
//   console.log("users fetched successfully!")
// })

app.listen(PORT, ()=>{
  console.log(`Server started on ${PORT}`)
})