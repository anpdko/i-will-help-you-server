const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    default: "foto.png",
    required: true
  },
  publisher: {
    type: Boolean,
    default: true
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

module.exports = Reviews = mongoose.model('reviews', ReviewsSchema);