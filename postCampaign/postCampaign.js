// backend/functions/postCampaign.js
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const { getDb } = require('../src/mongoUtil');

const app = express();
app.use(bodyParser.json());

app.post('/postCampaign', async (req, res) => {
  const { title, description, author } = req.body;
  if (!title || !description || !author) {
    return res.status(400).json({ error: 'Title, description, and author are required' });
  }

  try {
    const db = await getDb();
    const campaignsCollection = db.collection('campaigns');
    const newCampaign = { title, description, author };
    const result = await campaignsCollection.insertOne(newCampaign);

    res.status(201).json({ message: 'Campaign posted successfully', campaign: result.ops[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to post campaign' });
  }
});

module.exports.handler = serverless(app);
