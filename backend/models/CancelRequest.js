// model/CancelRequest.js
const mongoose = require('mongoose');
const CancelRequestSchema = new mongoose.Schema({
  booking_id: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});
module.exports = mongoose.model('CancelRequest', CancelRequestSchema);
