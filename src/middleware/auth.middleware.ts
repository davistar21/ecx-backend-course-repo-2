import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";


const authenticateToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "donij-aehd-ncilakejo-dudfo-dfnls-dmaasd-d";
        const verified = jwt.verify(token, secretKey);
        req.body.user = verified;
        next(); 
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};
