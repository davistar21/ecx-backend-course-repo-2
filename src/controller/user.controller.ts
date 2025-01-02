import {Request, Response, NextFunction} from "express";

export async function registerUser(req: Request, res: Response, next: NextFunction){
  try {
    const {name, email, phoneNumber, password} = req.body;
  }
  catch(error: any){
    next(error)
  }
  
}