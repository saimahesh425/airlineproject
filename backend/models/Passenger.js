// // models/Passenger.js
// const mongoose = require('mongoose');

// const PassengerSchema = new mongoose.Schema({
//   passenger_id: {
//     type: String,
//     unique: true
//   },
//   passport_number: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   contact: {
//     phone: { type: String, required: true },
//     email: { type: String, required: true }
//   },
//   frequent_flyer_status: {
//     type: String,
//     enum: ['None', 'Silver', 'Gold'],
//     default: 'None'
//   },
//   address: String,
//   // NEW: store a bcrypt‐hashed password
//   password: {
//     type: String,
//     required: true
//   }
// });

// // Auto‐hash password whenever it's set/modified
// PassengerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model('Passenger', PassengerSchema);


// models/Passenger.js
// const mongoose = require('mongoose');
// const bcrypt   = require('bcryptjs');

// const PassengerSchema = new mongoose.Schema({
//   passenger_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   contact: {
//     phone: { type: String, required: true },
//     email: { type: String, required: true, unique: true }
//   },
//   passport_number: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   frequent_flyer_status: {
//     type: String,
//     enum: ['None', 'Silver', 'Gold'],
//     default: 'None'
//   },
//   address: {
//     type: String,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// // Auto‐hash password whenever it’s new or modified
// PassengerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model('Passenger', PassengerSchema);


const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const PassengerSchema = new mongoose.Schema({
  passenger_id:    { type: String, required: true, unique: true },
  name:            { type: String, required: true },
  contact: {
    phone:         { type: String, required: true },
    email:         { type: String, required: true, unique: true }
  },
  passport_number: { type: String, required: true, unique: true },
  password:        { type: String, required: true },
  frequent_flyer_status: {
    type: String, enum: ['None','Silver','Gold'], default: 'None'
  },
  address:         { type: String, default: '' }
}, { timestamps: true });

PassengerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Passenger', PassengerSchema);
