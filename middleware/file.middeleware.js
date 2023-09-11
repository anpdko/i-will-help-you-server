const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: function (req, file, cb) {
    cb(
      null,
      (file.originalname = `${new Date().toISOString().replace(/:/g, "-")}-${
        file.originalname
      }`)
    );
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = { upload };
