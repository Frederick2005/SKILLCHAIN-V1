import Content from "../models/Content.js";
import asyncHandler from "express-async-handler";

// -----------------------------------------------------------
// GET CONTENT
// -----------------------------------------------------------
export const getContent = asyncHandler(async (req, res) => {
  const contents = await Content.find({ user: req.user._id });
  res.status(200).json(contents);
});

// -----------------------------------------------------------
// CREATE CONTENT
// -----------------------------------------------------------
export const createContent = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!title|| !category || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const newContent = await Content.create({
    user: req.user.id,
    title,
    category,
    description,
  });

  res.status(201).json(newContent);
});