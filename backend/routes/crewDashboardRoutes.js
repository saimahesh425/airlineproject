// routes/crewDashboardRoutes.js
const express = require('express');
const router = express.Router();
const CrewAssignment = require('../models/CrewAssignment');
const Flight = require('../models/Flight');

router.get('/:crew_id', async (req, res) => {
  try {
    const crewId = req.params.crew_id;
    // lookup by crew_member_id (not crew_id)
    const assignments = await CrewAssignment.find({ crew_member_id: crewId });

    // Extract all flight_numbers
    const flightNumbers = assignments.map(a => a.flight_number);

    // Fetch those flights
    const flights = await Flight.find({ flight_number: { $in: flightNumbers } });

    // Merge the role from the assignment into each flight
    const result = flights.map(flight => {
      const asg = assignments.find(a => a.flight_number === flight.flight_number);
      return {
        ...flight._doc,
        role: asg ? asg.role : null
      };
    });

    res.json(result);
  } catch (err) {
    console.error('Error fetching assigned flights:', err);
    res.status(500).json({ message: 'Error fetching assigned flights' });
  }
});

module.exports = router;
