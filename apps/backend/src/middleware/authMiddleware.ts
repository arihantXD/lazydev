import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecret } from "../config/jwtSecret";
import { AuthRequest } from "../config/authRequest";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies.token) {
      const token = jwt.verify(req.cookies.token, jwtSecret) as JwtPayload;
      req.token = token;
      next();
      return;
    }
    res.status(404).json({ message: "Token not found" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while verifying token" });
  }
};
