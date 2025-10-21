const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // await mongoose.connect("mongodb://localhost:27017/foodwithreels");
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
