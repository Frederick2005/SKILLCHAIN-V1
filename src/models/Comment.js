import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true }, // ADD THIS
  comment: { type: String, required: true },
  reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true }, // ADD — parent comment
  reply: { type: String, required: true },  // RENAME from 'comment' to avoid confusion
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
export const Reply = mongoose.model("Reply", replySchema);
