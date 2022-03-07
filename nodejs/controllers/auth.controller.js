// import User from '../models/Users.js';

// @desc    User update password
// @desc    PUT /api/v1/user/pwd
// @access  Private
export default async function updatePassword(req, res, next) {
  const {oldPwd, newPwd} = req.body;

  res.status(200).json({success: true, oldPwd: `${oldPwd}`, newPwd: `${newPwd}`});
}
