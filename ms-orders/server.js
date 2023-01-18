import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import orderRoutes from './routes/orderRoutes.js'
import cors from 'cors';

// dotenv configuration:
dotenv.config();

// database object:
connectDB();

// Start server:
const app = express();

// Nosql Injection protection:
app.use(mongoSanitize());

// Cors protection:
app.use(cors());
app.use(express.json())

//Logging:
app.use(morgan('combined'));

//Routes:
app.use('/api/orders', orderRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = 8004;

app.listen(
  PORT,
  console.log(
    `Server running on port: ${PORT}`
  )
)


