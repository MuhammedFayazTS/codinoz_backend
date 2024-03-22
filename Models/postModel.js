const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  codeSnippet: {
    type: String,
    required: [true, "CodeSnippet is required"],
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
