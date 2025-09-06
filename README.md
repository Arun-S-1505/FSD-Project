# E-commerce Application - Monorepo Deployment Guide

This project contains both a React frontend and a Node.js/Express backend in a single repository, deployed separately on Vercel and Render.

## 🚀 Live Deployment

**Frontend (Vercel):** https://ecommerce-frontend-ps6h8rbd2-arun-saravanans-projects.vercel.app/

**Backend (Render):** https://ecommerce-backend-66nc.onrender.com/

## Project Structure

```
├── src/                    # React frontend source code
├── backend/               # Node.js backend source code
├── package.json          # Frontend dependencies
├── backend/package.json  # Backend dependencies
├── vercel.json           # Frontend Vercel configuration
└── backend/vercel.json   # Backend Vercel configuration
```

## Single Repository, Dual Deployment Strategy

### Step 1: Push to GitHub

1. **Create a single GitHub repository:**
   ```bash
   # If you haven't already, add your GitHub repository
   git remote add origin https://github.com/YOUR_USERNAME/ecommerce-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy Backend on Render

1. **Go to Render.com** → New Web Service
2. **Import your repository**
3. **Configure for Backend:**

   - Project Name: `ecommerce-backend`
   - Environment: Node
   - **Root Directory: `backend`** ← This is key!
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables:**

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-here
   FAKE_STORE_API=https://fakestoreapi.com
   FRONTEND_URL=https://your-frontend-vercel-url.vercel.app
   ```

5. **Deploy** and note the URL (e.g., `https://ecommerce-backend-66nc.onrender.com`)

### Step 3: Deploy Frontend on Vercel

1. **Go to Vercel.com** → New Project
2. **Import the SAME repository again**
3. **Configure for Frontend:**

   - Project Name: `ecommerce-frontend`
   - Framework: Vite
   - **Root Directory: `./` (leave empty)** ← This deploys from root
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variable:**

   ```
   VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
   ```

   (Use the URL from Step 2)

5. **Deploy**

## Advantages of This Approach

✅ **Single Repository**: Easier to manage code changes
✅ **Separate Deployments**: Frontend and backend deploy independently  
✅ **Independent Scaling**: Each service can scale separately
✅ **Environment Isolation**: Different environment variables for each
✅ **Easier Development**: All code in one place
✅ **Backend on Render**: Better suited for Express.js applications
✅ **Frontend on Vercel**: Optimized for React/Vite applications

## Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=https://ecommerce-backend-66nc.onrender.com
```

### Backend (Set in Render Dashboard)

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your-super-secret-jwt-key
FAKE_STORE_API=https://fakestoreapi.com
FRONTEND_URL=https://ecommerce-frontend-ps6h8rbd2-arun-saravanans-projects.vercel.app
```

## Local Development

**Frontend:**

```bash
npm install
npm run dev
```

**Backend:**

```bash
cd backend
npm install
npm run dev
```

## Testing the Deployment

1. **Test backend:** Visit `https://ecommerce-backend-66nc.onrender.com/api/products`
2. **Test frontend:** Visit `https://ecommerce-frontend-ps6h8rbd2-arun-saravanans-projects.vercel.app/`
3. **Test integration:** Ensure frontend can communicate with backend

Your monorepo is now ready for dual deployment on Vercel and Render! 🚀
