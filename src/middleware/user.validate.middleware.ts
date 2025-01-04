import joi from "joi";
import { Request, Response, NextFunction } from "express";

export const registerSchema = joi.object({
  name: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().min(5).max(20),
  age: joi.number().min(11),
  password: joi.string().min(8).max(49).required()
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(49).required()
})

export const validateParams = (schema: joi.ObjectSchema) => {
   return (req: Request, res: Response, next: NextFunction)  => {
    const {error} = schema.validate(req.params);
    if (error) {
      return res.status(400).json({message: error.details[0].message})
    }
    next()
   }
}

export const userParamsSchema = joi.object({
  userId: joi.string().required()
})

let g = {
  "name": "Calhanogolu",
  "email": "C",
  "phoneNumber": 123456,
  "age": 23,
  "password": "12341040sakmsds"
}