import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import deliveryRunRoutes from './routes/deliveryRunRoutes.js';
import ngoDemandRoutes from './routes/ngoDemandRoutes.js';
import ngoRoutes from './routes/ngoRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';

const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:');
  missingEnvVars.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

connectDB();

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'ShareBite API is running',
    version: '1.0.0',
  });
});

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/delivery-runs', deliveryRunRoutes);
app.use('/api/ngo-demands', ngoDemandRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`ShareBite backend running on http://localhost:${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
  console.log(
    `Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'configured' : 'not configured (optional)'}`
  );
});
