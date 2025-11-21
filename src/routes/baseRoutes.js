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

router.get("/", (_, res) => renderTemplate(res, "index.html"));
router.get("/explore", (_, res) => renderTemplate(res, "explore.html"));
router.get("/profile", (_, res) => renderTemplate(res, "profile.html"));
router.get("/help", (_, res) => renderTemplate(res, "help.html"));
router.get("/account", (_, res) => renderTemplate(res, "account.html"));
router.get("/inbox", (_, res) => renderTemplate(res, "inbox.html"));
router.get("/library", (_, res) => renderTemplate(res, "library.html"));
router.get("/create", (_, res) => renderTemplate(res, "create.html"));
router.get("/messages", (_, res) => renderTemplate(res, "messages.html"));
router.get("/signup", (_, res) => renderTemplate(res, "new_account.html"));
router.get("/signin", (_, res) => renderTemplate(res, "sign_in.html"))

export default router;
