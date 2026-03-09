const Assignment = require('../models/Assignment');

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().select('-expectedOutput -tables -question');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
