# Vercel Deployment Guide for Rayeva AI

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub account with your repository
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Under "Network Access", add your IP and allow access from anywhere (0.0.0.0/0)
4. Under "Database Access", create a database user with a strong password
5. Click "Connect" and copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/rayeva-ai?retryWrites=true&w=majority`
6. Replace `username` and `password` with your credentials

---

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project root
cd c:\Users\vedan\Rayeva-Ecommerce

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new one
# - Set project name: rayeva-ecommerce (or your preference)
# - Confirm framework (Vercel should auto-detect)
```

### Option B: Using GitHub + Vercel Web UI

1. Push your repository to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will auto-detect the configuration
6. Click "Deploy"

---

## Step 3: Add Environment Variables

### Via Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add the following variables:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your MongoDB connection string from Atlas |
| `GEMINI_API_KEY` | (Optional) Your Gemini API key |
| `NODE_ENV` | `production` |

**Important:** Set environment to `Production`, `Preview`, and `Development`

### Via `vercel.json` (Already Configured):

The `vercel.json` file is already set up with environment variable references:
- `MONGODB_URI=@mongodb_uri`
- `GEMINI_API_KEY=@gemini_api_key`

You must set these in the Vercel dashboard.

---

## Step 4: Verify Deployment

After deployment completes:

1. **Test API Endpoint:**
   ```
   https://your-project-name.vercel.app/api/
   ```
   Should return: `{ "message": "Rayeva AI Sustainable Commerce Platform API", "status": "ok" }`

2. **Test Frontend:**
   ```
   https://your-project-name.vercel.app/
   ```
   Should load the Rayeva AI homepage

3. **Test Products API:**
   ```
   https://your-project-name.vercel.app/api/products
   ```
   Should return a JSON array of products

---

## Step 5: Configure Production Domain (Optional)

1. Go to Vercel project "Settings" → "Domains"
2. Add your custom domain (if you have one)
3. Follow Vercel's DNS setup instructions

---

## Local Development Setup

Before pushing to Vercel, test locally:

```bash
# Backend
cd api
npm install
# Create .env file with: MONGODB_URI=your_connection_string
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm start
```

The frontend will proxy API calls to `http://localhost:3001` via Webpack Dev Server.

---

## Troubleshooting

### "MongoDB connection error"
- Check that `MONGODB_URI` is set in Vercel Environment Variables
- Verify MongoDB Atlas allows connections from Vercel IPs (0.0.0.0/0)
- Check connection string format

### "Cannot find module 'dotenv'"
- Ensure `dotenv` is in `api/package.json` dependencies
- Run `npm install` in the api folder

### "Products not loading"
- Check browser console for CORS errors
- Verify API is responding: Visit `/api/` endpoint
- Check Vercel function logs in dashboard

### "React Router not working"
- The `_redirects` file in `frontend/public/` should already handle this
- All routes should reload correctly

---

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Vercel (Your Domain)            │
├─────────────────────────────────────────┤
│  Frontend (React Build)                 │
│  - Served from: /                       │
│  - Build path: frontend/build           │
├─────────────────────────────────────────┤
│  API (Serverless Functions)             │
│  - Served from: /api/*                  │
│  - Handler: api/index.js                │
├─────────────────────────────────────────┤
│  ↓ (Network Request)                    │
├─────────────────────────────────────────┤
│    MongoDB Atlas (Cloud Database)       │
│    Connected via MONGODB_URI env var    │
└─────────────────────────────────────────┘
```

---

## Auto-Redeployment

Your project will automatically redeploy when you:
- Push to the connected GitHub branch (main/master by default)
- Update environment variables
- Modify deployment settings

---

## Next Steps

1. ✅ Ensure `MONGODB_URI` is set in Vercel dashboard
2. ✅ Deploy using `vercel deploy` or GitHub integration
3. ✅ Test all API endpoints
4. ✅ Monitor logs in Vercel dashboard
5. ✅ Set up custom domain (optional)

For more help: https://vercel.com/docs
