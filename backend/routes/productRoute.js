import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();


productRouter.post("/add", upload.array("image"), addProduct);

 // No file upload middleware
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/update', adminAuth, updateProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;
