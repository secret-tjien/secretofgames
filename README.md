# Voltare — Boeken & Zelfhulp

An interactive webshop for books by Theije Twijnstra, built with React, Vite, Tailwind CSS, and Stripe Checkout.

## 🚀 Deployment

This project is configured for deployment on **Cloudflare Pages** with serverless Pages Functions for Stripe Checkout sessions and webhooks.

For complete step-by-step instructions on deploying to Cloudflare Pages via GitHub, see [DEPLOY.md](./DEPLOY.md).

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs on `http://localhost:3000`.

## 📦 Build

```bash
npm run build
```
Generates static assets in `dist/`.
