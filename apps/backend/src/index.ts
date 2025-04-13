import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRouter } from "./routers/userRouter";
import { portfolioRouter } from "./routers/portfolioRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import cors from "cors";

dotenv.config({ path: "../../.env" });
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/portfolio", authMiddleware, portfolioRouter);

app.listen(process.env.BACKEND_PORT, () => {
  console.log("Listening at port 5000");
});
