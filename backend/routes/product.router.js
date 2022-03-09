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
    .post(protect, authorize('admin', 'client'), createProduct);
productRouter
    .route('/update/:id')
    .put(protect, authorize('admin', 'client'), updateProduct);
productRouter
    .route('/delete/:id')
    .delete(protect, authorize('admin', 'client'), deleteProduct);
productRouter
    .route('/all')
    .get(protect, authorize('admin', 'client'), getProducts);

export default productRouter;
