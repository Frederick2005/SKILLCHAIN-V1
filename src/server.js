import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import baseRoutes from './routes/baseRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import commentRoutes from "./routes/commentRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// CONNECT DATABASE
connectDB();

// ✅ CREATE APP FIRST
const app = express();
const PORT = process.env.PORT || 3000;


// ✅ SESSION (after app is created)
app.use(session({
  secret: 'skillchain_secret',
  resave: false,
  saveUninitialized: false
}));

// ✅ CACHE CONTROL
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// ✅ AUTH MIDDLEWARE
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}


// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
}));
app.use(morgan('dev'));

// Routes
app.use('/', baseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/replies", replyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});