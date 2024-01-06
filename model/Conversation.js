import mongoose, { Schema, model } from 'mongoose';
import { messageSchema } from './Message.js';

const conversationSchema = new Schema({
    members: {
        senderId: { type: String },
        receiverId: { type: String }
    },
    messages: [messageSchema]

}, { timestamps: true });



export const Conversation = model('Conversations', conversationSchema);
