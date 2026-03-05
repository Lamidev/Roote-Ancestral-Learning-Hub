const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require('axios');
require("dotenv").config();

const dbURL = process.env.MONGODB_URL;
const app = express();
const PORT = process.env.PORT || 7090;

// Start MongoDB Connection
mongoose.connect(dbURL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
    });

// CORS SETUP
app.use(cors({
    origin: ["http://localhost:5173", "https://rooteancestrallearninghub.com", "https://www.rooteancestrallearninghub.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Cache-Control", "Expires", "Pragma"],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
}));

// STRIPE WEBHOOK
const paymentController = require("./controllers/paymentController");
app.post("/api/payments/webhook/payments", express.raw({ type: "application/json" }), paymentController.handlePaymentWebhook);

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Roote Server is operational", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
