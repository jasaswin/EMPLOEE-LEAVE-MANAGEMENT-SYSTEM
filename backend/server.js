
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const authRoutes = require("./routes/authroutes");

// const leaveRoutes = require("./routes/leaveroutes");

const leaveRoutes = require("./routes/leaveRoutes");



// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/leave", leaveRoutes);

// Connect to DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Employee Leave Management API running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
