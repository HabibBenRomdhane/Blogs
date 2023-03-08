import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  // upvotes: { type: Number, default: 0 },
  // downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;