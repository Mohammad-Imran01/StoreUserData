const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Added: You’re using it but didn’t import it
const userRoutes = require('./routes/public.routes');

const app = express();

// ==========================================
// 🌐 Middleware
// ==========================================
app.use(cors());
app.use(bodyParser.json());

// Optional: Basic request logger
// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.path}`);
//     next();
// });

// ==========================================
// 🚏 Routes
// ==========================================
app.use('/api/users', userRoutes);

// ==========================================
// 🔌 MongoDB Connection
// ==========================================
mongoose.connect('mongodb://localhost:27017/userTempDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected.'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

// ==========================================
// 🚀 Start Server
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
