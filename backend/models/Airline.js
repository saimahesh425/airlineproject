// models/Airline.js
const mongoose = require('mongoose');

const AirlineSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
  airline_code: String
});

module.exports = mongoose.model('Airline', AirlineSchema);
