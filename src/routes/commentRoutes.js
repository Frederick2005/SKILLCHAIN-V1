import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getComments, getComment, createComment, deleteComment, likeComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/", getComments);

router.post("/create", protect, createComment)

// anyone can view content, but only the creator can edit it
router.get("/:id", getComment);

router.delete("/:id", protect, deleteComment);

// like and views
router.post("/:id/like", protect, likeComment);

// router.get("/dashboard", protect)

export default router;