import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors';

// dotenv configuration:
dotenv.config();

// database connection:
connectDB();

// Start server:
const app = express();

// Logging:
app.use(morgan('combined'));

// Nosql Injection protection:
app.use(mongoSanitize());

// Cors protection:
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = 8002;

app.listen(PORT,
	console.log(
		`Server running on port: ${PORT}`
	)
)
