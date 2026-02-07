import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Base template folder
const TEMPLATE_DIR = path.join(__dirname, "../public/templates");

console.log(TEMPLATE_DIR);


// Helper function
const renderTemplate = (res, fileName) => {
  const filePath = path.join(TEMPLATE_DIR, fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Cannot load page");
    }
  });
};

router.get("/", (_, res) => renderTemplate(res, "index.html"));
router.get("/about", (_, res) => renderTemplate(res, "about.html"));
// router.get("/profile", (_, res) => renderTemplate(res, "profile.html"));
// router.get("/help", (_, res) => renderTemplate(res, "help.html"));
// router.get("/account", (_, res) => renderTemplate(res, "account.html"));
// router.get("/inbox", (_, res) => renderTemplate(res, "inbox.html"));
// router.get("/library", (_, res) => renderTemplate(res, "library.html"));
router.get("/create", (_, res) => renderTemplate(res, "create.html"));
// router.get("/messages", (_, res) => renderTemplate(res, "messages.html"));
router.get("/signup", (_, res) => renderTemplate(res, "signup.html"));
router.get("/signin", (_, res) => renderTemplate(res, "signin.html"))

export default router;
