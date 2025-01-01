import express from "express"

const PORT = 5182

const app = express();

app.use(express.json());


app.listen(PORT, ()=>{
  console.log(`Server is listening on ${PORT}`)
})