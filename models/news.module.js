const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  publisher: {
    type: String
  },
  published_date: {
   type: Date,
   default: Date.now
 },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = News = mongoose.model('news', NewsSchema);