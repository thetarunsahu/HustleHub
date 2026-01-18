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

// Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hustlehub';

console.log(`Connecting to MongoDB at ${MONGO_URI}...`);

mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('✅ Connected to MongoDB (Local/Atlas)');
        startServer();
    })
    .catch(async (err) => {
        console.error('❌ Local MongoDB Connection Failed:', err.message);
        console.log('🔄 Attempting to start in-memory database for MVP...');

        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();

            await mongoose.connect(uri);
            console.log('✅ Connected to In-Memory MongoDB');
            console.log('📝 Note: Data will be lost when server restarts');
            startServer();
        } catch (memErr) {
            console.error('❌ In-Memory DB Failed:', memErr.message);
            console.log('⚠️  Starting server in OFFLINE mode');
            startServer();
        }
    });

function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

// Default Route
app.get('/', (req, res) => {
    res.send('HustleHub Backend is Running');
});
