const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignmentById);
router.post('/:id/start', assignmentController.startAssignment);
router.post('/:id/finish', assignmentController.finishAssignment);

module.exports = router;
