// @desc Get all users
// @desc GET /api/v1/admin/users
// @access      Private
export function getUsers(req, res, next) {
  res
      .status(200)
      .send({users: [], success: true});
}

// @desc Get one user
// @desc GET /api/v1/admin/user/:id
// @access      Private
export function getUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `GET 1 user id: ${req.params.id }`});
}

// @desc Create user
// @desc POST /api/v1/admin/user
// @access      Private
export function createUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: 'User created'});
}

// @desc Update one user
// @desc PUT /api/v1/admin/user/:id
// @access      Private
export function updateUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `User ${req.params.id } updated!`});
}

// @desc Delete one user
// @desc DELETE /api/v1/admin/user/:id
// @access      Private
export function deleteUser(req, res, next) {
  res
      .status(200)
      .send({success: true, message: `User id: ${req.params.id } deleted`});
}
