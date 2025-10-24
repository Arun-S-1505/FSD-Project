const { Sequelize } = require('sequelize');

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    // Skip database connection if using placeholder credentials
    if (process.env.DB_USER && 
        !process.env.DB_USER.includes('your-username') && 
        process.env.DB_PASSWORD !== undefined) {
      await sequelize.authenticate();
      console.log('MySQL Connected successfully');
    } else {
      console.log('MySQL connection skipped - update DB_USER and DB_PASSWORD in .env with real credentials');
      console.log('Products API will still work using Fake Store API');
    }
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
    console.log('Continuing without MySQL - some features may not work');
  }
};

module.exports = { sequelize, connectDB };
