import mongoose from 'mongoose';

const connectDb= async ()=>{
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB connected successfully');
    })
    await mongoose.connect(process.env.MONGO_URL);
}

export default connectDb;