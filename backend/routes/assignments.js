const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignmentById);

module.exports = router;
