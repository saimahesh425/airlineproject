// routes/cancelRequests.js
const express = require('express');
const router = express.Router();
const CancelRequest = require('../models/CancelRequest');
const Booking = require('../models/Booking');

// POST: User submits cancel request
router.post('/', async (req, res) => {
  try {
    const request = new CancelRequest({ booking_id: req.body.booking_id });
    await request.save();
    res.status(201).json({ message: 'Request submitted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit request' });
  }
});

// GET: Admin fetches pending requests
router.get('/pending', async (req, res) => {
  const pending = await CancelRequest.find({ status: 'Pending' });
  res.json(pending);
});

// PUT: Admin approves/rejects
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const request = await CancelRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });

    // Optional: update booking status if approved
    if (status === 'Approved') {
      await Booking.findOneAndUpdate({ booking_id: request.booking_id }, { booking_status: 'Canceled' });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

module.exports = router;
