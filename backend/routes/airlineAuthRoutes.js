const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Airline = require('../models/Airline');

// POST /api/airlines/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const airline = await Airline.findOne({ email });
    if (!airline) return res.status(404).json({ message: 'Airline not found' });

    const isMatch = await bcrypt.compare(password, airline.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // For now we just return airline info (you can later add JWT if needed)
    res.status(200).json({
      message: 'Login successful',
      airline: {
        id: airline._id,
        name: airline.name,
        email: airline.email,
        airline_code: airline.airline_code
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

module.exports = router;
