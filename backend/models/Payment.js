const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  payment_id: { type: String, required: true, unique: true },
  booking_id: String,
  amount: Number,
  currency: { type: String, default: "USD" },
  payment_method: { type: String, enum: ['Credit Card', 'Debit Card', 'PayPal'] },
  payment_status: { type: String, enum: ['Completed', 'Pending', 'Refunded'], default: 'Completed' }
});

module.exports = mongoose.model('Payment', PaymentSchema);
