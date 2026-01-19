const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, college } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
            college: role === 'student' ? college : undefined
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// NEW: Sync Firebase User
const firebaseSync = async (req, res) => {
    try {
        const { uid, email, name, photoURL, phoneNumber, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ $or: [{ email }, { uid }, { phoneNumber }] });

        if (!user) {
            // Create new user
            user = new User({
                name: name || 'User',
                email: email,
                phoneNumber: phoneNumber,
                password: uid, // Use UID as dummy password
                uid: uid,
                role: role || 'student',
                photoURL
            });
            await user.save();
        } else {
            // Update existing user info
            if (!user.uid) user.uid = uid;
            if (photoURL) user.photoURL = photoURL;
            await user.save();
        }

        // Generate Token
        const token = generateToken(user._id, user.role);

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                college: user.college
            }
        });
    } catch (error) {
        console.error('Firebase Sync Error:', error);
        res.status(500).json({ message: 'Server Error during Sync' });
    }
};

// NEW: Update Profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.skills = req.body.skills || user.skills;
            user.college = req.body.college || user.college;
            user.bio = req.body.bio || user.bio;
            if (req.body.services) user.services = req.body.services;

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                skills: updatedUser.skills,
                college: updatedUser.college,
                bio: updatedUser.bio
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    firebaseSync,
    updateProfile
};
