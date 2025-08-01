#!/bin/bash

echo "🚀 Starting deployment to Cloudflare..."

# Build the React frontend
echo "📦 Building React frontend..."
cd Portfolio-Frontend
npm install
npm run build
cd ..

# Deploy frontend to Cloudflare Pages
echo "🌐 Deploying frontend to Cloudflare Pages..."
npx wrangler pages deploy Portfolio-Frontend/build --project-name=portfolio-project

# Deploy API to Cloudflare Workers
echo "🔧 Deploying API to Cloudflare Workers..."
cd api
npx wrangler deploy --name portfolio-api
cd ..

echo "✅ Deployment complete!"
echo "🌍 Your frontend should be available at: https://portfolio-project.pages.dev"
echo "🔧 Your API should be available at: https://portfolio-api.your-subdomain.workers.dev"
echo "🔧 Don't forget to configure your custom domain in Cloudflare Dashboard!" 