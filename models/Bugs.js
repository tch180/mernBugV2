const mongoose = require('mongoose');

const BugsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minlength: 144 },
  status: { type: String, default: 'Submitted' },
  severity: { type: String, default: 'Medium' },
});

module.exports = Bugs = mongoose.model('bug', BugsSchema);
