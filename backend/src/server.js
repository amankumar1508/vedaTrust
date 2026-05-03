const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Route Files
const auth = require('./routes/authRoutes');
const verify = require('./routes/verificationRoutes');
const pharmacy = require('./routes/pharmacyRoutes');
const prescription = require('./routes/prescriptionRoutes');

const http = require('http');
const socketService = require('./services/socketService');

const app = express();
const path = require('path');
const fs = require('fs');

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middlewares
app.use(cors());
app.use(express.json());


// Set static folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/verify', verify);
app.use('/api/pharmacies', pharmacy);
app.use('/api/prescriptions', prescription);

// Error Handler Middleware (MUST be after routes)
app.use(errorHandler);

// Routes Placeholder
app.get('/', (req, res) => {
    res.json({ message: "VedaTrust API is running..." });
});

const PORT = process.env.PORT || 5000;

// Create HTTP Server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io
socketService.init(server);

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port http://localhost:${PORT}`);
});
