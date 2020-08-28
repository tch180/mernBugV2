const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: { type: String },
  author: { type: String },
  description: { type: String, minlength: 144 },
  date: { type: Date, default: Date.now },
});

module.exports = Articles = mongoose.model('article', ArticleSchema);
