const express = require('express');
const router  = express.Router();
const Flight  = require('../models/Flight');

// GET all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

// GET flights by specific date
router.get('/by-date/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    const flights = await Flight.find({
      departure_time: { $gte: date, $lt: nextDay }
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching flights by date' });
  }
});

// POST create a new flight
router.post('/', async (req, res) => {
  try {
    const baseFlight = {
      ...req.body,
      available_seats: {
        economy: Array.from({ length: 30 }, (_, i) => `E${i + 1}`),
        business: Array.from({ length: 10 }, (_, i) => `B${i + 1}`),
        first:    Array.from({ length: 20 }, (_, i) => `F${i + 1}`)
      }
    };
    const flight = new Flight(baseFlight);
    const saved = await flight.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a flight
router.put('/:id', async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a flight
router.delete('/:id', async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flight deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;