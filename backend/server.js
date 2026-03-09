require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/mongodb');

const assignmentRoutes = require('./routes/assignments');
const queryRoutes = require('./routes/query');
const hintRoutes = require('./routes/hints');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hints', hintRoutes);

app.get('/', (req, res) => {
  res.send('CipherSQLStudio API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
