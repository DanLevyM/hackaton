import User from '../models/Users.js';

// @desc    Get all users
// @desc    GET /api/v1/admin/users
// @access  Private
export function getUsers(req, res, next) {
  res
      .status(200)
      .send({users: [], success: true});
}

// @desc    Get one user
// @desc    GET /api/v1/admin/user/:id
// @access  Private
export function getUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `GET 1 user id: ${req.params.id }`});
}

// @desc    Create user
// @desc    POST /api/v1/admin/user
// @access  Private
export async function createUser(req, res, next) {
  const {email, name, password, role} = req.body;

  // eslint-disable-next-line no-unused-vars
  const user = await User.create({
    email,
    name,
    password,
    role,
  });

  res.status(200).json({success: true, message: 'User created'});
};

// @desc    Update one user
// @desc    PUT /api/v1/admin/user/:id
// @access  Private
export function updateUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `User ${req.params.id } updated!`});
}

// @desc    Delete one user
// @desc    DELETE /api/v1/admin/user/:id
// @access  Private
export function deleteUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `User id: ${req.params.id } deleted`});
}
