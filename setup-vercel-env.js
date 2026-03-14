#!/usr/bin/env node

const https = require('https');

// Configuration
const MONGODB_URI = 'mongodb+srv://vedant:vedop999@cluster0.iqit5sr.mongodb.net/rayeva-ai?retryWrites=true&w=majority';
const PROJECT_NAME = 'rayeva';
const TEAM_ID = 'ved3';

// You need to set this from Vercel token
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;

if (!VERCEL_TOKEN) {
  console.error('ERROR: VERCEL_TOKEN environment variable not set');
  console.error('Please run: set VERCEL_TOKEN=<your-token>');
  process.exit(1);
}

async function setEnvironmentVariable() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      key: 'MONGODB_URI',
      value: MONGODB_URI,
      target: ['production', 'preview', 'development']
    });

    const options = {
      hostname: 'api.vercel.com',
      path: `/v9/projects/${PROJECT_NAME}/env?teamId=${TEAM_ID}`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          console.log('✅ MONGODB_URI environment variable set successfully!');
          console.log('Response:', JSON.parse(responseData));
          resolve();
        } else {
          console.error(`❌ Failed with status ${res.statusCode}`);
          console.error('Response:', responseData);
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

setEnvironmentVariable()
  .then(() => {
    console.log('\n✅ Deployment configuration complete!');
    console.log('Vercel will auto-rebuild your project with the new environment variable.');
    console.log('\nProject URL: https://vercel.com/ved3/rayeva');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to set environment variable:', error.message);
    process.exit(1);
  });
