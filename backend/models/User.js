const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true, // Allow null for Phone Auth
        // Simple validation: check if email contains .edu or other specific domains could be added
        match: [/.+\..+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        sparse: true
    },
    uid: { // Firebase UID
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['student', 'client'],
        default: 'student',
    },
    name: {
        type: String,
        default: 'User'
    },
    photoURL: {
        type: String
    },
    skills: {
        type: [String],
        default: []
    },
    services: { // For slightly more detailed offerings
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: ''
    },
    college: {
        type: String,
        required: function () { return this.role === 'student'; }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
