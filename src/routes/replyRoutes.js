import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getReplies, createReply, deleteReply, likeReply } from "../controllers/replyController.js";

const router = express.Router();

router.get("/:commentId", protect, getReplies);   // GET  /api/replies/:commentId
router.post("/", protect, createReply);            // POST /api/replies
router.delete("/:id", protect, deleteReply);       // DELETE /api/replies/:id
router.post("/:id/like", protect, likeReply);      // POST /api/replies/:id/like

export default router;