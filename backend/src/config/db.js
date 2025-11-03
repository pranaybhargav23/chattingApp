
import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log('MongoDB connected successfully');
    }catch(err){
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
}
export default connectDB;
