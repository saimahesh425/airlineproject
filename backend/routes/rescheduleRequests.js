const express = require('express');
const router = express.Router();
const RescheduleRequest = require('../models/RescheduleRequest');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// POST: Submit reschedule request
router.post('/', async (req, res) => {
  const { booking_id, new_flight_number, new_seat_number, new_class } = req.body;
  try {
    const request = new RescheduleRequest({ booking_id, new_flight_number, new_seat_number, new_class });
    await request.save();
    res.status(201).json({ message: 'Reschedule request submitted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit reschedule request' });
  }
});

// GET: Fetch all pending requests
router.get('/pending', async (req, res) => {
  try {
    const pending = await RescheduleRequest.find({ status: 'Pending' });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests' });
  }
});

// PUT: Approve/reject reschedule
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const request = await RescheduleRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (status === 'Approved') {
      await Booking.findOneAndUpdate(
        { booking_id: request.booking_id },
        {
          flight_number: request.new_flight_number,
          seat_number: request.new_seat_number,
          class: request.new_class,
          booking_status: 'Rescheduled'
        }
      );

      // Optionally, remove the seat from flight's available list
      await Flight.updateOne(
        { flight_number: request.new_flight_number },
        {
          $pull: { [`available_seats.${request.new_class.toLowerCase()}`]: request.new_seat_number },
          $inc: { total_seats: -1 }
        }
      );
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update request' });
  }
});

module.exports = router;
