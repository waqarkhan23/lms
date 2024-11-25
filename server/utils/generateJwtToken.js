import jwt from "jsonwebtoken";

export const generateJWTToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.status(200).cookie("Authorization", token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
  return token;
};
