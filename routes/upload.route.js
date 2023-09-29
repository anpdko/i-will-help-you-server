const express = require("express");
const router = express.Router();
const {
  Blob,
  createBlobReadStream,
  createBlobWriteStream,
} = require("@vercel/blob");

// Ваш токен для чтения и записи
const { BLOB_READ_WRITE_TOKEN } = process.env;

router.get("/read/:key", async (req, res) => {
  const { key } = req.params;

  try {
    const blobReadStream = createBlobReadStream({
      token: BLOB_READ_WRITE_TOKEN,
      key,
    });

    blobReadStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Произошла ошибка при чтении файла" });
  }
});

router.post("/write/:key", async (req, res) => {
  const { key } = req.params;
  const data = req.body;

  try {
    const blobWriteStream = createBlobWriteStream({
      token: BLOB_READ_WRITE_TOKEN,
      key,
    });

    blobWriteStream.end(data);

    blobWriteStream.on("finish", () => {
      res.status(200).json({ message: "Файл успешно записан" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Произошла ошибка при записи файла" });
  }
});

module.exports = router;
