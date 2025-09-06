const express = require('express');
const axios = require('axios');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  console.log('Test route called');
  res.json({ success: true, message: 'Products route is working' });
});

// Mock products route for testing
router.get('/mock', (req, res) => {
  console.log('Mock products route called');
  const mockProducts = [
    {
      id: 1,
      name: "Test Product 1",
      price: 29.99,
      description: "This is a test product",
      image: "https://via.placeholder.com/300",
      category: "test"
    },
    {
      id: 2,
      name: "Test Product 2", 
      price: 49.99,
      description: "This is another test product",
      image: "https://via.placeholder.com/300",
      category: "test"
    }
  ];
  
  res.json({
    success: true,
    count: mockProducts.length,
    data: mockProducts
  });
});

// @route   GET /api/products
// @desc    Get all products from fake store API
// @access  Public
router.get('/', async (req, res) => {
  console.log('Products endpoint called');
  try {
    // Use environment variable or fallback to default URL
    const apiUrl = process.env.FAKE_STORE_API || 'https://fakestoreapi.com';
    const fullUrl = `${apiUrl}/products`;
    console.log('Fetching from:', fullUrl);
    console.log('Environment FAKE_STORE_API:', process.env.FAKE_STORE_API);
    
    const response = await axios.get(fullUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'E-commerce-Backend/1.0'
      }
    });
    console.log('Fake Store API response status:', response.status);
    const products = response.data;
    console.log('Raw products count:', products.length);

    // Transform the data to match our frontend interface
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }));

    console.log('Transformed products count:', transformedProducts.length);

    res.json({
      success: true,
      count: transformedProducts.length,
      data: transformedProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    console.error('Full error:', error);
    
    // More detailed error response
    let errorMessage = 'Error fetching products';
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Unable to connect to products API';
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timeout - products API took too long to respond';
    } else if (error.response) {
      errorMessage = `Products API error: ${error.response.status} ${error.response.statusText}`;
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${process.env.FAKE_STORE_API}/products/${id}`);
    const product = response.data;

    // Transform the data to match our frontend interface
    const transformedProduct = {
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    };

    res.json({
      success: true,
      data: transformedProduct
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.error('Error fetching product:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`${process.env.FAKE_STORE_API}/products/category/${category}`);
    const products = response.data;

    // Transform the data to match our frontend interface
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }));

    res.json({
      success: true,
      count: transformedProducts.length,
      data: transformedProducts
    });
  } catch (error) {
    console.error('Error fetching products by category:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching products by category'
    });
  }
});

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories/all', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.FAKE_STORE_API}/products/categories`);
    const categories = response.data;

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

module.exports = router;
