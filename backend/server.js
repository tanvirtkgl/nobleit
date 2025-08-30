import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import specialistRoutes from "./routes/specialistRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";   // ✅ add news

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // allow frontend
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/users', userRoutes);
app.use("/api/specialists", specialistRoutes);
app.use("/api/news", newsRoutes);   // ✅ register news API

// Root
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
