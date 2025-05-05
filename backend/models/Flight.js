const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flight_number:   { type: String, required: true, unique: true },
  flight_name:     String,
  source:          String,
  destination:     String,
  airline_name:    String,
  departure_time:  Date,
  arrival_time:    Date,
  departure_terminal: String,
  arrival_terminal:   String,
  total_seats:     Number,
  added_by_airline:String,

  available_seats: {
    economy:  [String],
    business: [String],
    first:    [String]
  }
});

module.exports = mongoose.model('Flight', FlightSchema);