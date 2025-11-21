import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getContent, createContent } from "../controllers/contentController.js";

const router = express.Router();

router.get("/", protect, getContent);

router.post("/create", protect, createContent)


// router.get("/dashboard", protect)

export default router;