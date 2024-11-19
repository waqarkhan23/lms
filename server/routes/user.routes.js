import { Router } from "express";
import {
  login,
  signup,
  verifyAccount,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/verify", verifyAccount); // Add this route when implementing email verification feature
userRouter.post("/login", login);

export default userRouter;
