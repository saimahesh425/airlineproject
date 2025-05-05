const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// ✅ Create a payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
