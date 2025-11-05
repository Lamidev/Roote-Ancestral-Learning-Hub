const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();




// MongoDB Connection
const dbURL = process.env.MONGODB_URL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const app = express();
    const PORT = process.env.PORT || 7090;

    // Middleware
    app.use(
      cors({
        origin: ["http://localhost:5174"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
          "Accept",
          "Cache-Control",
          "Expires",
          "Pragma"
        ],
        credentials: true,
        exposedHeaders: ['Set-Cookie']
      })
    );

    // Middleware
    app.use(express.json());
    app.use(cookieParser());

    
  
    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server is live on port ${PORT}`);
    });
  })
  .catch((error) => console.error("❌ MongoDB connection failed:", error));
