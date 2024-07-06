const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('../routes/users');
const helloRoutes = require('../routes/hello');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/hello', helloRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = app;
module.exports.handler = serverless(app);