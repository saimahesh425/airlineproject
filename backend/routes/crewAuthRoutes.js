// routes/crewAuthRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const CrewMember = require('../models/CrewMember');

// Register Crew/Captain
router.post('/register', async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      role,
      password,
      address,
      date_of_birth,
      ssn
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new CrewMember({
      first_name,
      last_name,
      email,
      role,
      password: hashedPassword,
      address,
      date_of_birth,
      ssn,
      status: 'pending'
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration submitted. Awaiting admin approval.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// ✅ Login Crew/Captain
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await CrewMember.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.status !== 'active') return res.status(403).json({ message: 'Awaiting admin approval' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});

// ✅ Get Pending Crew (for Admin)
router.get('/pending', async (req, res) => {
  try {
    const pendingCrew = await CrewMember.find({ status: 'pending' });
    res.json(pendingCrew);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending crew', error: err.message });
  }
});

// ✅ Approve Crew
router.put('/approve/:id', async (req, res) => {
  try {
    await CrewMember.findByIdAndUpdate(req.params.id, { status: 'active' });
    res.json({ message: 'Crew approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Approval failed', error: err.message });
  }
});


// ✅ Get list of active/approved crew
router.get('/active', async (req, res) => {
    try {
      const activeCrew = await CrewMember.find({ status: 'active' });
      res.json(activeCrew);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch crew', error: err.message });
    }
  });


  // PUT /api/crew-auth/reject/:id
router.put('/reject/:id', async (req, res) => {
  try {
    await CrewMember.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ message: 'Crew rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Rejection failed', error: err.message });
  }
});


module.exports = router;
