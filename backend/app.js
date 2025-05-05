// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const airlineAuthRoutes = require('./routes/airlineAuthRoutes');
// const crewDashboardRoutes = require('./routes/crewDashboardRoutes');
// const cancelRequestRoutes = require('./routes/cancelRequests');
// const rescheduleRequestRoutes = require('./routes/rescheduleRequests');

// require('dotenv').config();

// const app = express();

// // Connect DB
// connectDB();

// app.use(cors());
// app.use(express.json());

// // Route placeholders
// app.use('/api/passengers', require('./routes/passengerRoutes'));
// app.use('/api/flights', require('./routes/flightRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/crew', require('./routes/crewRoutes'));
// app.use('/api/boarding-passes', require('./routes/boardingRoutes'));
// app.use('/api/crew-auth', require('./routes/crewAuthRoutes'));
// app.use('/api/airlines', airlineAuthRoutes);
// app.use('/api/crew-dashboard', crewDashboardRoutes);
// app.use('/api/captains', require('./routes/captainRoutes'));
// app.use('/api/cancel-requests', cancelRequestRoutes);
// app.use('/api/reschedule-requests', rescheduleRequestRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// server.js

require('dotenv').config();             // 1) Load .env at the very top
const express = require('express');
const cors    = require('cors');

const connectDB = require('./config/db'); // your DB connection helper

// route handlers
const passengerRoutes       = require('./routes/passengerRoutes');
const flightRoutes          = require('./routes/flightRoutes');
const bookingRoutes         = require('./routes/bookingRoutes');
const paymentRoutes         = require('./routes/paymentRoutes');
const crewRoutes            = require('./routes/crewRoutes');
const boardingPassRoutes    = require('./routes/boardingRoutes');
const crewAuthRoutes        = require('./routes/crewAuthRoutes');
const captainRoutes         = require('./routes/captainRoutes');
const airlineAuthRoutes     = require('./routes/airlineAuthRoutes');
const crewDashboardRoutes   = require('./routes/crewDashboardRoutes');
const cancelRequestRoutes   = require('./routes/cancelRequests');
const rescheduleRequestRoutes = require('./routes/rescheduleRequests');

const app = express();

// 2) Connect to MongoDB — config/db.js should call mongoose.connect(process.env.MONGO_URI)
connectDB();

// Core middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/passengers',       passengerRoutes);
app.use('/api/flights',          flightRoutes);
app.use('/api/bookings',         bookingRoutes);
app.use('/api/payments',         paymentRoutes);
app.use('/api/crew',             crewRoutes);
app.use('/api/boarding-passes',  boardingPassRoutes);

app.use('/api/crew-auth',        crewAuthRoutes);
app.use('/api/airlines',         airlineAuthRoutes);
app.use('/api/crew-dashboard',   crewDashboardRoutes);
app.use('/api/captains',         captainRoutes);

app.use('/api/cancel-requests',    cancelRequestRoutes);
app.use('/api/reschedule-requests', rescheduleRequestRoutes);
app.use('/api/airports', require('./routes/airportRoutes'));
app.use('/api/crew', crewRoutes);
app.use('/api/crew-dashboard', crewDashboardRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
