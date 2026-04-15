import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getContent, getContents, editContent, deleteContent, createContent, viewCount, likeContent } from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getContents);

router.post("/create", protect, createContent)

// anyone can view content, but only the creator can edit it
router.get("/:id", getContent);

// user must be logged in and must be the creator of the content to edit it
router.put("/:id", protect, editContent);

router.delete("/:id", protect, deleteContent);

// like and views
router.post("/:id/like", protect, likeContent);
router.post("/:id/view", protect, viewCount);

// router.get("/dashboard", protect)

export default router;