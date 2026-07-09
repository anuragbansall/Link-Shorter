import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

export const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });
};

export const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
