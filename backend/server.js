const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
    origin: '*', // Allow all origins for MVP - Update this in production for security!
    credentials: true
}));

// Components-based Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database Connection (Optimized for Serverless)
// Vercel functions are stateless, so we need to cache the connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hustlehub';
let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const dbOptions = {
            serverSelectionTimeoutMS: 5000,
            dbName: 'hustlehub' // Ensure we use the correct DB
        };

        await mongoose.connect(MONGO_URI, dbOptions);
        isConnected = true;
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        // On Vercel, we can't really fallback to in-memory easily since it clears on restart
        // But for local dev it might still be useful, though complicating the logic.
        // For MVP simplicity, we'll stick to real Mongo or fail.
    }
};

// Connect to DB on every request (Vercel caches the connection efficiently)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Default Route
app.get('/', (req, res) => {
    res.send('HustleHub Backend is Running');
});

// ⚠️ ONLY listen if running locally (not in Vercel)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;
