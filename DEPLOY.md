# Deploying Secret of Games to Cloudflare Pages

This guide walks you through deploying the Secret of Games application to **Cloudflare Pages** using GitHub Git integration, with serverless API functions for Stripe Checkout.

---

## 📋 Build & Project Configuration Summary

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Functions Directory**: `functions` (Cloudflare Pages automatically detects files inside `functions/`)
- **Compatibility Flag**: `nodejs_compat` (configured in `wrangler.toml`)

---

## 🚀 Step 1: Push Project to GitHub

1. Initialize git and commit all files if you haven't already:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Cloudflare Pages deployment"
   ```
2. Create a new repository on [GitHub](https://github.com/new).
3. Connect your local repository and push:
   ```bash
   git remote add origin git@github.com:YOUR_USER/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

## ⚡ Step 2: Create Cloudflare Pages Project

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account and select your repository.
4. Configure build settings:
   - **Project Name**: `secretofgames` (or your preferred domain prefix)
   - **Production Branch**: `main`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: Leave blank (`/`)

---

## 🔑 Step 3: Configure Environment Variables

In Cloudflare Pages, go to **Settings** -> **Environment variables** (Add to both **Production** and **Preview** environments):

| Variable Name | Description | Example Value |
|---|---|---|
| `STRIPE_SECRET_KEY` | Stripe Secret Key (**Required**) | `sk_test_51...` or `sk_live_51...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_...` |
| `SHIPPING_RATE_ID` | Stripe Shipping Rate ID | `shr_1TvhlTJKRoSezgT6lCmYqqdN` |
| `SUCCESS_URL` | Redirect after successful checkout | `https://secretofgames.com?success=true` |
| `CANCEL_URL` | Redirect when checkout is canceled | `https://secretofgames.com?canceled=true` |
| `NODE_VERSION` | Recommended Node runtime version | `20` |

*Note: Never expose secret keys in client-side code. All Stripe secret operations execute strictly inside Cloudflare Pages Functions (`/api/*`).*

---

## 🔔 Step 4: Configure Stripe Webhook Endpoint

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/) -> **Developers** -> **Webhooks**.
2. Click **Add endpoint**.
3. Set **Endpoint URL** to:
   ```text
   https://YOUR-PAGES-SUBDOMAIN.pages.dev/api/webhooks/stripe
   ```
   *(or `https://secretofgames.com/api/webhooks/stripe` if using a custom domain)*
4. Select event to listen to:
   - `checkout.session.completed`
5. Click **Add endpoint**.
6. Copy the **Signing secret** (`whsec_...`) and save it as `STRIPE_WEBHOOK_SECRET` in your Cloudflare Pages environment variables.

---

## 🧪 Step 5: Testing in Test Mode vs Going Live

### Test Mode
1. Ensure `STRIPE_SECRET_KEY` starts with `sk_test_`.
2. Open your deployed Cloudflare site, add a book to the cart, and click **Afrekenen**.
3. Use a test credit card (e.g., `4242 4242 4242 4242`) or iDEAL test bank in Stripe Checkout.
4. Verify you are redirected back to the success URL.

### Local Development with Cloudflare Wrangler (Optional)
To test Cloudflare Functions locally:
```bash
# Create local secret environment file
cp .env.example .dev.vars

# Run wrangler pages dev
npx wrangler pages dev . --live-reload
```

### Going Live
1. Replace `STRIPE_SECRET_KEY` with your live key (`sk_live_...`).
2. Replace `STRIPE_WEBHOOK_SECRET` with your live webhook secret.
3. Verify product IDs (`prod_...`) match your live Stripe catalog.
