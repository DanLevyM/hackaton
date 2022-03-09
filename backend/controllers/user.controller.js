/* eslint-disable max-len */
import User from '../models/Users.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import sendEmail from '../utils/send-emails.js';

dotenv.config({path: '../config/config.env'});

// @desc    Login
// @path    POST /api/v1/user/pwd
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
// @path    PUT /api/v1/user/pwd
// @access  Private
export async function updatePassword(req, res, next) {
  const {oldPwd, newPwd} = req.body;

  res.status(200).json({success: true, oldPwd: `${oldPwd}`, newPwd: `${newPwd}`});
}

// @desc    Get current logged in user
// @path    POST /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Forgot password
// @path    POST /api/v1/user/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPwdToken();

  console.log(resetToken);
  await user.save({validateBeforeSave: false});

  // Create reset url
  console.log('req protocol', req.protocol);
  console.log('req.get(host)', req.get('host'));
  console.log('resetTok', resetToken);

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/user/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you has requested the reset of a password. Please make a PUT request to \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });
    res.status(200).json({success: true, data: 'Email sent!'});
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave: false});
    return next(new ErrorResponse('Email could not be send'), 500);
  }
});

// @desc    Reset password
// @path    PUT /api/v1/user/resetpassword/:resettoken
// @access  Private
export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()},
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.save();

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send resp
function sendTokenResponse(user, statusCode, res) {
  const token = user.getSignedJwtToken();
  const expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
  const options = {
    expires,
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
        expires,
      });
};
