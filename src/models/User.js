import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["learner", "instructor", "admin"], default: "learner" },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
