import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  signup,
  updateUserProfile,
  verifyAccount,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/verify", verifyAccount);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile", isAuthenticated, getUserProfile);
userRouter.post(
  "/profile/update",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateUserProfile
);
export default userRouter;
