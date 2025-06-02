import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
dotenv.config();


const app=express();
app.use(cors());

const port=process.env.PORT || 5000;

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('api/cart',cartRouter);
app.use('api/order',orderRouter);


app.get('/', (req, res)=>{
    res.send('Hello World!');
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    connectDb();
    connectCloudinary();

})