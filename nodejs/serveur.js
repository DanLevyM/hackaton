import dotenv from 'dotenv';
import express from 'express';

// Route files
import adminRoute from './routes/admin.router.js';
import morgan from 'morgan';

const PORT = process.env.PORT || 5001;
const app = express();
dotenv.config({path: './config/config.env'});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/admin', adminRoute);
app.listen(
    PORT,
    // eslint-disable-next-line max-len
    console.log(`Serveur running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`),
);
