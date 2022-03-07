import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import connectDB from './config/db.js';
// Route files
import adminRouter from './routes/admin.router.js';
import userRouter from './routes/auth.router.js';

dotenv.config({path: './config/config.env'});
connectDB();
const PORT = process.env.PORT || 5001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
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
