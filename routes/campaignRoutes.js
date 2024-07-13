// backend/src/routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const Campaign = require('../models/Campaign');

// Route to post a campaign by user or business owner
router.post('/', authorize(['user', 'businessOwner']), async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const newCampaign = new Campaign({ title, description, author });
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign posted successfully', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Failed to post campaign' });
  }
});

// Route to approve a campaign by admin
router.patch('/:id/approve', authorize('admin'), async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    campaign.status = 'approved';
    await campaign.save();
    res.status(200).json({ message: 'Campaign approved successfully', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve campaign' });
  }
});

// Route to get pending campaigns for admin
router.get('/pending', authorize('admin'), async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: 'pending' });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch campaigns' });
  }
});

module.exports = router;
