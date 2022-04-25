const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  author: { type: Number, default: 1},
  name: { type: String, maxLength: 50 },
  email: { type: String, maxLength: 50 },
  password: { type: String, maxLength: 50 },
  date: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userShema);
