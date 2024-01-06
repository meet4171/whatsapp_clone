import express from 'express';
import { allConversation, createConversation, getConversation } from '../controller/Conversation.js';

const router = express.Router()


router.post('/', createConversation);
router.post('/get', getConversation);
router.get('/', allConversation);

export default router;