import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import baseRoutes from './routes/baseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// CONNECT DATABASE
// connectDB()

const app = express();
const PORT = process.env.PORT || 3000;


// Serve static files from /public
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
app.use('/api/content', contentRoutes); // Placeholder for content routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});