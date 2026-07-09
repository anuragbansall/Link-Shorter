import Analytics from "../models/Analytics.model.js";
import Link from "../models/Links.model.js";
import { nanoid } from "nanoid";
import LinksVisitor from "../models/LinksVisitor.model.js";

export const createLink = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      slug: userSlug,
      originalUrl,
      title: userTitle,
      password = {},
      isOneTimeUse,
    } = req.body;

    // Check if the slug is already taken
    const existingLink = await Link.findOne({ slug: userSlug });

    if (existingLink) {
      return res.status(400).json({ message: "Slug is already taken" });
    }

    // if userSlug is less than 6 characters, return an error
    if (userSlug && userSlug.length < 6) {
      return res
        .status(400)
        .json({ message: "Slug must be at least 6 characters long" });
    }

    // if the slug is not provided, generate a random one
    const slug = userSlug || nanoid(6);

    // if the title is not provided, use the originalUrl as the title
    const title = userTitle || originalUrl;

    const newLink = new Link({
      slug,
      originalUrl,
      title,
      password: {
        isPasswordProtected:
          password.isPasswordProtected && password.value ? true : false,
        value: password.value || null,
      },
      isOneTimeUse,
      userId,
      shortLink: `${req.protocol}://${req.get("host")}/${slug}`,
    });

    await newLink.save();

    // Create a new analytics document for the link
    const analytics = new Analytics({
      linkId: newLink._id,
      totalClicks: 0,
      totalUniqueClicks: 0,
    });
    await analytics.save();

    res.status(201).json({
      message: "Link created successfully",
      data: newLink,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllLinks = async (req, res) => {
  try {
    const userId = req.user.id;
    const links = await Link.find({ userId });

    res
      .status(200)
      .json({ message: "Links fetched successfully", data: links });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLinkById = async (req, res) => {
  try {
    const userId = req.user.id;
    const linkId = req.params.id;

    const link = await Link.findOne({ _id: linkId, userId });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link fetched successfully", data: link });
  } catch (error) {
    console.error("Error fetching link by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLinkById = async (req, res) => {
  try {
    const userId = req.user.id;
    const linkId = req.params.id;

    const deletedLink = await Link.findOneAndDelete({ _id: linkId, userId });

    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLinkById = async (req, res) => {
  try {
    const userId = req.user.id;
    const linkId = req.params.id;
    const { slug, title, password, isOneTimeUse } = req.body;

    // Check if the slug is already taken by another link
    if (slug) {
      const existingLink = await Link.findOne({
        slug,
        userId,
        _id: { $ne: linkId },
      });
      if (existingLink) {
        return res.status(400).json({ message: "Slug is already taken" });
      }
    }

    const updatedLink = await Link.findOneAndUpdate(
      { _id: linkId, userId },
      {
        slug,
        title,
        password: {
          isPasswordProtected:
            password.isPasswordProtected && password.value ? true : false,
          value: password.value || null,
        },
        isOneTimeUse,
      },
      { new: true },
    );

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({
      message: "Link updated successfully",
      data: updatedLink,
      shortUrl: `${req.protocol}://${req.get("host")}/${updatedLink.slug}`,
    });
  } catch (error) {
    console.error("Error updating link by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
