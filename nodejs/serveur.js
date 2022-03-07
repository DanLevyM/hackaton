import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// Route files
import adminRoute from './routes/admin.router.js';
import connectDB from './config/db.js';

dotenv.config({path: './config/config.env'});
connectDB();
const PORT = process.env.PORT || 5001;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/admin', adminRoute);
const server = app.listen(
    PORT,
    // eslint-disable-next-line max-len
    console.log(`Serveur running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`),
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err}`);
  // Close server & exit
  server.close(() => process.exit(1));
});
