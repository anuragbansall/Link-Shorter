import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  deleteUserAccount,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/User.controller.js";

const userRouter = express.Router();

// Register a new user
userRouter.post("/register", registerUser);

// Login a user
userRouter.post("/login", loginUser);

// Logout a user
userRouter.post("/logout", authMiddleware, logoutUser);

// Get user profile
userRouter.get("/profile", authMiddleware, getUserProfile);

// Update user profile
userRouter.put("/profile", authMiddleware, updateUserProfile);

// Delete user account
userRouter.delete("/profile", authMiddleware, deleteUserAccount);

export default userRouter;
