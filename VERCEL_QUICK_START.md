# Rayeva AI - Quick Vercel Deployment Checklist

## ✅ Pre-Deployment Setup (Do This First)

### 1. Create MongoDB Atlas Database
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create free cluster (M0)
- [ ] Create database user (remember username & password)
- [ ] Add IP 0.0.0.0/0 to Network Access
- [ ] Copy connection string: `mongodb+srv://user:pass@cluster.mongodb.net/rayeva-ai?retryWrites=true&w=majority`

### 2. Prepare Your Code
- [ ] Verify all files are committed to Git
- [ ] Push to GitHub (`git push origin main`)
- [ ] Check that `.env` files are NOT committed (should be in .gitignore)

---

## 🚀 Deploy to Vercel (Choose ONE method)

### Option A: Vercel Dashboard (Easiest)
1. [ ] Go to https://vercel.com
2. [ ] Click "New Project"
3. [ ] Select your GitHub repository
4. [ ] Accept default settings (Vercel auto-detects from vercel.json)
5. [ ] Click "Deploy"
6. [ ] **Skip this step, go to Step 3 below**

### Option B: Vercel CLI
```bash
npm install -g vercel
cd c:\Users\vedan\Rayeva-Ecommerce
vercel
```
- [ ] Select "Create new project"
- [ ] Confirm project name
- [ ] Confirm build settings

---

## 🔧 Step 3: Add Environment Variables

**After deployment starts**, before it finishes:

1. [ ] Go to your Vercel project dashboard
2. [ ] Click **Settings** → **Environment Variables**
3. [ ] Add variable **MONGODB_URI**:
   - Name: `MONGODB_URI`
   - Value: (Your MongoDB Atlas connection string)
   - Select: Production, Preview, Development
   - Click Save
4. [ ] (Optional) Add **GEMINI_API_KEY** if using AI features
5. [ ] Vercel will automatically redeploy with these variables

---

## ✅ Verify Deployment

### Test API (Should return JSON)
```
https://[your-project].vercel.app/api/
```

### Test Products (Should return product list)
```
https://[your-project].vercel.app/api/products
```

### Test Frontend
```
https://[your-project].vercel.app/
```

---

## 📋 Files Modified for Vercel

The following files were updated to support Vercel deployment:

1. **vercel.json** - Deployment configuration updated
2. **api/index.js** - Added dotenv support, CORS, error handling
3. **frontend/src/services/api.js** - Added environment variable support
4. **frontend/package.json** - Added proxy for local dev
5. **.gitignore** - Updated to prevent committing .env files
6. **.env.example** - Template for environment variables

---

## 🆘 If Deployment Fails

### Check Vercel Build Logs
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click latest deployment
4. Go to "Logs" tab
5. Look for error messages

### Common Issues & Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module 'dotenv'` | Run: `cd api && npm install` locally, then push to Git |
| `MongoDB connection error` | Add MONGODB_URI to Vercel Environment Variables |
| `CORS errors` | Check that your MongoDB URI is set correctly |
| `Cannot GET /products` | API didn't start - check Vercel logs |
| `Blank page on frontend` | Check browser console for errors, verify API is running |

---

## 🎯 Success Indicators

After deployment, you should see:
- ✅ Homepage loads with React app
- ✅ Products page displays product list
- ✅ API health check passes
- ✅ No CORS errors in browser console
- ✅ MongoDB connection successful (check Vercel logs)

---

## 📚 Full Documentation

See **VERCEL_DEPLOYMENT.md** for detailed information on:
- Architecture overview
- Troubleshooting guide
- Custom domain setup
- Local development
- Auto-redeployment

---

## 🔄 Common Next Steps

After successful deployment:
1. Test all pages and features
2. Create admin panel (if needed)
3. Set up custom domain
4. Enable analytics
5. Configure backups

---

**Your live app will be at:**
```
https://[your-project-name].vercel.app
```

**Questions?** Check the Vercel documentation: https://vercel.com/docs
