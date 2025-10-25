import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { requestLogger } from './middleware/logger';
import routes from './routes';
import { setupSwagger } from './swagger';

const app = express();

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Logger
app.use(requestLogger);

// Swagger
setupSwagger(app);

// Routes
app.use('/api', routes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running 🚀' });
});

// Start server
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
