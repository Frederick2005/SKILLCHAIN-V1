import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getContent, getContents, editContent, createContent } from "../controllers/contentController.js";

const router = express.Router();

router.get("/", getContents);

router.post("/create", protect, createContent)

router.get("/:id", getContent);

router.put("/:id", protect, editContent);


// router.get("/dashboard", protect)

export default router;