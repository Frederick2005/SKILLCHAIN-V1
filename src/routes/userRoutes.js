import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAllUsers, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:id", getUser);



export default router;
