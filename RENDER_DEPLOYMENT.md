# Render Deployment Guide

## Deploy Backend to Render

### 1. Prepare Your Repository

1. Create a new GitHub repository for your backend
2. Copy the `backend/` folder contents to the root of the new repository
3. Push to GitHub

### 2. Deploy on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure deployment:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier

### 3. Set Environment Variables

In Render dashboard, go to Environment section and add:

```
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_generated_jwt_secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
FAKE_STORE_API=https://fakestoreapi.com
FRONTEND_URL=https://ecommerce-frontend-cyan-phi.vercel.app
```

### 4. Get Your Deployment URL

After deployment, you'll get a URL like:
`https://ecommerce-backend-xxxx.onrender.com`

### 5. Update Frontend Environment Variable

Update your Vercel frontend environment variable:

- `VITE_API_BASE_URL=https://your-render-app-url.onrender.com`

## Alternative: Deploy Backend Folder Directly

If you want to deploy from the current monorepo:

1. In Render, set:

   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

2. This will deploy only the backend folder from your current repository.

## Testing

After deployment, test your backend:

- Visit: `https://your-app.onrender.com/api/test`
- Should return: `{"success": true, "message": "Backend API is working!"}`

## Important Notes

- Render free tier may have cold starts (app sleeps after 15 minutes of inactivity)
- First request after sleep may take 30-60 seconds
- For production, consider upgrading to a paid plan for better performance
