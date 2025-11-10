import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import cors from 'cors';
import registerRoute from './routes/registerRoute.js';
import router from './routes/messagesRoute.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/messages', router);
app.use('/api', registerRoute);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (data) => {
    const { chatId, senderId, receiverId, text } = data;

    // Save in MongoDB
    const message = new Message({ chatId, senderId, receiverId, text });
    await message.save();

    // Emit to receiver (and sender for local sync)
    io.emit("receive_message", message);
  });
});



const startServer = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        await connectDB();
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();