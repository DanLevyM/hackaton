import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from '../controllers/product.controller.js';
import express from 'express';
import authorize from '../middleware/auth.js';

// eslint-disable-next-line new-cap
const productRouter = express.Router();

productRouter.post('/new', createProduct);
productRouter.get('/all', getProducts);
productRouter.put('/update/:id', updateProduct);
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;
