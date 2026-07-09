import express from "express";
import userRouter from "./routes/User.routes.js";
import cookieParser from "cookie-parser";
import linksRouter from "./routes/Links.routes.js";
import Link from "./models/Links.model.js";
import LinksVisitor from "./models/LinksVisitor.model.js";
import Analytics from "./models/Analytics.model.js";
import cors from "cors";
import analyticsRouter from "./routes/Analytics.routes.js";
import config from "./config/config.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/api", (req, res) => {
  res.send({
    message: "Welcome to the API",
  });
});

// MOST IMPORTANT ROUTE: This will redirect the user to the original URL based on the slug provided in the request
app.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const link = await Link.findOne({ slug });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    // Password check
    if (link.password.isPasswordProtected) {
      const password = req.query.password;

      if (!password) {
        return res.status(400).json({
          message: "Password is required",
        });
      }

      const valid = await link.comparePassword(password);

      if (!valid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
    }

    // One-time link
    if (link.isOneTimeUse && link.isUsed) {
      return res.status(403).json({
        message: "This link has already been used",
      });
    }

    const ip = req.ip;
    const userAgent = req.get("user-agent") || "Unknown";

    const visitorHash = LinksVisitor.hashIpAddressAndUserAgent({
      ipAddress: ip,
      userAgent,
    });

    console.log("Visitor Hash:", visitorHash);

    const visitorExists = await LinksVisitor.exists({
      linkId: link._id,
      hashedIpAddress: visitorHash,
    });

    if (!visitorExists) {
      await LinksVisitor.create({
        linkId: link._id,
        ipAddress: ip,
        hashedIpAddress: visitorHash,
        userAgent,
        country: "Unknown",
      });
    }

    await Analytics.findOneAndUpdate(
      { linkId: link._id },
      {
        $inc: {
          totalClicks: 1,
          ...(visitorExists ? {} : { totalUniqueClicks: 1 }),
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    if (link.isOneTimeUse) {
      await Link.updateOne(
        {
          _id: link._id,
          isUsed: false,
        },
        {
          $set: {
            isUsed: true,
          },
        },
      );
    }

    return res.redirect(302, link.originalUrl);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.use("/api/users", userRouter);
app.use("/api/links", linksRouter);
app.use("/api/analytics", analyticsRouter);

export default app;
