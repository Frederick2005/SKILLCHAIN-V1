import User from "../models/User.js";
import Comment from "../models/Comment.js";
import asyncHandler from "express-async-handler";

// -----------------------------------------------------------
// GET COMMENTS — only for a specific content
export const getComments = asyncHandler(async (req, res) => {
  const { contentId } = req.params; // comes from route: /api/comments/:contentId

  const comments = await Comment.find({ content: contentId })
    .populate("user", "username"); // optionally return the username too

  res.status(200).json(comments);
});

// CREATE COMMENT — attach to specific content
export const createComment = asyncHandler(async (req, res) => {
  const { comment, contentId } = req.body;

  if (!comment || !contentId) {
    return res.status(400).json({ message: "Comment and contentId are required" });
  }

  const newComment = await Comment.create({
    user: req.user._id,
    content: contentId,   // ADD THIS
    comment,
  });

  const user = await User.findById(req.user._id);
  user.comments.push(newComment._id);
  await user.save();

  res.status(201).json(newComment);
});

export const editComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const commentDoc = await Comment.findById(id);
  if (!commentDoc) {
    return res.status(404).json({ message: "Comment not found" });
  }

  commentDoc.comment = comment;
  const updatedComment = await commentDoc.save();
  res.status(200).json(updatedComment);
});

export const getComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.status(200).json(comment);
});

export const likeComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  comment.likes.push(req.user._id);
  const updatedComment = await comment.save();
  res.status(200).json(updatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  await Comment.findByIdAndDelete(id);
  res.status(200).json({ message: "Comment deleted" });
});