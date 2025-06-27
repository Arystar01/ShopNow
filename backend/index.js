import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express();

// To resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS for development (you can customize for prod)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Serve frontend static files (from Vite build)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// ✅ Catch-all route to serve frontend for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// ✅ Start server
app.listen(port, () => {
    connectDb();
    // connectCloudinary(); // Uncomment if Cloudinary is used
    console.log(`Server is running on port ${port}`);
});
