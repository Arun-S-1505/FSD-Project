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
// @desc    Get all products (using local data as fallback)
// @access  Public
router.get('/', async (req, res) => {
  console.log('Products endpoint called');
  
  // Local products data as fallback
  const localProducts = [
    {
      id: 1,
      name: "Fjallraven Foldsack No. 1 Backpack",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve.",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      category: "men's clothing"
    },
    {
      id: 2,
      name: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight and soft fabric.",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      category: "men's clothing"
    },
    {
      id: 3,
      name: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring, Autumn, and Winter. Suitable for many occasions like working, hiking, camping.",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      category: "men's clothing"
    },
    {
      id: 4,
      name: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      category: "men's clothing"
    },
    {
      id: 5,
      name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 6,
      name: "Solid Gold Petite Micropave",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 7,
      name: "White Gold Plated Princess",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Perfect gifts for special occasions.",
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 8,
      name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,
      description: "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 9,
      name: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
      price: 64,
      description: "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity storage solution.",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      category: "electronics"
    },
    {
      id: 10,
      name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description: "Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance for typical PC workloads.",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 11,
      name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III",
      price: 109,
      description: "3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds for faster bootup and improved overall system performance.",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 12,
      name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description: "Expand your PS4 gaming experience. Play anywhere. Fast and easy setup. Sleek design with high capacity.",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      category: "electronics"
    }
  ];

  try {
    // Try to fetch from external API first
    const apiUrl = process.env.FAKE_STORE_API || 'https://fakestoreapi.com';
    const fullUrl = `${apiUrl}/products`;
    console.log('Attempting to fetch from external API:', fullUrl);
    
    const response = await axios.get(fullUrl, {
      timeout: 5000, // 5 second timeout
      headers: {
        'User-Agent': 'E-commerce-Backend/1.0'
      }
    });
    
    console.log('External API response status:', response.status);
    const products = response.data;
    console.log('External API products count:', products.length);

    // Transform the external API data
    const transformedProducts = products.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }));

    console.log('Successfully fetched from external API');
    res.json({
      success: true,
      count: transformedProducts.length,
      data: transformedProducts,
      source: 'external_api'
    });
    
  } catch (error) {
    console.error('External API failed, using local data:', error.message);
    
    // Return local products as fallback
    console.log('Using local products data as fallback');
    res.json({
      success: true,
      count: localProducts.length,
      data: localProducts,
      source: 'local_fallback',
      note: 'External API unavailable, using cached data'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.FAKE_STORE_API || 'https://fakestoreapi.com'}/products/${req.params.id}`);
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
    console.error('Error fetching product:', error.message);
    res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
});

module.exports = router;
