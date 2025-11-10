import express from 'express';
import messageModal from '../modals/messages.js';

const router = express.Router();

router.get('/messages/:chatId', async (req, res) => {
    try{
        const { chatId } = req.params;
        const messages = await messageModal.find({ chatId });
        res.status(200).json(messages);


    }catch(err){

        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

export default router;