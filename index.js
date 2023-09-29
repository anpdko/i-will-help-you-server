require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const { PORT = 5000, URL_MONGO } = process.env;

//settings
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extensions: true }));
app.get("/", (req, res) => {
  res.send(`Server listening on port: ${PORT}`);
});

app.use("/static/documents", express.static(path.join(__dirname, "static/documents")));
app.use("/static/images", express.static(path.join(__dirname, "static/images")));

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.use("/api/admin", require("./routes/admin.route"));
app.use("/api/news", require("./routes/news.route"));
app.use("/api/reviews", require("./routes/reviews.route"));
app.use("/api/projects", require("./routes/projects.route"));
app.use("/api/readyneed", require("./routes/readyneed.route"));
app.use("/api/payment", require("./routes/payment.route"));
app.use("/api/needhelps", require("./routes/needhelps.route"));
app.use("/api/upload", require("./routes/upload.route"));
// app.use("/api/upload-image", require("./routes/uploadImage.route"));

app.use((res, req) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

const start = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

