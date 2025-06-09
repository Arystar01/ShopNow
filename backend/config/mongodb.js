import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const connectDb= async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB connected successfully');
    })
    // await mongoose.connect(process.env.MONGO_URL);
}

export default connectDb;