import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email!"]
  },
  phoneNumber: {
    type: Number 
  },
  password: {
    type: String,
    required: [true, "Please provide a password."]
  }
});
export const userModel = mongoose.model("User", userSchema)
