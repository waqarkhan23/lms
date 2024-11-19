import User from "../models/user.model.js";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import { sendEmail } from "../utils/SendEmails.js";
import {
  sendVerificationCodeTemplate,
  welcomeEmailTemplate,
} from "../utils/email/emailTemplates.js";
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
  try {
    if (!code) {
      return res.status(400).json({ message: "Verification code is required" });
    }
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiredAt: { $gt: Date.now() },
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

    const token = user.generateJwtToken();
    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });
    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
