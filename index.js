const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Dot environment configuration

// Mongo DB connection
const dbConfig = require("./config/connectDB");

// Import routes
const userRoutes = require("./Routes/userRoutes");
const postRoutes = require("./Routes/postRoutes");

const port = process.env.PORT || 5000;

// Create Express server
const server = express();

// Application middleware
server.use(express.json());
server.use(cors());

// Default route
server.get("/", (req, res) => {
  res.send("API running successfully");
});

// Route handlers
server.use("/api/user", userRoutes);
server.use("/api/post", postRoutes);

// Start the server
server.listen(port, () => console.log(`Server running on ${port}`));
