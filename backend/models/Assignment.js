const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  question: { type: String, required: true },
  
  sampleTables: [
    {
      tableName: String,
      columns: [
        {
          columnName: String,
          dataType: String  
        }
      ],
      rows: [] // Flexible Mixed Type Array
    }
  ],

  expectedOutput: {
    type: { type: String }, 
    value: mongoose.Schema.Types.Mixed 
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
