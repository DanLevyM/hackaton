import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
// Route files
import adminRouter from './routes/admin.router.js';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';

dotenv.config({path: './config/config.env'});
connectDB();
const PORT = process.env.PORT || 5001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Solve req.body issue
app.use(express.json());
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use(errorHandler);
const server = app.listen(
    PORT,
    // eslint-disable-next-line max-len
    console.log(`Serveur running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err}`.red);
  // Close server & exit
  server.close(() => process.exit(1));
});
