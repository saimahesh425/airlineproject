const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  passenger_passport_number: {
    type: String,
    required: true,
    ref: 'Passenger'
  },
  flight_number: {
    type: String,
    required: true
  },
  seat_number: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true,
    enum: ['economy', 'business', 'first']
  },
  booking_status: {
    type: String,
    default: 'Confirmed'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
