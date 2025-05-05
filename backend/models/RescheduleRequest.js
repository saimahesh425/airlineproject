// models/RescheduleRequest.js
const mongoose = require('mongoose');

const RescheduleRequestSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true
  },
  new_flight_number: {
    type: String,
    required: true
  },
  new_seat_number: {
    type: String,
    required: true
  },
  new_class: {
    type: String,
    required: true,
    enum: ['economy', 'business', 'first']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected']
  },
  submitted_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RescheduleRequest', RescheduleRequestSchema);
