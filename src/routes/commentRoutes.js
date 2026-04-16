import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getComments, getComment, createComment, deleteComment, likeComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", protect, createComment);             // POST /api/comments
router.get("/:contentId", protect, getComments);     // GET  /api/comments/:contentId
router.get("/single/:id", protect, getComment);      // GET  /api/comments/single/:id
router.delete("/:id", protect, deleteComment);       // DELETE /api/comments/:id
router.post("/:id/like", protect, likeComment);      // POST /api/comments/:id/like

export default router;