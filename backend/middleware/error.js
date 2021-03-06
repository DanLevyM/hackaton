import ErrorResponse from '../utils/errorResponse.js';

export default function errorHandler(err, req, res, next) {
  let error = {...err};
  error.message = err.message;
  console.log(err.stack.red);
  if (err.name === 'CastError') {
    const message = `${err.value} not found! Wrong format.`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error!',
  });
};
