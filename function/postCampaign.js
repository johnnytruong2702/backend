// backend/functions/postCampaign.js
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// In-memory storage for simplicity; in a real app, use a database
const campaigns = [];

app.post('/postCampaign', (req, res) => {
  const { title, description, author } = req.body;
  if (!title || !description || !author) {
    return res.status(400).json({ error: 'Title, description, and author are required' });
  }
  const newCampaign = { id: campaigns.length + 1, title, description, author };
  campaigns.push(newCampaign);
  res.status(201).json({ message: 'Campaign posted successfully', campaign: newCampaign });
});

module.exports.handler = serverless(app);
