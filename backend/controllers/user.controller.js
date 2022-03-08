import User from '../models/Users.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import dotenv from 'dotenv';

dotenv.config({path: '../config/config.env'});

// @desc    Login
// @desc    POST /api/v1/user/pwd
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide valid email and password', 400));
  }

  // Check for user
  const user = await User.findOne({email}).select('+password');

  if (!user) {
    return next(new ErrorResponse('Please add valid email and password', 401));
  }

  // Check if pwd matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    User update password
// @desc    PUT /api/v1/user/pwd
// @access  Private
export async function updatePassword(req, res, next) {
  const {oldPwd, newPwd} = req.body;

  res.status(200).json({success: true, oldPwd: `${oldPwd}`, newPwd: `${newPwd}`});
}

// Get token from model, create cookie and send resp
function sendTokenResponse(user, statusCode, res) {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
      });
};
