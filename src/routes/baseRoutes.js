import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Base template folder
const TEMPLATE_DIR = path.join(__dirname, "../public/templates");

// Helper function
const renderTemplate = (res, fileName) => {
  res.sendFile(path.join(TEMPLATE_DIR, fileName));
};

router.get("/", (_, res) => renderTemplate(res, "/main/index.html"));
router.get("/home", (_, res) => renderTemplate(res, "/main/home.html"));
router.get("/about", (_, res) => renderTemplate(res, "/marketing/about.html"));
router.get("/create", (_, res) => renderTemplate(res, "/main/create.html"));
router.get("/explore", (_, res) => renderTemplate(res, "/Discover/explore.html"));
router.get("/profile", (_, res) => renderTemplate(res, "/social/profile.html"));
router.get("/edit-lesson/:id", (_, res) => renderTemplate(res, "/main/edit-lesson.html"));

router.get("/help", (_, res) => renderTemplate(res, "help.html"));
router.get("/account", (_, res) => renderTemplate(res, "account.html"));
router.get("/inbox", (_, res) => renderTemplate(res, "inbox.html"));
router.get("/library", (_, res) => renderTemplate(res, "library.html"));
router.get("/messages", (_, res) => renderTemplate(res, "messages.html"));

router.get("/signup", (_, res) => renderTemplate(res, "auth/signup.html"));
router.get("/signin", (_, res) => renderTemplate(res, "auth/login.html"));

export default router;
