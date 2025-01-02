import mongoose from "mongoose";

export async function connectDB(){
  try {
    await mongoose.connect('mongodb+srv://eyitayobembe:k5SA6DJihSe6UheG@usersdatabase.lrupb.mongodb.net/?retryWrites=true&w=majority&appName=usersDatabase').then(()=>{
      console.log("Connected database successfully!")
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}