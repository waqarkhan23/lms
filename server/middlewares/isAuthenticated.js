import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.Authorization || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
