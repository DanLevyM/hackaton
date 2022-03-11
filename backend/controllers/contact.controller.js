/* eslint-disable max-len */
import Contact from '../models/Contact.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Send contact form
// @path    POST /api/v1/contact/send
// @access  Public
export const sendContactForm = asyncHandler(async (req, res, next) => {
  const {email, name, role, company, phone, message} = req.body;

  if (!email || !name || !company || !phone || !message || !role) return next(new ErrorResponse('Please provide valid email, name, company, phone and message', 400));

  const contact = await Contact.create({
    email,
    company,
    role,
    message,
    registerForm: false,
    name,
    phone,
  });

  res.status(200).json({
    data: contact,
    message: 'Contact form sent!',
    success: true,
  });
});
