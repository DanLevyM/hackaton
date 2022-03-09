import User from '../models/Users.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get all users
// @path    GET /api/v1/admin/users
// @access  Private
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  console.log(req.query);

  // TO CHECK IF IT USELESS
  if (!users.length) {
    return res
        .status(200)
        .send({users: [], success: true});
  }
  return res
      .status(200)
      .send({users: users, success: true});
});

// @desc    Get one user
// @path    GET /api/v1/admin/user/:id
// @access  Private
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User ${req.params.id} not found!`, 404));
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Create user
// @path    POST /api/v1/admin/user
// @access  Private
export const createUser = asyncHandler(async (req, res, next) => {
  const {email, name, password, role} = req.body;

  // eslint-disable-next-line no-unused-vars
  const user = await User.create({
    email,
    name,
    password,
    role,
  });

  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: 'User created',
    data: user,
    token,
  });
});

// @desc    Update one user
// @path    PUT /api/v1/admin/user/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User ${req.params.id} not found!`, 404));
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Delete one user
// @path    DELETE /api/v1/admin/user/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorResponse(`User ${req.params.id} not found!`, 404));
  }
  return res.status(200).json({
    success: true,
    data: user,
  });
});
