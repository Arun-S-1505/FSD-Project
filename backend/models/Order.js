const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty(value) {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error('Order items are required');
        }
      }
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Total must be greater than 0'
      }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      notEmpty(value) {
        if (!value || !value.name || !value.email || !value.address) {
          throw new Error('Complete shipping address is required');
        }
      }
    }
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

// Define associations
Order.associate = (models) => {
  Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = Order;
