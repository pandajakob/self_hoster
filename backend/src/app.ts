import 'dotenv/config'; 
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import fileRotes from './routes/fileRoutes.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorHandler.js';
import path from 'path'
import {  dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname, '..', '..','frontend', 'build');

// static files
app.use('/', express.static(dirPath))
app.use(cookieParser())
// initialize server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);
app.use('/files', fileRotes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;