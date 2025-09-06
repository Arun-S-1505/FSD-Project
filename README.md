# E-commerce Application - Monorepo Deployment Guide

This project contains both a React frontend and a Node.js/Express backend in a single repository, deployed separately on Vercel.

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

### Step 2: Deploy Backend on Vercel

1. **Go to Vercel.com** → New Project
2. **Import your repository**
3. **Configure for Backend:**
   - Project Name: `ecommerce-backend`
   - Framework: Other
   - **Root Directory: `backend`** ← This is key!
   - Build Command: leave empty
   - Output Directory: leave empty
   - Install Command: `npm install`

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3000
   ```

5. **Deploy** and note the URL (e.g., `https://ecommerce-backend-xxx.vercel.app`)

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
   VITE_API_BASE_URL=https://your-backend-url.vercel.app
   ```
   (Use the URL from Step 2)

5. **Deploy**

## Advantages of This Approach

✅ **Single Repository**: Easier to manage code changes
✅ **Separate Deployments**: Frontend and backend deploy independently
✅ **Independent Scaling**: Each service can scale separately
✅ **Environment Isolation**: Different environment variables for each
✅ **Easier Development**: All code in one place

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-app.vercel.app
```

### Backend (Set in Vercel Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
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

1. **Test backend:** Visit `https://your-backend-url.vercel.app/api/products`
2. **Test frontend:** Visit your frontend URL
3. **Test integration:** Ensure frontend can communicate with backend

Your monorepo is now ready for dual deployment on Vercel! 🚀
