import joi from "joi"

export const registerSchema = joi.object({
  name: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().min(5).max(20),
  password: joi.string().min(8).max(49).required()
})

let g = {
  "name": "Calhanogolu",
  "email": "C",
  "phoneNumber": 123456,
  "password": "12341040sakmsds"
}