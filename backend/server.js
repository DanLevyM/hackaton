import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/error.js';
// Route files
import adminRouter from './routes/admin.router.js';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import contactRouter from './routes/contact.router.js';
import graphRouter from './routes/graph.router.js';
import reportRouter from './routes/report.router.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config({path: './config/config.env'});
connectDB();
const PORT = process.env.PORT || 5001;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // all origin can access
  res.setHeader('Access-Control-Allow-Credentials', true);
  // eslint-disable-next-line max-len
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // headers available
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // methods available
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Solve req.body issue
app.use(fileUpload({
  createParentPath: true,
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/xlsx', graphRouter);
app.use('/api/v1/report', reportRouter);

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
