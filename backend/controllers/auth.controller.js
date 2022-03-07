import User from '../models/Users.js';

// @desc    Login
// @desc    POST /api/v1/user/pwd
// @access  Public
export async function login(req, res, next) {
  const {email, password} = req.body;
  if (!email || !password) {
    // ErrorResponse
    return next(new Error());
  }

  // Check for user
  const user = await User.findOne({email}).select('+password');

  if (!user) {
    // Invalid credentials
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    process.exit();
  }

  res.status(200).json({success: true});
}

// @desc    User update password
// @desc    PUT /api/v1/user/pwd
// @access  Private
export async function updatePassword(req, res, next) {
  const {oldPwd, newPwd} = req.body;

  res.status(200).json({success: true, oldPwd: `${oldPwd}`, newPwd: `${newPwd}`});
}
