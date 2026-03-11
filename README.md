# Rayeva AI - Sustainable Commerce Platform

AI-powered platform for sustainable commerce with automated product tagging, B2B proposals, and impact reporting.

## 🎥 Demo Video


https://github.com/user-attachments/assets/9925de93-c92d-4f86-8f1b-05aeebfc0090


*If video is private, upload to Google Drive and share with link*

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
node seed.js
npm run dev

# Frontend
cd frontend
npm install
npm start
```

## 📱 Pages

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Products | http://localhost:3000/products |
| Add Product | http://localhost:3000/add-product |
| B2B Proposals | http://localhost:3000/b2b |
| Impact Dashboard | http://localhost:3000/impact |
| Data Viewer | http://localhost:3000/data |

## ✅ Modules Implemented

### Module 1: AI Auto-Category & Tag Generator
- Auto-assigns category and subcategory based on product keywords
- Generates 5-10 SEO tags
- Suggests sustainability filters (plastic-free, compostable, vegan, recycled)
- Stores in AILogs collection

**Example Output:**
```json
{
  "primary_category": "Personal Care",
  "subcategory": "Oral Hygiene",
  "seo_tags": ["bamboo toothbrush", "eco friendly", "plastic free", "biodegradable", "sustainable"],
  "sustainability_filters": ["plastic-free", "compostable", "vegan"]
}
```

### Module 2: AI B2B Proposal Generator
- Suggests sustainable product mix
- Budget allocation within limit
- Estimated cost breakdown
- Impact positioning summary
- Stores in B2BProposals collection

**Example Output:**
```json
{
  "recommendedProducts": [
    {"productName": "Bamboo Toothbrush", "quantity": 10, "estimatedCost": 89.90}
  ],
  "budgetAllocation": {"Personal Care": 30, "Accessories": 25, "Kitchen": 45},
  "impactPositioning": "This proposal aligns with your sustainability goals..."
}
```

### Module 3: AI Impact Reporting
- Calculates plastic saved (grams)
- Calculates carbon avoided (kg)
- Local sourcing impact summary
- Human-readable impact statement
- Stores with orders in ImpactReports collection

**Example Output:**
```json
{
  "plasticSavedGrams": 450,
  "carbonAvoidedKg": 1.2,
  "localSourcingImpact": "Products sourced from local sustainable suppliers",
  "impactStatement": "This order helped avoid approximately 450 grams of plastic waste."
}
```

## 📋 Future Module: WhatsApp Support Bot (Architecture)

**System Flow:**
```
Customer → WhatsApp → Meta API → Backend Webhook → AI Bot → Database → Response
```

**Capabilities:**
- Answer order status queries using real database data
- Handle return policy questions
- Escalate high-priority or refund-related issues to human agent
- Log AI conversations in AILogs collection

## 📊 Data Viewer

Visit `/data` to see:
- All products
- All orders
- All B2B proposals
- All impact reports
- All AI logs

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS (optimized, lightweight)
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **AI:** Deterministic keyword-based logic (no external API required)

## 📁 Project Structure

```
backend/
├── ai-services/     # AI modules (AI logic separation)
├── controllers/     # Business logic
├── models/          # Database models (Product, Order, B2BProposal, ImpactReport, AILog)
├── routes/          # API routes
└── services/        # Database services

frontend/
├── src/
│   ├── pages/       # Page components
│   └── services/    # API services
```

## ⚙️ Technical Implementation

| Requirement | Implementation |
|-------------|----------------|
| **Structured JSON outputs** | All AI modules return parsed JSON with exact format |
| **Prompt + response logging** | All AI interactions stored in AILogs collection with module name, prompt, response, timestamp |
| **Environment-based API keys** | `.env` file for PORT, MONGODB_URI, GEMINI_API_KEY (optional - not used in current implementation) |
| **AI/Business logic separation** | `ai-services/` folder contains all AI logic, `controllers/` contains business logic |
| **Error handling & validation** | Try/catch blocks in all async functions, input validation in controllers |

## 🏗️ System Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   API       │────▶│ Controllers │────▶│ AI Services │
│ (React)     │     │ (Express)   │     │ (Business)  │     │ (AI Logic)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                     │
                                                                     ▼
                                                              ┌─────────────┐
                                                              │  MongoDB    │
                                                              │  (Database) │
                                                              └─────────────┘
```

## 📝 AI Prompt Design

All AI modules use deterministic logic based on product keywords:
- Product name/description analysis
- Keyword-based category assignment
- Sustainability filter detection
- Impact calculation formulas

## 📦 Environment Variables

Create `.env` in backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rayeva-ai
GEMINI_API_KEY=your_api_key_here
```

## 🚀 Performance

- Optimized React components
- Lightweight Tailwind CSS
- No unnecessary packages
- Fast page load (< 3 seconds)
