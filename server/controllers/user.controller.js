import User from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import { sendEmail } from "../utils/SendEmails.js";
import {
  sendVerificationCodeTemplate,
  welcomeEmailTemplate,
} from "../utils/email/emailTemplates.js";
import { tryCatch } from "../utils/tryCatch.js";
import { generateJWTToken } from "../utils/generateJwtToken.js";
import cloudinary, {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/cloudinary.js";
import fs from "fs/promises";
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists. Please use a different one." });
    }
    const verificationToken = generateVerificationCode();
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
    });
    sendEmail({
      email: user.email,
      subject: "Verify Your Account",
      message: sendVerificationCodeTemplate.replace(
        "[CODE]",
        verificationToken
      ),
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyAccount = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: { $gt: new Date() },
    });
    if (!user) {
      return res.status(404).json({ message: "invalid verification code" });
    }

    user.verificationToken = null;
    user.verificationTokenExpiredAt = null;
    user.isVerified = true;
    await user.save();
    sendEmail({
      email: user.email,
      subject: "Account Verification",
      message: welcomeEmailTemplate.replace("[User's Name]", user.name),
    });
    return res.json({ message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying account" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "Account is not verified" });
    }

    const token = generateJWTToken(res, user._id);

    res.json({ message: "Logged in successfully", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("Authorization", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 0,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to logout" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User profile", user });
  // Simulate long-running operation

  try {
  } catch (error) {
    res.status(500).json({ message: "Failed to Load User " });
  }
};
export const updateUserProfile = async (req, res) => {
  const userId = req.id;
  try {
    const { name } = req.body;
    const profilePhoto = req.file;

    if (!name && !profilePhoto) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    let updatedUser = await User.findById(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) {
      updatedUser.name = name;
    }

    if (profilePhoto) {
      if (updatedUser.photoUrl) {
        const publicId = updatedUser.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      const result = await uploadMediaToCloudinary(profilePhoto);

      if (!result.secure_url) {
        return res
          .status(500)
          .json({ message: "Failed to upload profile photo" });
      }

      updatedUser.photoUrl = result.secure_url;

      try {
        await fs.unlink(profilePhoto.path);
        console.log(`Successfully deleted temp file: ${profilePhoto.path}`);
      } catch (unlinkError) {
        console.error(`Error deleting temp file: ${unlinkError}`);
      }
    }

    await updatedUser.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
