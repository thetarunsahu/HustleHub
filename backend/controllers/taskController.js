const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private (Student/Client)
const getTasks = async (req, res) => {
    try {
        // Populate user info (name, email) for the postedBy field
        const tasks = await Task.find().populate('postedBy', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private (Client only)
const createTask = async (req, res) => {
    try {
        const { title, description, budget, deadline } = req.body;

        if (!title || !description || !budget || !deadline) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const task = await Task.create({
            title,
            description,
            budget,
            deadline,
            postedBy: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    getTasks,
    createTask,
};
