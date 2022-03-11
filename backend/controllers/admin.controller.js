/* eslint-disable max-len */
import User from '../models/Users.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';
import Contact from '../models/Contact.js';
import generator from 'generate-password';
import sendRegisterUserEmail from '../utils/send-register-user-email.js';

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

// -----------------------------------------------------------------------
// ---------------------------- REGISTER FORM ----------------------------
// -----------------------------------------------------------------------
// @desc    Get contact and register forms
// @path    GET /api/v1/admin/contact
// @access  Private/admin
export const getForms = asyncHandler(async (req, res, next) => {
  const reqQuery = {...req.query};

  // Fields to exclude
  const removeFields = ['sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // api/v1/admin/contact?registerForm=false
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(eq)\b/g, (match) => `$${match}`);

  let query = Contact.find(JSON.parse(queryStr));

  // Sort
  // /api/v1/admin/contact?sort=_id
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination / Limit
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Contact.countDocuments();
  query = query.skip(startIndex).limit(limit);

  const contacts = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page -1,
      limit,
    };
  }

  return res.status(200).json({
    success: true,
    count: contacts.length,
    pagination,
    data: contacts,
  });
});

// @desc    Create user from register form
// @path    /api/v1/admin/contact/adduser/:formId
// @access  Private/admin
export const addUser = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) return next(new ErrorResponse(`Contact ${req.params.id} not found!`, 404));

  const {email, role, name} = contact;
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  // Create reset url
  console.log('req protocol', req.protocol);
  console.log('req.get(host)', req.get('host'));

  // const newPwd = `${req.protocol}://${req.get('host')}/api/v1/user/resetpassword/${resetToken}`;

  try {
    const user = await User.create({
      email,
      name,
      password,
      role,
    });

    const message = `Welcome at Wired Beauty\n\nYou are receiving this email because you requested to join our company.\n\nYou can now connect to our website with:\nYour email: ${user.email}\nYour new password: ${password}`;

    await sendRegisterUserEmail({
      email: user.email,
      subject: 'Welcome at Wired Beauty',
      message,
    });
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({success: true, data: 'Email sent!'});
  } catch (err) {
    console.log(err);

    // await user.save({validateBeforeSave: false});
    return next(new ErrorResponse('Email could not be send'), 500);
  }
});

// @desc    Delete a form
// @path    /api/v1/admin/contact/:id
// @access  Private/admin
export const deleteForm = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) return next(new ErrorResponse(`Contact ${req.params.id} not found!`, 404));

  return res.status(200).json({
    success: true,
    data: contact,
    message: 'Contact form deleted!',
  });
});
