const express = require("express");
const router = express.Router();
const { createNewPost, fetchAllPosts, editPost, deletePost } = require("../Controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Define routes
// create new post
router.post("/", authMiddleware, createNewPost);
// fetch all post
router.get("/",fetchAllPosts);
// edit post
router.patch("/:postId", authMiddleware, editPost);
// delete post
router.delete("/:postId", authMiddleware, deletePost);

module.exports = router;
