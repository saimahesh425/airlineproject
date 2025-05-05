const mongoose = require('mongoose');

const BoardingPassSchema = new mongoose.Schema({
  boarding_pass_id: { type: String, required: true, unique: true },
  booking_id: String,
  gate: String,
  boarding_time: Date,
  group: String,
  seat_number: String,
  passenger_id: String,
  flight_number: String
});

module.exports = mongoose.model('BoardingPass', BoardingPassSchema);
