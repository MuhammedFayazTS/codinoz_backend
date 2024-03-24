const Post = require("../Models/postModel");

// create a new post
const createNewPost = async (req, res) => {
  try {
    const { title, codeSnippet, userId } = req.body;

    // Create new post
    const newPost = new Post({ title, codeSnippet, creator: userId });

    // Save to database
    await newPost.save();

    res.status(201).json({ message: "New post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch all posts
const fetchAllPosts = async (req, res) => {
  try {
    // Find all posts and populate creator field with user details
    const allPosts = await Post.find({})
      .populate({
        path: "creator",
        select: "name email image _id",
      });

    res
      .status(200)
      .json({ message: "Fetched all posts successfully", allPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// edit post
const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, title, codeSnippet } = req.body;

    // Create new post
    const post = await Post.findOne({ _id: postId, creator: userId });

    post.title = title ? title : post.title;
    post.codeSnippet = codeSnippet ? codeSnippet : post.codeSnippet;

    // Save to database
    await post.save();

    res.status(200).json({ message: "Post Edited successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// fetch all posts
const fetchUserPost = async (req, res) => {
  try {
    // Find all posts and populate creator field with user details
    const allPosts = await Post.find({creator: req.body.userId})
      .populate({
        path: "creator",
        select: "name email image _id",
      });

    res
      .status(200)
      .json({ message: "Fetched all posts successfully", allPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createNewPost,
  fetchAllPosts,
  editPost,
  deletePost,
  fetchUserPost
};
