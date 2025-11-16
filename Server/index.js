

// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// require("dotenv").config();

// // MongoDB Connection
// const dbURL = process.env.MONGODB_URL;

// mongoose
//   .connect(dbURL)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");

//     const app = express();
//     const PORT = process.env.PORT || 7090;

//     // Middleware
//   app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", 
//       "https://rooteancestrallearninghub.com",
//        "https://www.rooteancestrallearninghub.com" 
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//       "Cache-Control",
//       "Expires",
//       "Pragma"
//     ],
//     credentials: true,
//     exposedHeaders: ["Set-Cookie"]
//   })
// );


//     // Middleware
//     app.use(express.json());
//     app.use(cookieParser());

//     // Import routes
//     const contactRoutes = require('./routes/contactRoutes');
//     const emailRoutes = require('./routes/emailRoutes');
//     const quizRoutes = require('./routes/quizRoutes');
//     const paymentRoutes = require('./routes/paymentRoutes');


//     // Use routes
//     app.use('/api/contact', contactRoutes);
//     app.use('/api/email', emailRoutes);
//     app.use('/api/quiz', quizRoutes);
//     app.use('/api/payments', paymentRoutes);

//     // Health check
//     app.get('/api/health', (req, res) => {
//       res.json({ 
//         status: 'OK', 
//         message: 'Roote Server is running!',
//         timestamp: new Date().toISOString()
//       });
//     });

//     // Test endpoint
//     app.get('/api/test', (req, res) => {
//       res.json({ message: 'Server is working!' });
//     });

//     // Start Server
//     app.listen(PORT, () => {
//       console.log(`😍😍 Server is now running on port ${PORT} 🎉🥳`);
//       console.log(`📧 Email endpoints ready`);
//       console.log(`📝 Contact form endpoints ready`);
//       console.log(`🎯 Quiz endpoints ready`);
//     });
//   })
//   .catch((error) => console.error("❌ MongoDB connection failed:", error));

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const dbURL = process.env.MONGODB_URL;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const app = express();
    const PORT = process.env.PORT || 7090;

    // CORS SETUP
    app.use(
      cors({
        origin: [
          "http://localhost:5173",
          "https://rooteancestrallearninghub.com",
          "https://www.rooteancestrallearninghub.com",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
          "Accept",
          "Cache-Control",
          "Expires",
          "Pragma",
        ],
        credentials: true,
        exposedHeaders: ["Set-Cookie"],
      })
    );

    /**
     * ===============================
     * 1️⃣ STRIPE WEBHOOK – RAW BODY
     * ===============================
     */
    const paymentController = require("./controllers/paymentController");

    app.post(
      "/api/payments/webhook/payments",
      express.raw({ type: "application/json" }),
      paymentController.handlePaymentWebhook
    );

    // Normal body parser AFTER webhook
    app.use(express.json());
    app.use(cookieParser());

    // ROUTES
    const contactRoutes = require("./routes/contactRoutes");
    const emailRoutes = require("./routes/emailRoutes");
    const quizRoutes = require("./routes/quizRoutes");
    const paymentRoutes = require("./routes/paymentRoutes");

    app.use("/api/contact", contactRoutes);
    app.use("/api/email", emailRoutes);
    app.use("/api/quiz", quizRoutes);
    app.use("/api/payments", paymentRoutes);

    app.get("/api/health", (req, res) => {
      res.json({
        status: "OK",
        message: "Roote Server is running!",
        timestamp: new Date().toISOString(),
      });
    });

    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
      console.log(`💰 Stripe webhook active`);
       console.log(`📧 Email endpoints ready`);
      console.log(`📝 Contact form endpoints ready`);
      console.log(`🎯 Quiz endpoints ready`);
    });
  })
  .catch((error) => console.error("❌ MongoDB connection failed:", error));
