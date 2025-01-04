import {Request, Response, NextFunction} from "express";
import { loginSchema, registerSchema } from "../middleware/user.validate.middleware";
import { userModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { ValidationError } from "../middleware/err.middleware";

dotenv.config();

interface SearchQuery {
  age: string
}
interface AuthRequest {
  user? : {id: string}
}

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
    const user = await userModel.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
      console.log("User logged in successfully!")
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      })
    }  else {
      res.status(400)
      throw new Error("Invalid credentials!")
    }
  } catch (error: any) {
    next(error)
  }
}

export async function getMe (req: AuthRequest, res: Response, next: NextFunction){
    res.status(200).json(req.user)
}

export async function getUser (req: Request, res: Response, next:NextFunction) {
  try{
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)){
      res.status(400).json({message: "Invalid user ID format"})
      return
    }

    if (!userId) {
      res.status(400).json("Invalid user!");
      return
    } 
    // if (!userId) {
    //   throw new ValidationError("Invalid User")
    // }
    const user = await userModel.findById(userId).select("-password") //minus password, return the user without their password.
    if (!user) {
      res.status(400).json("User not found!")
      return
    }
    res.status(200).json({message: user})
  } catch (error:any) {
    next(error)
  }
  
}

export async function getUsers (req: Request<{}, {}, {}, SearchQuery>, res: Response, next:NextFunction) {
  try {
    const userAge = req.query.age;
    const query: { age?: {$gt: number} } = {};

    if (userAge) {
      const age = parseInt(userAge, 10);
      if(isNaN(age)) {
        res.status(400).json({message: "Invalid age parameter"});
        return
      }
      query.age = { $gt: age }
    }

    const users = await userModel.find({query}).select("-password");
    res.status(200).json({message: users})
  } 
  catch (error:any) {
    res.status(400).json({message: error.details[0].message});
    next(error)
  }
}

const generateToken = (id: string) => {
  const secretKey: string = process.env.JWT_SECRET || "donij-aehd-ncilakejo-dudfo-dfnls-dmaasd-d";
  return jwt.sign({id}, secretKey, { expiresIn: '24h' });
};

