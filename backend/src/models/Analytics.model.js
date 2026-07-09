import mongoose from "mongoose";

// Analytics Schema
const AnalyticsSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Links",
      required: true,
      unique: true,
      index: true,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    totalUniqueClicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;
