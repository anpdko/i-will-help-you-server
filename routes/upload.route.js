const express = require("express");
const router = express.Router();
const { Blob, createBlobReadStream, createBlobWriteStream } = require('@vercel/blob');

const uploadTest = () => {

}

router.post('/', async (req, res) => {
   try {
     const blob = new Blob();
     const writeStream = createBlobWriteStream(blob);
 
     req.pipe(writeStream);
 
     writeStream.on('finish', () => {
       res.status(200).json({ success: true, url: blob.dataURL });
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, error: 'Ошибка загрузки файла' });
   }
 });

 // Получение файла с сервера
 router.get('/:blobId', async (req, res) => {
   try {
     const blob = new Blob({ id: req.params.blobId });
     const readStream = createBlobReadStream(blob);
 
     readStream.pipe(res);
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, error: 'Ошибка получения файла' });
   }
 });


module.exports = router;