import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import { Reply } from "../models/Comment.js";

// GET /api/replies/:commentId — get all replies for a comment
export const getReplies = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const replies = await Reply.find({ comment: commentId })
        .populate("user", "username");
    res.status(200).json(replies);
});

// POST /api/replies — create a reply
export const createReply = asyncHandler(async (req, res) => {
    const { reply, commentId } = req.body;

    if (!reply || !commentId) {
        return res.status(400).json({ message: "Reply text and commentId are required" });
    }

    const newReply = await Reply.create({
        user: req.user._id,
        comment: commentId,
        reply,
    });

    // Push reply ID into parent comment's reply array
    await Comment.findByIdAndUpdate(commentId, {
        $push: { reply: newReply._id }
    });

    const populated = await newReply.populate("user", "username");
    res.status(201).json(populated);
});

// DELETE /api/replies/:id
export const deleteReply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reply = await Reply.findById(id);

    if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
    }

    // Remove from parent comment's reply array
    await Comment.findByIdAndUpdate(reply.comment, {
        $pull: { reply: reply._id }
    });

    await Reply.findByIdAndDelete(id);
    res.status(200).json({ message: "Reply deleted" });
});

// POST /api/replies/:id/like
export const likeReply = asyncHandler(async (req, res) => {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    reply.likes.push(req.user._id);
    const updated = await reply.save();
    res.status(200).json(updated);
});