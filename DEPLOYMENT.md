# Portfolio Deployment Guide - Cloudflare

## Prerequisites
- Cloudflare account with a custom domain
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

## Step 1: Install Dependencies

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Install project dependencies
cd Portfolio-Frontend
npm install
cd ..
```

## Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

## Step 3: Update Your Data

Before deploying, update the sample data in `api/index.js` with your actual:
- Work experience
- Projects
- Tech stack

## Step 4: Update API URL

After deploying, update the API URL in `Portfolio-Frontend/src/config/config.js`:
```javascript
production: {
  apiUrl: 'https://your-actual-worker-url.workers.dev/api'
}
```

## Step 5: Deploy

### Option A: Using the deployment script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option B: Manual deployment
```bash
# Build the frontend
cd Portfolio-Frontend
npm run build
cd ..

# Deploy frontend to Cloudflare Pages
wrangler pages deploy Portfolio-Frontend/build --project-name=portfolio-project

# Deploy the API worker
cd api
wrangler deploy --name portfolio-api
cd ..
```

## Step 6: Configure Custom Domain

1. Go to Cloudflare Dashboard
2. Navigate to Pages
3. Select your project
4. Go to Custom domains
5. Add your domain
6. Update DNS settings if needed

## Step 7: Environment Variables (Optional)

If you need to add environment variables:
1. Go to Cloudflare Dashboard
2. Navigate to Pages > Your Project > Settings
3. Add environment variables under "Environment variables"

## Troubleshooting

### Common Issues:
1. **CORS errors**: The API worker includes CORS headers
2. **404 errors**: Check that the `_redirects` file is in the build folder
3. **API not working**: Verify the API worker is deployed and accessible

### Testing Locally:
```bash
# Test the API worker locally
cd api
wrangler dev
cd ..

# Test the frontend locally
cd Portfolio-Frontend
npm start
```

## File Structure After Deployment

```
yourdomain.com/          # Frontend (React - Cloudflare Pages)
your-worker-url.workers.dev/api/*  # Backend (Cloudflare Workers)
```

## Performance Tips

1. Enable Cloudflare's CDN
2. Use Cloudflare's image optimization
3. Enable Brotli compression
4. Set up proper caching headers

## Monitoring

- Use Cloudflare Analytics to monitor traffic
- Set up uptime monitoring
- Monitor API response times

## Security

- Enable Cloudflare's security features
- Set up rate limiting if needed
- Use HTTPS (enabled by default on Cloudflare) 