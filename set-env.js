#!/usr/bin/env node

// This script sets environment variables on Vercel using the REST API
const https = require('https');

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || 'your-token-here';
const PROJECT_ID = 'Rayeva-Ecommerce'; // or the actual project ID
const MONGODB_URI = 'mongodb+srv://vedant:vedop999@cluster0.iqit5sr.mongodb.net/rayeva-ai?retryWrites=true&w=majority';

// This is just for reference - the actual way would be through the Vercel dashboard or CLI with proper linking
