const mongoose = require('mongoose');

const CrewAssignmentSchema = new mongoose.Schema({
  assignment_id: { type: String, required: true, unique: true },
  flight_number: String,
  crew_member_id: String,
  name: String,
  role: { type: String, enum: ['Pilot', 'Co-Pilot', 'Flight Attendant'] }
});

module.exports = mongoose.model('CrewAssignment', CrewAssignmentSchema);
