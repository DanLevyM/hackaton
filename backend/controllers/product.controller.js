import Product from '../models/Product.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc    Create product
// @path    POST /api/v1/product/new
// @access  Private
export const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const {name, price} = req.body;

  if (!name || !price) return next(new ErrorResponse('Please provide valid name and price', 400));

  console.log(typeof price);
  if (typeof price != 'number') return next(new ErrorResponse('Invalid price', 400));

  const product = await Product.create({
    name,
    price,
    user: req.body.user,
  });

  res.status(200).json({
    data: product,
    message: 'Product created',
    success: true,
  });
});

// @desc    Get 1 product
// @path    GET /api/v1/product/:id
// @access  Private
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorResponse('Invalid product', 400));

  return res.status(200).json({success: true, data: product});
});

// @desc    Get all products
// @path    GET /api/v1/product/all
// @access  Private
export const getProducts = asyncHandler(async (req, res, next) => {
  const reqQuery = {...req.query};

  // Fields to exclude
  const removeFields = ['select, sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // /api/v1/product/all?price[lte]=15
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  let query = Product.find(JSON.parse(queryStr));

  // Select fields
  // /api/v1/product/all?select=price
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  // Sort
  // /api/v1/product/all?sort=price
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }
  // else {
  //   query = query.sort('-createdAt');
  // }

  // Pagination / Limit
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  query = query.skip(startIndex).limit(limit);

  const products = await query;

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
    count: products.length,
    pagination,
    data: products,
  });
});

// @desc    Update product
// @path    PUT /api/v1/product/update/:id
// @access  Private
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorResponse('Invalid product', 404));

  if (product.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorize to update this product`, 401));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({success: true, data: product});
});

// @desc    Delete product
// @path    DELETE /api/v1/product/delete/:id
// @access  Private
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorResponse('Invalid product', 400));

  if (product.user.toString() !== req.user.id && req.user.role != 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorize to update this product`, 401));
  }

  product.remove();
  return res.status(200).json({success: true, data: {}});
});
