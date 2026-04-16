import User from "../models/User.js";
import Content from "../models/Content.js";
import asyncHandler from "express-async-handler";

// -----------------------------------------------------------
// GET CONTENT
// -----------------------------------------------------------
export const getContents = asyncHandler(async (req, res) => {
  const contents = await Content.find();
  res.status(200).json(contents);
});

// -----------------------------------------------------------
// CREATE CONTENT
// -----------------------------------------------------------
export const createContent = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const newContent = await Content.create({
    user: req.user._id,
    title,
    category,
    description,
  });

  // Update user's content list
  const user = await User.findById(req.user._id);
  user.content.push(newContent._id);
  await user.save();

  res.status(201).json(newContent);
});

export const editContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const content = await Content.findById(id);
  if (!content) {
    return res.status(404).json({ message: "Content not found" });
  }

  content.title = title;
  content.description = description;

  const updatedContent = await content.save();
  res.status(200).json(updatedContent);
});

export const getContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await Content.findById(id);
  if (!content) {
    return res.status(404).json({ message: "Content not found" });
  }
  res.status(200).json(content);
});

export const viewCount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await Content.findById(id);
  if (!content) {
    return res.status(404).json({ message: "Content not found" });
  }
  content.views += 1;
  const updatedContent = await content.save();
  res.status(200).json(updatedContent);
});

export const likeContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await Content.findById(id);
  if (!content) {
    return res.status(404).json({ message: "Content not found" });
  }
  content.likes.push(req.user._id);
  const updatedContent = await content.save();
  res.status(200).json(updatedContent);
});

export const deleteContent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const content = await Content.findById(id);
  if (!content) {
    return res.status(404).json({ message: "Content not found" });
  }
  await Content.findByIdAndDelete(id);
  res.status(200).json({ message: "Content deleted" });
});