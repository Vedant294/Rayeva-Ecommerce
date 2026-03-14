# IMMEDIATE: Set MONGODB_URI in Vercel

## CRITICAL STEP

Your MongoDB connection string is ready:
```
mongodb+srv://vedant:vedop999@cluster0.iqit5sr.mongodb.net/rayeva-ai?retryWrites=true&w=majority
```

But it's **NOT IN VERCEL ENVIRONMENT** yet. That's why API returns 404.

---

## DO THIS RIGHT NOW (2 minutes)

### Go Here:
https://vercel.com/dashboard

### Click Your Project:
rayeva-eosin (or whatever it's called)

### Click Settings:
Top menu → Settings

### Click Environment Variables:
Left sidebar → Environment Variables

### Add the Variable:

**Field 1 - Name:**
```
MONGODB_URI
```

**Field 2 - Value:**
```
mongodb+srv://vedant:vedop999@cluster0.iqit5sr.mongodb.net/rayeva-ai?retryWrites=true&w=majority
```

**Field 3 - Environment:**
☑ Production
☑ Preview  
☑ Development

### Click SAVE

---

## What Happens Next:

1. You click SAVE
2. Vercel shows "Rebuilding..."
3. Wait 30-60 seconds
4. Deployment shows "Ready"
5. API starts working

---

## Test After Setting ENV VAR:

```powershell
curl https://rayeva-eosin.vercel.app/api/
```

Should return:
```json
{"message":"Rayeva AI Sustainable Commerce Platform API","status":"ok"}
```

---

## Then Test Products:

```powershell
curl https://rayeva-eosin.vercel.app/api/products
```

Should return JSON array of products.

---

**THIS IS THE MISSING PIECE.**

The code is correct (I just fixed it). But Vercel API needs the database connection string from environment variables.

**Go set MONGODB_URI in Vercel dashboard NOW.** 👆

Then come back and test.
