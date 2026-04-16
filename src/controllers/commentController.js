import User from "../models/User.js";
import Comment from "../models/Comment.js";
import asyncHandler from "express-async-handler";

// -----------------------------------------------------------
// GET COMMENTS
// -----------------------------------------------------------
export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();
  res.status(200).json(comments);
});

// -----------------------------------------------------------
// CREATE COMMENT
// -----------------------------------------------------------
export const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  const newComment = await Comment.create({
    user: req.user._id,
    comment,
  });

  // Update user's comment list
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