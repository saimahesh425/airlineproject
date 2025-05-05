// routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight  = require('../models/Flight');

// ✅ Create a booking and update flight seat count with validation and remove booked seat
router.post('/', async (req, res) => {
  try {
    const flight = await Flight.findOne({ flight_number: req.body.flight_number });
    if (!flight || flight.total_seats <= 0) {
      return res.status(400).json({ message: 'No seats available for this flight' });
    }

    const seatClass = req.body.class?.toLowerCase();
    const seatNumber = req.body.seat_number;

    // Check availability
    if (!flight.available_seats[seatClass]?.includes(seatNumber)) {
      return res.status(400).json({ message: 'Selected seat is not available' });
    }

    // Build booking
    const bookingData = {
      booking_id: req.body.booking_id,
      passenger_passport_number: req.body.passenger_passport_number,
      flight_number: req.body.flight_number,
      seat_number: req.body.seat_number,
      class: req.body.class,
      booking_status: 'Confirmed'
    };

    const booking = new Booking(bookingData);
    const savedBooking = await booking.save();

    // Update flight seat counts
    await Flight.updateOne(
      { flight_number: req.body.flight_number },
      {
        $inc: { total_seats: -1 },
        $pull: { [`available_seats.${seatClass}`]: seatNumber }
      }
    );

    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all bookings for a passenger (always returns an array)
router.get('/passenger/:passport_number', async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger_passport_number: req.params.passport_number });
    // Return [] if none found, never a 404
    return res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// ✅ Request a reschedule (marks it Pending)
router.put('/reschedule/:bookingId', async (req, res) => {
  const { newFlightNumber, newSeatNumber, newClass } = req.body;
  try {
    const booking = await Booking.findOne({ booking_id: req.params.bookingId });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.pending_reschedule = { newFlightNumber, newSeatNumber, newClass };
    booking.booking_status = 'Reschedule Requested';
    await booking.save();

    res.json({ message: 'Reschedule request sent. Awaiting airline approval.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Approve a reschedule (Airline only)
router.put('/reschedule/approve/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ booking_id: req.params.bookingId });
    if (!booking || !booking.pending_reschedule) {
      return res.status(404).json({ message: 'No reschedule request found' });
    }

    const { newFlightNumber, newSeatNumber, newClass } = booking.pending_reschedule;
    booking.flight_number   = newFlightNumber;
    booking.seat_number     = newSeatNumber;
    booking.class           = newClass;
    booking.booking_status  = 'Rescheduled';
    booking.pending_reschedule = null;
    await booking.save();

    // Update the new flight’s seats
    await Flight.updateOne(
      { flight_number: newFlightNumber },
      {
        $pull: { [`available_seats.${newClass.toLowerCase()}`]: newSeatNumber },
        $inc:  { total_seats: -1 }
      }
    );

    res.json({ message: 'Booking rescheduled successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve reschedule', error: err.message });
  }
});

// ✅ Confirm booking (used by your PayPal onApprove)
router.put('/:bookingId/confirm', async (req, res) => {
  try {
    const updatedBooking = await Booking.findOneAndUpdate(
      { booking_id: req.params.bookingId },
      { booking_status: 'Confirmed' },
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
