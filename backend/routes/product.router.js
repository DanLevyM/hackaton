import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from '../controllers/product.controller.js';
import express from 'express';
import {protect, authorize} from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const productRouter = express.Router();

productRouter
    .route('/new')
    .post(protect, createProduct);
productRouter
    .route('/update/:id')
    .put(protect, updateProduct);
productRouter
    .route('/delete/:id')
    .delete(protect, deleteProduct);
productRouter
    .route('/all')
    .get(protect, getProducts);

export default productRouter;
