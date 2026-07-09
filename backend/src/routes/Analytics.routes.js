import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getAnalytics,
  getLinkAnalytics,
} from "../controllers/Analytics.controller.js";

const analyticsRouter = express.Router();

// Get overall analytics data for the user
analyticsRouter.get("/", authMiddleware, getAnalytics);

// Get analytics data for a specific Link by its ID
analyticsRouter.get("/:linkId", authMiddleware, getLinkAnalytics);

export default analyticsRouter;
