// // routes/passengerRoutes.js

// const express = require('express');
// const router = express.Router();
// const Passenger = require('../models/Passenger');

// // Helper to generate a new passenger_id
// const generatePassengerId = async () => {
//   const last = await Passenger.findOne().sort({ _id: -1 });
//   const lastNum = last?.passenger_id
//     ? parseInt(last.passenger_id.substring(1), 10)
//     : 10000;
//   return `P${lastNum + 1}`;
// };

// // POST: Register new passenger
// router.post('/', async (req, res) => {
//   try {
//     const passenger_id = await generatePassengerId();
//     const { name, contact, passport_number, frequent_flyer_status, address } = req.body;

//     const newPassenger = new Passenger({
//       passenger_id,
//       name,
//       contact,
//       passport_number,
//       frequent_flyer_status,
//       address
//     });

//     const saved = await newPassenger.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error('Passenger creation error:', err);
//     res.status(400).json({ message: 'Failed to create passenger', error: err.message });
//   }
// });

// // GET: All passengers
// router.get('/', async (req, res) => {
//   try {
//     const passengers = await Passenger.find();
//     res.json(passengers);
//   } catch (err) {
//     console.error('Error fetching passengers:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// });

// // GET: Single passenger by passport_number
// router.get('/:id', async (req, res) => {
//   try {
//     const passenger = await Passenger.findOne({ passport_number: req.params.id });
//     if (!passenger) {
//       return res.status(404).json({ message: 'Passenger not found' });
//     }
//     res.json(passenger);
//   } catch (err) {
//     console.error('Error fetching passenger:', err);
//     res.status(500).json({ message: 'Internal server error', error: err.message });
//   }
// });

// // PUT: Update passenger by passport_number
// // routes/passengerRoutes.js

// router.put('/:id', async (req, res) => {
//   try {
//     // Build a flat `$set` so we don't wipe out subfields
//     const updates = {};

//     if (req.body.address !== undefined) {
//       updates.address = req.body.address;
//     }
//     if (req.body.contact) {
//       if (req.body.contact.phone !== undefined) {
//         updates['contact.phone'] = req.body.contact.phone;
//       }
//       if (req.body.contact.email !== undefined) {
//         updates['contact.email'] = req.body.contact.email;
//       }
//     }

//     const updatedPassenger = await Passenger.findOneAndUpdate(
//       { passport_number: req.params.id },
//       { $set: updates },
//       { new: true }
//     );

//     if (!updatedPassenger) {
//       return res.status(404).json({ message: 'Passenger not found' });
//     }
//     res.json(updatedPassenger);
//   } catch (err) {
//     console.error('Error updating passenger:', err);
//     res.status(500).json({ message: 'Failed to update passenger', error: err.message });
//   }
// });


// module.exports = router;


// routes/passengerRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Passenger = require('../models/Passenger');

// Helper to generate a new passenger_id
const generatePassengerId = async () => {
  const last = await Passenger.findOne().sort({ _id: -1 });
  const lastNum = last?.passenger_id
    ? parseInt(last.passenger_id.substring(1), 10)
    : 10000;
  return `P${lastNum + 1}`;
};

// POST: Register new passenger (now with password)
// router.post('/', async (req, res) => {
//   try {
//     const passenger_id = await generatePassengerId();
//     const {
//       name,
//       contact,
//       passport_number,
//       frequent_flyer_status,
//       address,
//       password
//     } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newPassenger = new Passenger({
//       passenger_id,
//       name,
//       contact,
//       passport_number,
//       frequent_flyer_status,
//       address,
//       password: hashedPassword
//     });

//     const saved = await newPassenger.save();
//     // never send back the hash
//     const { password: _, ...sanitized } = saved.toObject();
//     res.status(201).json(sanitized);
//   } catch (err) {
//     console.error('Passenger creation error:', err);
//     res.status(400).json({ message: 'Failed to create passenger', error: err.message });
//   }
// });

router.post('/', async (req, res) => {
  try {
    const passenger_id = await generatePassengerId();
    const {
      name, contact, passport_number,
      frequent_flyer_status, address, password
    } = req.body;

    // let the pre('save') hook hash it
    const newP = new Passenger({
      passenger_id,
      name,
      contact,
      passport_number,
      frequent_flyer_status,
      address,
      password
    });

    const saved = await newP.save();
    const { password: _, ...sanitized } = saved.toObject();
    res.status(201).json(sanitized);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create passenger', error: err.message });
  }
});

// GET: All passengers
router.get('/', async (req, res) => {
  try {
    const passengers = await Passenger.find().select('-password');
    res.json(passengers);
  } catch (err) {
    console.error('Error fetching passengers:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// GET: Single passenger by passport_number
router.get('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findOne({ passport_number: req.params.id }).select('-password');
    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.json(passenger);
  } catch (err) {
    console.error('Error fetching passenger:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// PUT: Update passenger by passport_number (now supports password update)
// router.put('/:id', async (req, res) => {
//   try {
//     // Build flat `$set` updates so we don't overwrite subfields
//     const updates = {};
//     if (req.body.address !== undefined) {
//       updates.address = req.body.address;
//     }
//     if (req.body.contact) {
//       if (req.body.contact.phone !== undefined) {
//         updates['contact.phone'] = req.body.contact.phone;
//       }
//       if (req.body.contact.email !== undefined) {
//         updates['contact.email'] = req.body.contact.email;
//       }
//     }
//     if (req.body.password) {
//       const hash = await bcrypt.hash(req.body.password, 10);
//       updates.password = hash;
//     }

//     const updatedPassenger = await Passenger.findOneAndUpdate(
//       { passport_number: req.params.id },
//       { $set: updates },
//       { new: true }
//     ).select('-password');

//     if (!updatedPassenger) {
//       return res.status(404).json({ message: 'Passenger not found' });
//     }
//     res.json(updatedPassenger);
//   } catch (err) {
//     console.error('Error updating passenger:', err);
//     res.status(500).json({ message: 'Failed to update passenger', error: err.message });
//   }
// });

router.put('/:id', async (req, res) => {
  try {
    const passenger = await Passenger.findOne({ passport_number: req.params.id });
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });

    // update fields
    if (req.body.address) passenger.address = req.body.address;
    if (req.body.contact?.phone) passenger.contact.phone = req.body.contact.phone;
    if (req.body.contact?.email) passenger.contact.email = req.body.contact.email;
    if (req.body.password) passenger.password = req.body.password;  // will trigger pre-save

    const updated = await passenger.save();
    const { password: _, ...sanitized } = updated.toObject();
    res.json(sanitized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update passenger', error: err.message });
  }
});


// at the bottom of routes/passengerRoutes.js, before module.exports

// POST /api/passengers/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // find by contact.email
    const passenger = await Passenger.findOne({ 'contact.email': email });
    if (!passenger) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, passenger.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // strip out password before sending
    const { password: _, ...sanitized } = passenger.toObject();
    res.json(sanitized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
});


module.exports = router;
