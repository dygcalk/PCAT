const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
