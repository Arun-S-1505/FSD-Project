# E-commerce Backend API

A Node.js backend for an e-commerce application with MongoDB Atlas integration and Fake Store API integration.

## Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: Fetch products from Fake Store API
- **Order Management**: Create and manage user orders with order history
- **MongoDB Atlas Integration**: Store user credentials and orders
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Error Handling**: Comprehensive error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory based on `.env.example`:

```env
NODE_ENV=development
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Fake Store API
FAKE_STORE_API=https://fakestoreapi.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs during development)
5. Get your connection string and replace the placeholders in the `.env` file

### 4. Start the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products

- `GET /api/products` - Get all products from Fake Store API
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/categories/all` - Get all categories

### Orders

- `POST /api/orders` - Create a new order (protected)
- `GET /api/orders` - Get user's order history (protected)
- `GET /api/orders/:id` - Get single order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (protected)

### Health Check

- `GET /health` - Server health check

## Request Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Order

```bash
POST /api/orders
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "image": "image-url",
      "category": "electronics",
      "quantity": 2
    }
  ],
  "total": 59.98,
  "shippingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, State 12345"
  }
}
```

## Data Models

### User

- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- isActive: Boolean (default: true)
- timestamps: createdAt, updatedAt

### Order

- userId: ObjectId (ref to User)
- items: Array of products with quantities
- total: Number (required)
- status: String (pending, processing, shipped, delivered, cancelled)
- shippingAddress: Object (name, email, address)
- paymentStatus: String (pending, paid, failed)
- timestamps: createdAt, updatedAt

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Helmet for security headers
- CORS configuration
- Rate limiting
- Input validation
- Error handling

## Development

For development, the server uses nodemon for auto-restart on file changes:

```bash
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update CORS origins to include your production frontend URL
3. Use a secure JWT secret
4. Configure proper MongoDB Atlas network access
5. Set up proper logging and monitoring

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Success Responses

All successful API responses follow this format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...}
}
```
