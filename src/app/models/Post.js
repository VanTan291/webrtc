const mongoose = require('mongoose');

const postShema = new mongoose.Schema({
  user_id: { type: String },
  content: { type: String, default: null },
  file_url: { type: String, default: null },
  like: { type: Number, default: 0 },
  share: { type: Number, default: 0 },
  comment: { type: Number, default: 0 },
  type: { type: Number },
  status: { type: Number },
  date_create : { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Post', postShema);
