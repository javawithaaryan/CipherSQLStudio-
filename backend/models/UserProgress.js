const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  sqlQuery: { type: String },
  lastAttempt: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  attemptCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
