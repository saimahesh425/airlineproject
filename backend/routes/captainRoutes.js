// routes/captainRoutes.js
const express = require('express');
const router = express.Router();
const CrewAssignment = require('../models/CrewAssignment');
const Flight = require('../models/Flight');

router.get('/assigned/:crewId', async (req, res) => {
  const crewId = req.params.crewId;
  const assigns = await CrewAssignment.find({ crew_member_id: crewId });
  const flightNums = assigns.map(a => a.flight_number);
  const flights = await Flight.find({ flight_number: { $in: flightNums } });
  const result = flights.map(f => {
    const { role } = assigns.find(a => a.flight_number === f.flight_number) || {};
    return { ...f._doc, role };
  });
  res.json(result);
});


module.exports = router;
