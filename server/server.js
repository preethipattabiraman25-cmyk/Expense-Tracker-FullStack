const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is Running 🚀");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});