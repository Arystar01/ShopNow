import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express();

// ✅ Use CORS with proper origin for development
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

// ✅ Corrected route paths with leading slashes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React
app.use(express.static(path.join(__dirname, '../client/dist')));

// For any other routes, serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
    connectDb();
    // connectCloudinary();
    console.log(`Server is running on port ${port}`);
    
});
