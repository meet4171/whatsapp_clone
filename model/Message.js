import mongoose, { Schema } from 'mongoose';

export const messageSchema = new Schema({

    senderId: { type: String },
    receiverId: { type: String },
    text: { type: String },
    url: { type: String, default: '' }
}
    , { timestamps: true });
