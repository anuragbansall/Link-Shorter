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

AnalyticsSchema.index({ linkId: 1 });

AnalyticsSchema.virtual("link", {
  ref: "Links",
  localField: "linkId",
  foreignField: "_id",
  justOne: true, // one link document per analytics
}); // Virtual field to populate the associated link

AnalyticsSchema.set("toJSON", { virtuals: true });
AnalyticsSchema.set("toObject", { virtuals: true });

const Analytics = mongoose.model("Analytics", AnalyticsSchema);

export default Analytics;
