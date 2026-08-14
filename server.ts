import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";
import { getProductFromCatalog } from "./src/data/productCatalog";

dotenv.config();

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2023-10-16" as any,
    });
  }
  return stripeClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Webhook raw parser
  app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secretKey || !webhookSecret) {
      return res.status(500).send("Stripe webhook configuration incomplete");
    }

    const signature = req.headers["stripe-signature"] as string;
    if (!signature) {
      return res.status(400).send("Missing stripe-signature header");
    }

    try {
      const stripe = getStripe();
      const event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`Payment succeeded for session ${session.id}. Customer email: ${session.customer_details?.email}`);
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Winkelwagen is leeg" });
      }

      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(500).json({
          error: "STRIPE_SECRET_KEY is niet ingesteld in omgevingsvariabelen.",
        });
      }

      const origin = req.headers.origin || (req.headers.referer ? new URL(req.headers.referer as string).origin : "http://localhost:3000");

      const lineItems = [];
      for (const item of items) {
        const productId = item.id || item.bookId || item.book?.id || item.book?.stripeProductId;
        if (!productId) {
          return res.status(400).json({ error: "Ongeldig product in winkelwagen" });
        }

        const product = getProductFromCatalog(productId);
        if (!product) {
          return res.status(400).json({ error: `Product '${productId}' is niet gevonden in de catalogus` });
        }

        const rawQuantity = Number(item.quantity);
        if (!Number.isInteger(rawQuantity) || rawQuantity < 1 || rawQuantity > 99) {
          return res.status(400).json({ error: "Ongeldig aantal voor product" });
        }

        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: product.title,
            },
            unit_amount: product.priceInCents,
          },
          quantity: rawQuantity,
        });
      }

      const stripe = getStripe();
      const successUrlEnv = process.env.SUCCESS_URL;
      const cancelUrlEnv = process.env.CANCEL_URL;

      const successUrl = successUrlEnv
        ? successUrlEnv.replace("{CHECKOUT_SESSION_ID}", "{CHECKOUT_SESSION_ID}")
        : `${origin}?success=true`;

      const cancelUrl = cancelUrlEnv || `${origin}?canceled=true`;
      const shippingRateId = process.env.SHIPPING_RATE_ID?.trim();

      const shippingOptions: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
        shippingRateId && shippingRateId.startsWith("shr_")
          ? [{ shipping_rate: shippingRateId }]
          : [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: {
                    amount: 595,
                    currency: "eur",
                  },
                  display_name: "Standaard verzending (NL & BE)",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 1 },
                    maximum: { unit: "business_day", value: 3 },
                  },
                },
              },
            ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "ideal"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        shipping_address_collection: {
          allowed_countries: ["NL", "BE", "DE"],
        },
        shipping_options: shippingOptions,
        phone_number_collection: {
          enabled: true,
        },
      });

      res.json({ url: session.url, sessionId: session.id });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
