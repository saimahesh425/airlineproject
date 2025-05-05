// routes/airportRoutes.js
const express = require('express');
const router = express.Router();
const Airport = require('../models/Airport');

// GET all airports
router.get('/', async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching airports', error: err.message });
  }
});

// GET single airport by ID
router.get('/:id', async (req, res) => {
  try {
    const airport = await Airport.findOne({ airport_id: req.params.id });
    if (!airport) return res.status(404).json({ message: 'Airport not found' });
    res.json(airport);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching airport', error: err.message });
  }
});

// POST create airport
router.post('/', async (req, res) => {
  try {
    const { airport_id, name, city, iata_code, icao_code, runways, terminals } = req.body;
    const newAirport = new Airport({ airport_id, name, city, iata_code, icao_code, runways, terminals });
    const saved = await newAirport.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error creating airport', error: err.message });
  }
});

// PUT update airport by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Airport.findOneAndUpdate(
      { airport_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Airport not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating airport', error: err.message });
  }
});

// DELETE airport by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Airport.findOneAndDelete({ airport_id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Airport not found' });
    res.json({ message: 'Airport deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting airport', error: err.message });
  }
});

module.exports = router;