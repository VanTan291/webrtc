const mongoose = require('mongoose');

const postShema = new mongoose.Schema({
  user_id: { type: Number },
  content: { type: String },
  image: { type: String },
  like: { type: Number },
  share: { type: Number },
  comment: { type: Number },
  video: { type: String },
  type: { type: Number },
  status: { type: Number },
  date_create : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Post', postShema);
