import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import connectDB from './config/db.js';
import baseRoutes from './routes/baseRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();


// CONNECT DATABASE
// connectDB()

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
}));
app.use(morgan('dev'));

// static public files
app.use(express.static('src/public'));


// Routes
app.use('/', baseRoutes);
app.use('/api/auth', authRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});