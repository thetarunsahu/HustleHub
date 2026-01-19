const express = require('express');
const router = express.Router();
const { registerUser, loginUser, firebaseSync, updateProfile } = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/firebase', firebaseSync);
router.put('/profile', protect, updateProfile); // NEW

module.exports = router;
