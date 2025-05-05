const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;



// // config/db.js

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI;
//     if (!uri) throw new Error('MONGO_URI not set in environment');

//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


// config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const uri = process.env.MONGO_URI;
//     if (!uri) throw new Error('MONGO_URI not set in environment');

//     // no more useNewUrlParser / useUnifiedTopology
//     await mongoose.connect(uri);

//     console.log('✅ MongoDB connected');
//   } catch (err) {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
