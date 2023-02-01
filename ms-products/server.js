import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import ListenToQueue from './utils/ListenToQueue.js';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import connectDB from './config/db.js'
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';
import morgan from 'morgan';

// dotenv configuration:
dotenv.config();

// database object:
connectDB();

// Start server:
const app = express();

// Cors protection:
app.use(cors());
app.use(express.json());


// Nosql Injection protection:
app.use(mongoSanitize());

//Logging:
app.use(morgan('combined'));

// Products:
app.use('/api/products', productRoutes);

// Uploads:
const __dirname = path.resolve();

// image cache:
const cacheTime = 8640000 * 30;

app.use('/api/products/upload', uploadRoutes);
app.use('/api/products/uploads', express.static(path.join(__dirname, '/uploads'), { maxAge: cacheTime }));

app.use(notFound);
app.use(errorHandler);

const PORT = 8003;

app.listen(
  PORT,
  console.log(
    `Server running on port: ${PORT}`
  )
);