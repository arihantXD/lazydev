import { Router } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@repo/db";
import { loginSchema, signUpSchema } from "@repo/schema";
import { saltRounds } from "../config/saltRounds";
import { jwtSecret } from "../config/jwtSecret";
import { AuthRequest } from "../config/authRequest";

export const userRouter = Router();

userRouter.get("/me", (req: AuthRequest, res) => {
  try {
    if (req.cookies.token) {
      const token = jwt.verify(req.cookies.token, jwtSecret) as JwtPayload;
      res.status(200).json({ message: "User found", data: token });
      return;
    }
    res.status(404).json({ message: "Token not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error fetching user" });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const parse = signUpSchema.safeParse(req.body);
    if (parse.success) {
      const { confirmPassword, ...data } = parse.data;
      data.password = bcrypt.hashSync(parse.data.password, saltRounds);
      const user = await prisma.user.count({
        where: {
          email: parse.data.email,
        },
      });
      if (user) {
        res
          .status(400)
          .json({ message: "User with same email already exists" });
        return;
      }
      await prisma.user.create({
        data,
      });
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while registering user" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (parse && parse.success) {
      const user = await prisma.user.findFirst({
        where: {
          email: parse.data.email,
        },
      });

      if (
        !user ||
        (user && !bcrypt.compareSync(parse.data.password, user.password))
      ) {
        res
          .status(404)
          .json({ message: "User not found, invalid credentials" });
        return;
      } else if (
        user &&
        bcrypt.compareSync(parse.data.password, user.password)
      ) {
        const data = {
          id: user.id,
          email: user.email,
        };
        const token = jwt.sign(data, jwtSecret);
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
          secure: true,
          sameSite: false,
        });
        res
          .status(201)
          .json({ message: "User logged in successfully", data: data });
      }
    } else {
      res.status(400).json({ message: "Your data is invalid, try again" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error while logging in user" });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "User successfully logged out" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error in logout section" });
  }
});

userRouter.get("/id/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const parsedUserId = parseInt(userId);
    if (!parsedUserId) {
      res.status(400).json({ message: "Your data is invalid, try again" });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        id: parsedUserId,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        occupation: true,
        place: true,
        aboutMe: true,
        education: true,
        skill: true,
        workExperience: {
          include: {
            tasks: true,
          },
        },
        stats: true,
        link: true,
      },
    });
    if (!user) {
      res.clearCookie("token");
      res.status(404).json({ message: "User not found, login again" });
      return;
    }
    res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error in fetching user" });
  }
});
