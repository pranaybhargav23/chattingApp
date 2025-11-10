import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatId: { type: String, required: true  },
    senderId: { type: String, required: true  },
    receiverId: { type: String, required: true  },
    text: { type: String, required: true  },
    date: { type: Date, default: Date.now  },
    isRead: { type: Boolean, default: false  },
})


const messageModal=  mongoose.model("Message", MessageSchema);

export default messageModal;