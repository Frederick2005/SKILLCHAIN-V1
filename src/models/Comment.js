import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    reply: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const replySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
export const Reply = mongoose.model("Reply", replySchema);
