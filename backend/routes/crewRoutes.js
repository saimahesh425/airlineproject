const express = require('express');
const router = express.Router();
const CrewAssignment = require('../models/CrewAssignment');

// ✅ Create a crew assignment
router.post('/bulk-assign', async (req, res) => {
  try {
    const { flight_number, assignments } = req.body;

    const bulk = assignments.map(member => ({
      ...member,
      flight_number
    }));

    const created = await CrewAssignment.insertMany(bulk);
    res.status(201).json({ message: 'Crew assigned', created });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning crew', error: err.message });
  }
});


// ✅ Get all crew assignments
router.get('/by-flight/:flight_number', async (req, res) => {
  try {
    const crew = await CrewAssignment.find({ flight_number: req.params.flight_number });
    res.json(crew);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching crew for flight' });
  }
});


module.exports = router;
