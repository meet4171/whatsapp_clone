import mongoose from 'mongoose';

import { config } from 'dotenv';
config()
export async function connectDB() {

    try {
         mongoose.connect(process.env.MONGO_URL, {
            dbName: 'WhatsappClone'
        })
        console.log("Database Connected Successfully")

    } catch (error) {
        console.log(error)

    }
}