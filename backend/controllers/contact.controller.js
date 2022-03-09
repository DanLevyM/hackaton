import Contact from '../models/Contact.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Send contact form
// @path    POST /api/v1/contact/send
// @access  Public
export const sendContactForm = asyncHandler(async (req, res, next) => {
  const {email, title, message} = req.body;

  if (!email || !title || !message) {
    return next(new ErrorResponse('Please provide valid email, title and message', 400));
  }

  const contact = await Contact.create({
    email,
    title,
    message,
  });

  res.status(200).json({
    data: contact,
    message: 'Form sent!',
    success: true,
  });
});
