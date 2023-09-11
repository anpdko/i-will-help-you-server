const express = require("express");

const router = express.Router();

const { uploadImage } = require("../controllers/uploadFiles");
const { controllerWrapper } = require("../helpers");
const { upload } = require("../middleware/file.middeleware");

router.post("/", upload.single("image"), controllerWrapper(uploadImage));

module.exports = router;
