import mongoose from "mongoose";
import Analytics from "../models/Analytics.model.js";
import Links from "../models/Links.model.js";
import LinksVisitor from "../models/LinksVisitor.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const [totalLinks, analyticsResult, countries] = await Promise.all([
      // Total links
      Links.countDocuments({ userId }),

      // Total clicks & unique clicks
      Analytics.aggregate([
        {
          $lookup: {
            from: "links",
            localField: "linkId",
            foreignField: "_id",
            as: "link",
          },
        },
        {
          $unwind: "$link",
        },
        {
          $match: {
            "link.userId": userId,
          },
        },
        {
          $group: {
            _id: null,
            totalClicks: {
              $sum: "$totalClicks",
            },
            totalUniqueClicks: {
              $sum: "$totalUniqueClicks",
            },
          },
        },
      ]),

      // Country-wise visitors
      LinksVisitor.aggregate([
        {
          $lookup: {
            from: "links",
            localField: "linkId",
            foreignField: "_id",
            as: "link",
          },
        },
        {
          $unwind: "$link",
        },
        {
          $match: {
            "link.userId": userId,
          },
        },
        {
          $group: {
            _id: "$country",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            country: "$_id",
            visitors: 1,
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
      ]),
    ]);

    const analytics = analyticsResult[0] || {
      totalClicks: 0,
      totalUniqueClicks: 0,
    };

    return res.status(200).json({
      message: "Analytics fetched successfully",
      data: {
        totalLinks,
        totalClicks: analytics.totalClicks,
        totalUniqueClicks: analytics.totalUniqueClicks,
        totalCountries: countries.length,
        countries,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Analytics for a single link
 */
export const getLinkAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { linkId } = req.params;

    // Verify ownership
    const link = await Links.findOne({
      _id: linkId,
      userId,
    }).lean();

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const [analytics, visitorData] = await Promise.all([
      Analytics.findOne({
        linkId,
      }).lean(),

      LinksVisitor.aggregate([
        {
          $match: {
            linkId: new mongoose.Types.ObjectId(linkId),
          },
        },
        {
          $group: {
            _id: "$country",
            visitors: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            country: "$_id",
            visitors: 1,
          },
        },
        {
          $sort: {
            visitors: -1,
          },
        },
      ]),
    ]);

    return res.status(200).json({
      message: "Analytics fetched successfully",
      data: {
        ...(analytics || {
          totalClicks: 0,
          totalUniqueClicks: 0,
        }),
        visitorData,
      },
    });
  } catch (error) {
    console.error("Error fetching link analytics:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
