const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order items are required'
      });
    }

    if (!total || total <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid order total is required'
      });
    }

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.email || !shippingAddress.address) {
      return res.status(400).json({
        success: false,
        message: 'Complete shipping address is required'
      });
    }

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      items,
      total,
      shippingAddress,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Populate user details
    await order.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        id: order._id,
        userId: order.userId._id,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders (order history)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');

    const total = await Order.countDocuments({ userId: req.user._id });

    // Transform orders to match frontend interface
    const transformedOrders = orders.map(order => ({
      id: order._id,
      userId: order.userId._id,
      items: order.items,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      shippingAddress: order.shippingAddress
    }));

    res.json({
      success: true,
      count: transformedOrders.length,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data: transformedOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: order._id,
        userId: order.userId._id,
        items: order.items,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin functionality - for future use)
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        id: order._id,
        status: order.status,
        updatedAt: order.updatedAt
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
