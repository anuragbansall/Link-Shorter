import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createLink,
  deleteLinkById,
  getAllLinks,
  getLinkById,
  updateLinkById,
} from "../controllers/Links.controller.js";

const linksRouter = express.Router();

// Create a new link
linksRouter.post("/", authMiddleware, createLink);

// Get all links (of the authenticated user)
linksRouter.get("/", authMiddleware, getAllLinks);

// Get a specific link by ID (of the authenticated user)
linksRouter.get("/:id", authMiddleware, getLinkById);

// Delete a specific link by ID (of the authenticated user)
linksRouter.delete("/:id", authMiddleware, deleteLinkById);

// Update a specific link by ID (of the authenticated user)
linksRouter.put("/:id", authMiddleware, updateLinkById);

export default linksRouter;
