const mongoose = require('mongoose');
const Flight = require('./models/Flight'); // Adjust path if needed

mongoose.connect('mongodb://localhost:27017/airlineDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB ✅');

  const newFlight = new Flight({
    flight_number: 'TEST1001',
    flight_name: 'Dreamliner 787',
    source: 'Kansas City',
    destination: 'Chicago',
    airline_name: 'Seed Airlines',
    departure_time: new Date('2025-04-25T10:00:00Z'),
    arrival_time: new Date('2025-04-25T12:30:00Z'),
    departure_terminal: 'T1',
    arrival_terminal: 'T2',
    total_seats: 60,
    added_by_airline: 'seed-admin-1',
    available_seats: {
      economy: Array.from({ length: 30 }, (_, i) => `E${i + 1}`),
      business: Array.from({ length: 10 }, (_, i) => `B${i + 1}`),
      first: Array.from({ length: 20 }, (_, i) => `F${i + 1}`)
    }
  });

  await newFlight.save();
  console.log('✅ Flight seeded successfully');
  mongoose.connection.close();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
