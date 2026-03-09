const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  query: { type: String, required: true },
  wasCorrect: { type: Boolean, default: false },
  executedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attempt', attemptSchema);
