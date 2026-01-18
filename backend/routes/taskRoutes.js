const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Get all tasks - accessible to authenticated users
router.get('/', protect, getTasks);

// Create task - accessible only to clients
router.post('/', protect, authorize('client'), createTask);

module.exports = router;
