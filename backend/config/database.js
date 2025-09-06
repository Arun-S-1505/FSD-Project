const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Skip MongoDB connection if using placeholder credentials
    if (process.env.MONGODB_URI && 
        !process.env.MONGODB_URI.includes('your-username') && 
        !process.env.MONGODB_URI.includes('your-password')) {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      console.log('MongoDB connection skipped - update MONGODB_URI in .env with real credentials');
      console.log('Products API will still work using Fake Store API');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Continuing without MongoDB - some features may not work');
  }
};

module.exports = connectDB;
