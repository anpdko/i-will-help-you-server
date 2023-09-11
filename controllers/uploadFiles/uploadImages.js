const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const imagesDir = path.join(__dirname, "../", "../", "static", "images");

const uploadImage = async (req, res) => {
  const { path: tempDir, originalname } = req.file;
  const files = await fs.readdir(imagesDir, { withFileTypes: true });
  const directories = files
    .filter((file) => file.isDirectory())
    .map((directory) => directory.name);
  for await (const directory of directories) {
    if (originalname.includes(directory)) {
      const saveDir = path.join(imagesDir, `${directory}`, originalname);
      await sharp(tempDir)
        .toFormat("webp")
        .toFile(
          path.join(
            imagesDir,
            `${directory}`,
            `${path.parse(originalname).name}.webp`
          )
        );
      await fs.rename(tempDir, saveDir);
      const imageURL = path.join(
        "static",
        "images",
        `${directory}`,
        originalname
      );

      const imageWebpUrl = path.join(
        "static",
        "images",
        `${directory}`,
        `${path.parse(originalname).name}.webp`
      );

      res.status(201).json({ data: { imageURL, imageWebpUrl } });
      return;
    }
  }
  const saveDir = path.join(imagesDir, originalname);
  await sharp(tempDir)
    .toFormat("webp")
    .toFile(path.join(imagesDir, `${path.parse(originalname).name}.webp`));
  await fs.rename(tempDir, saveDir);
  const imageURL = path.join("static", "images", originalname);
  const imageWebpUrl = path.join(
    "static",
    "images",
    `${path.parse(originalname).name}.webp`
  );
  res.status(201).json({ data: { imageURL, imageWebpUrl } });
};

module.exports = uploadImage;
