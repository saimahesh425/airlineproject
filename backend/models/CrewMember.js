// const mongoose = require('mongoose');

// const CrewMemberSchema = new mongoose.Schema({
//   crew_member_id: {
//     type: String,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   role: {
//     type: String,
//     enum: ['Pilot', 'Co-Pilot', 'Flight Attendant'],
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'active'],
//     default: 'pending'
//   }
// });

// // Auto-generate crew_member_id before saving
// CrewMemberSchema.pre('save', function (next) {
//   if (!this.crew_member_id) {
//     const prefix = this.role === 'Pilot' || this.role === 'Co-Pilot' ? 'CPT' : 'CRW';
//     this.crew_member_id = `${prefix}-${Date.now()}`;
//   }
//   next();
// });

// module.exports = mongoose.model('CrewMember', CrewMemberSchema);


// models/CrewMember.js
// models/CrewMember.js
const mongoose = require('mongoose');

function ageValidator(value) {
  const ageDifMs = Date.now() - value.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970) >= 21;
}

const CrewMemberSchema = new mongoose.Schema({
  crew_member_id: {
    type: String,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Pilot', 'Co-Pilot', 'Flight Attendant'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active'],
    default: 'pending'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip_code: {
      type: String,
      required: true
    }
  },
  date_of_birth: {
    type: Date,
    required: true,
    validate: {
      validator: ageValidator,
      message: 'Crew member must be at least 21 years old'
    }
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{3}-\d{2}-\d{4}$/, 'SSN must be in XXX-XX-XXXX format']
  }
});

// Auto-generate crew_member_id before saving
CrewMemberSchema.pre('save', function(next) {
  if (!this.crew_member_id) {
    const prefix = (this.role === 'Pilot' || this.role === 'Co-Pilot') ? 'CPT' : 'CRW';
    this.crew_member_id = `${prefix}-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model('CrewMember', CrewMemberSchema);