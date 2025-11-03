import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import registerRoute from './routes/registerRoute.js';


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', registerRoute);

const startServer = async () =>{
    try{
        const PORT = process.env.PORT;
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
        await connectDB();
    }catch(err){
        console.error('Failed to start server:', err);
        process.exit(1);
    }


}

startServer();