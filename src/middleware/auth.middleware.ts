import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { CustomJWTPayload } from "../config/jwt.interface";
import { userModel } from "../models/user.model";

interface AuthRequest extends Request{
    user?:{id:string}
}
export const authenticateToken = async (req:AuthRequest, res:Response, next:NextFunction) => {
    
    try {
        const secretKey = process.env.JWT_SECRET || "donij-aehd-ncilakejo-dudfo-dfnls-dmaasd-d";
        const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
        if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }
        const decodedToken = jwt.verify(token, secretKey) as CustomJWTPayload;

        const authenticatedUser = await userModel.findById(decodedToken.id).select("-password");
        if (!authenticatedUser) {
            res.status(401).json({
                message: "No user found!"
            });
            return
        }
        //   req.user = { id: authenticatedUser.id };


        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
        next(error)
    }
};


/*
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomJWTPayload } from "../config/jwt.interface";
const User = require("../models/user.model");

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get the user's ID
      const decodedToken = jwt.verify(
        token,
        "myJWTSecretForECX"
      ) as CustomJWTPayload;

      const user = await User.findById(decodedToken.id).select("-password");

      if (!user) {
        // If no user is found in the database
        res.status(401).json({
          message: "No user found",
        });
        return;
      }

      req.user = { id: user._id };

      next();
    } catch (error: any) {
      res.status(401).json({
        message: "Not Authorized",
      });
      return;
    }
  } else {
    res.status(401).json({
      message: "Not Authorized, no token!",
    });
    return;
  }
};



import { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  password: string;
}
*/