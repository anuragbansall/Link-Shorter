import mongoose from "mongoose";
import crypto from "crypto";

const LinksVisitorSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Links",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    hashedIpAddress: {
      type: String,
      required: true,
    }, // Combined field for hashed IP address and user agent
    country: {
      type: String,
      required: true,
      default: "Unknown", // Default value if country is not provided
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Pre-save middleware to hash the IP address before saving (ipAddress + userAgent) using crypto
LinksVisitorSchema.pre("validate", async function () {
  if (this.isModified("ipAddress") || this.isModified("userAgent")) {
    const hash = crypto.createHash("sha256");
    hash.update(this.ipAddress + this.userAgent);
    this.hashedIpAddress = hash.digest("hex");
  }
});

// Method to convert ipAddress + userAgent to hashedIpAddress
LinksVisitorSchema.statics.hashIpAddressAndUserAgent = function ({
  ipAddress,
  userAgent,
}) {
  const hash = crypto.createHash("sha256");
  hash.update(ipAddress + userAgent);
  return hash.digest("hex");
};

LinksVisitorSchema.index(
  {
    linkId: 1,
    hashedIpAddress: 1,
  },
  { unique: true },
); // Ensure unique combination of linkId and hashedIpAddress

const LinksVisitor = mongoose.model("LinksVisitor", LinksVisitorSchema);

export default LinksVisitor;
