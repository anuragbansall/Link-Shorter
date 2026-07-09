import mongoose from "mongoose";
import Analytics from "../models/Analytics.model.js";
import Links from "../models/Links.model.js";
import LinksVisitor from "../models/LinksVisitor.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch only the user's link ids
    const links = await Links.find({ userId }).select("_id").lean();

    const linkIds = links.map((link) => link._id);

    if (!linkIds.length) {
      return res.status(200).json({
        message: "Analytics fetched successfully",
        data: {
          totalLinks: 0,
          totalClicks: 0,
          totalUniqueClicks: 0,
          totalCountries: 0,
          countries: [],
        },
      });
    }

    const [[analytics = {}], countries] = await Promise.all([
      Analytics.aggregate([
        {
          $match: {
            linkId: { $in: linkIds },
          },
        },
        {
          $group: {
            _id: null,
            totalClicks: { $sum: "$totalClicks" },
            totalUniqueClicks: { $sum: "$totalUniqueClicks" },
          },
        },
      ]),

      LinksVisitor.aggregate([
        {
          $match: {
            linkId: { $in: linkIds },
          },
        },
        {
          $group: {
            _id: "$country",
            visitors: { $sum: 1 },
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
        totalLinks: links.length,
        totalClicks: analytics.totalClicks ?? 0,
        totalUniqueClicks: analytics.totalUniqueClicks ?? 0,
        totalCountries: countries.length,
        countries,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * Single link analytics
 */
export const getLinkAnalytics = async (req, res) => {
  try {
    const { linkId } = req.params;
    const userId = req.user.id;

    const link = await Links.findOne({
      _id: linkId,
      userId,
    })
      .populate("analytics")
      .lean();

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const visitorData = await LinksVisitor.aggregate([
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
    ]);

    return res.status(200).json({
      message: "Analytics fetched successfully",
      data: {
        totalClicks: link.analytics?.totalClicks ?? 0,
        totalUniqueClicks: link.analytics?.totalUniqueClicks ?? 0,
        visitorData,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
