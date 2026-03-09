const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const querySanitizer = require('../middleware/querySanitizer');

router.post('/execute', querySanitizer, queryController.executeQuery);

module.exports = router;
