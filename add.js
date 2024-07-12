// backend/src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const campaignRoutes = require('./routes/campaignRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(bodyParser.json());

// Middleware to simulate user login and set req.user
app.use((req, res, next) => {
  req.user = { username: 'testUser', role: 'user' }; // Simulate logged-in user
  next();
});

// Use the routes
app.use('/.netlify/functions/api', campaignRoutes);
app.use('/.netlify/functions/api/auth', authRoutes);

module.exports.handler = serverless(app);
