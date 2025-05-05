// models/Airport.js
const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
  airport_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  iata_code: { type: String, required: true, unique: true },
  icao_code: { type: String, unique: true },
  runways: { type: Number, default: 1 },
  terminals: { type: Number, default: 1 }
});

module.exports = mongoose.model('Airport', AirportSchema);