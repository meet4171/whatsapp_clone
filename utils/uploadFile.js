import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import crypto from 'crypto';
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';

export const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };

                resolve(fileInfo);
            });
        });
    },
});



const conn = mongoose.connection;
let gfs, gridFSBucket;
conn.once('open', function () {

    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads')

})
export { gfs, gridFSBucket };


