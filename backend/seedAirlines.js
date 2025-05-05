const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Airline = require('./models/Airline');

mongoose.connect('mongodb://localhost:27017/airlineDB', { useNewUrlParser: true, useUnifiedTopology: true });

const airlines = [
  { name: 'Delta Airlines', email: 'delta@airline.com', password: 'delta123', airline_code: 'DL' },
  { name: 'United Airlines', email: 'united@airline.com', password: 'united123', airline_code: 'UA' },
  { name: 'American Airlines', email: 'american@airline.com', password: 'american123', airline_code: 'AA' },
  { name: 'Southwest Airlines', email: 'southwest@airline.com', password: 'southwest123', airline_code: 'SW' },
];

async function seedAirlines() {
  for (const airline of airlines) {
    const hashed = await bcrypt.hash(airline.password, 10);
    await Airline.create({ ...airline, password: hashed });
  }

  console.log('✅ Airlines inserted');
  mongoose.disconnect();
}

seedAirlines();
