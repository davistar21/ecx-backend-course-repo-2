import {Request, Response, NextFunction} from "express";
import { loginSchema, registerSchema } from "../middleware/user.validate.middleware";
import { userModel } from "../models/user.model";
import bcrypt from "bcryptjs"

export async function registerUser(req: Request, res: Response, next: NextFunction){
  const {error} = registerSchema.validate(req.body)
  if (error){
    res.status(400).json({
      message: error.details[0].message
    })
    return
  }
  try {
    const {name, email, phoneNumber, password} = req.body;

    const userExists = await userModel.findOne({email});
    if (userExists){
      throw new Error("Email already exists. Please login!")
    };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword
    })
    if (newUser) {
      console.log("User registered successfully!")
      res.status(200).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      })
    } else {
      res.status(400);
      throw new Error("Invalid user data!")
    }
  }
  catch(error: any){
    next(error)
  }
  
}

export async function loginUser(req: Request, res: Response, next: NextFunction){
  const {error} = loginSchema.validate(req.body)
  if(error) {
    res.status(401).json({
      message: error.details[0].message
    });
    return
  }
  try {
    const {email, password} = req.body;
    const userExists = await userModel.findOne({email});
    if (userExists && (await bcrypt.compare(password, userExists.password))){
      console.log("User logged in successfully!")
      res.status(200).json({
        _id: userExists.id,
        name: userExists.name,
        email: userExists.email
      })
    }  else {
      res.status(400)
      throw new Error("Invalid credentials!")
    }
  } catch (error: any) {
    next(error)
  }
}