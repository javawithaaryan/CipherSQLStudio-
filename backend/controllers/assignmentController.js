const Assignment = require('../models/Assignment');
const UserProgress = require('../models/UserProgress');
const sandboxService = require('../services/sandboxService');

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().select('-expectedOutput -sampleTables');
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

exports.startAssignment = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });

    await sandboxService.createWorkspace(userId, assignment.sampleTables);

    res.json({ message: "Workspace created successfully" });
  } catch (err) {
    console.error("Error starting assignment:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.finishAssignment = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    await sandboxService.destroyWorkspace(userId);

    res.json({ message: "Workspace destroyed successfully" });
  } catch (err) {
    console.error("Error finishing assignment:", err);
    res.status(500).json({ error: err.message });
  }
};
