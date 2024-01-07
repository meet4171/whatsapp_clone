import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/User.js';
import conversationRouter from './routes/Conversation.js';
import messageRouter from './routes/Message.js';
import cors from 'cors';
import multer from 'multer';
import { fileUpload, getFile } from './controller/UploadFile.js';
import { connectDB } from './database/db.js';
import { storage } from './utils/uploadFile.js';
import path from 'path';
import { Server } from "socket.io";
import http from 'http'
import { handleConnection } from './socket/index.js';

dotenv.config();

const upload = multer({ storage });

const server = express();
const httpServer = http.createServer(server);

server.use('/', express.static(path.resolve('build')));

server.use(express.json());
server.use(cors());
server.use('/user', userRouter);
server.use('/conversation', conversationRouter);
server.use('/message', messageRouter);

server.post('/file/upload', upload.single('file'), fileUpload);
server.get('/file/get/:filename', getFile);

server.get('/*', function (req, res) {
  res.sendFile(path.join(path.resolve(import.meta.url, '../build'), 'index.html'));
});



// Socket connection

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  }
});

handleConnection(io);


httpServer.listen(8080, () => {
  console.log("Server Started at port http://localhost:8080");
});

connectDB();
