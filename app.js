require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const memberRoutes = require("./routes/memberRoute");
const voteRoutes = require("./routes/voteRoute");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests

app.use("/api/members", memberRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/auth", authRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
