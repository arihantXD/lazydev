import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface Token extends JwtPayload {
  id?: number;
  name?: string;
  iat?: number;
}

export interface AuthRequest extends Request {
  token?: Token;
}
