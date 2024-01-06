import { gfs, gridFSBucket } from '../utils/uploadFile.js';

const url = `http://localhost:8080`;

export const fileUpload = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).json({ message: "file not found" });
        }
        const fileUrl = `${url}/file/get/${req.file.filename}`;

        return res.status(200).json({ fileUrl });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
};


export const getFile = async (req, res) => {
    try {
        const file = await gfs.collection('uploads').findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({ message: "file not found" });
        }
        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

        const readStream = gridFSBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ error: "internal server error" });
    }
};