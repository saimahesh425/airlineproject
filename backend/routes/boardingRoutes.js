const express = require('express');
const router = express.Router();
const BoardingPass = require('../models/BoardingPass');

// ✅ Create a boarding pass
router.post('/', async (req, res) => {
  try {
    const boardingPass = new BoardingPass(req.body);
    const saved = await boardingPass.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all boarding passes
router.get('/', async (req, res) => {
  try {
    const passes = await BoardingPass.find();
    res.json(passes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/passenger/:passport_number', async (req, res) => {
  try {
    // We assume you stored the passenger's passport number in `passenger_id`
    const passes = await BoardingPass.find({ passenger_id: req.params.passport_number });
    return res.json(passes);
  } catch (err) {
    console.error('Error fetching boarding passes:', err);
    return res.status(500).json({ message: 'Failed to fetch boarding passes' });
  }
});
module.exports = router;
