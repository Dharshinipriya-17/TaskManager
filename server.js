const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');dotenv.config();connectDB();
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
