import User from '../models/Users.js';

// @desc Get all users
// @desc GET /api/v1/admin/users
// @access      Private
export function updatePassword(req, res, next) {
  res
      .status(200)
      .send({message: 'Password updated', success: true});
}
