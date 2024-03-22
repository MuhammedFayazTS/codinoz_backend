const express = require("express");
const router = express.Router();
const { createNewPost, fetchAllPosts } = require("../Controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Define routes
router.post("/create", authMiddleware, createNewPost);
// fetch all post
router.get("/", fetchAllPosts);

module.exports = router;
