const express = require('express');
const axios = require('axios');

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  console.log('Test route called');
  res.json({ success: true, message: 'Products route is working' });
});

// @route   GET /api/products
// @desc    Get all products from fake store API with fallback data
// @access  Public
router.get('/', async (req, res) => {
  console.log('Products endpoint called');
  
  // Fallback products data for when external API fails
  const fallbackProducts = [
    {
      id: 1,
      name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      category: "men's clothing"
    },
    {
      id: 2,
      name: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      category: "men's clothing"
    },
    {
      id: 3,
      name: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      category: "men's clothing"
    },
    {
      id: 4,
      name: "Mens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
      category: "men's clothing"
    },
    {
      id: 5,
      name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 6,
      name: "Solid Gold Petite Micropave",
      price: 168,
      description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States.",
      image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
      category: "jewelery"
    },
    {
      id: 7,
      name: "White Gold Plated Princess",
      price: 9.99,
      description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
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
      description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user's hardware configuration and operating system",
      image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      category: "electronics"
    },
    {
      id: 10,
      name: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
      price: 109,
      description: "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5 hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 11,
      name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III",
      price: 109,
      description: "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
      image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 12,
      name: "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
      price: 114,
      description: "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
      image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 13,
      name: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
      price: 599,
      description: "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 14,
      name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
      price: 999.99,
      description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
      image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      category: "electronics"
    },
    {
      id: 15,
      name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
      price: 56.99,
      description: "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      category: "women's clothing"
    },
    {
      id: 16,
      name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
      price: 29.95,
      description: "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
      image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      category: "women's clothing"
    },
    {
      id: 17,
      name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
      price: 39.99,
      description: "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
      image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      category: "women's clothing"
    },
    {
      id: 18,
      name: "MBJ Women's Solid Short Sleeve Boat Neck V",
      price: 9.85,
      description: "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
      image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      category: "women's clothing"
    },
    {
      id: 19,
      name: "Opna Women's Short Sleeve Moisture",
      price: 7.95,
      description: "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away from the skin, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
      image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
      category: "women's clothing"
    },
    {
      id: 20,
      name: "DANVOUY Womens T Shirt Casual Cotton Short",
      price: 12.99,
      description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
      category: "women's clothing"
    }
  ];

  try {
    // Try to fetch from external API first
    const apiUrl = process.env.FAKE_STORE_API || 'https://fakestoreapi.com';
    const fullUrl = `${apiUrl}/products`;
    console.log('Fetching from:', fullUrl);
    
    const response = await axios.get(fullUrl, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9'
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
      data: transformedProducts,
      source: 'external_api'
    });
  } catch (error) {
    console.error('Error fetching from external API:', error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error details:', error.response?.data);
    
    // Use fallback data when external API fails
    console.log('Using fallback products data');
    
    // Transform fallback data to match frontend interface
    const transformedFallbackProducts = fallbackProducts.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }));

    res.json({
      success: true,
      count: transformedFallbackProducts.length,
      data: transformedFallbackProducts,
      source: 'fallback_data',
      message: 'External API unavailable, using cached product data'
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
