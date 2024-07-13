// backend/src/models/Campaign.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;

