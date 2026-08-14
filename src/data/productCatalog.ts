export interface ServerProduct {
  id: string;
  title: string;
  priceInCents: number; // Price in cents (e.g. 5495 = €54,95)
  stripeProductId?: string;
}

/**
 * Server-side source of truth for book catalog and prices.
 * Do NOT trust prices sent from the client.
 */
export const PRODUCT_CATALOG: Record<string, ServerProduct> = {
  'kiezen-voor-de-liefde': {
    id: 'kiezen-voor-de-liefde',
    title: 'Kiezen voor de liefde',
    priceInCents: 5495,
    stripeProductId: 'prod_UvYhpZbowCRWbH',
  },
  'een-gelukkig-mens': {
    id: 'een-gelukkig-mens',
    title: 'Een gelukkig mens en andere geheimen',
    priceInCents: 6495,
    stripeProductId: 'prod_UvYcfDkI9yKuV0',
  },
  'het-plan': {
    id: 'het-plan',
    title: 'Het plan',
    priceInCents: 3495,
    stripeProductId: 'prod_UvYcJK7nDIJpFJ',
  },
  'blijmoed': {
    id: 'blijmoed',
    title: 'Blijmoed',
    priceInCents: 3495,
    stripeProductId: 'prod_UvYjSSHNqwCbd0',
  },
  'diep-in-u': {
    id: 'diep-in-u',
    title: 'Diep in U',
    priceInCents: 3995,
    stripeProductId: 'prod_UvYk3H8IW5Ph0d',
  },
  'maar-eerst-zullen-we-kinderen-zijn': {
    id: 'maar-eerst-zullen-we-kinderen-zijn',
    title: 'Maar eerst zullen we kinderen zijn',
    priceInCents: 3495,
    stripeProductId: 'prod_UvYmjd1CGxvAH1',
  },
  'het-was-een-mooie-dag': {
    id: 'het-was-een-mooie-dag',
    title: 'Het was een mooie dag',
    priceInCents: 2995,
    stripeProductId: 'prod_UvYnOyORGmzcIj',
  },
};

/**
 * Helper to look up product by ID or Stripe product ID.
 */
export function getProductFromCatalog(identifier: string): ServerProduct | undefined {
  if (!identifier || typeof identifier !== 'string') return undefined;

  // Direct ID lookup
  if (PRODUCT_CATALOG[identifier]) {
    return PRODUCT_CATALOG[identifier];
  }

  // Stripe Product ID lookup
  return Object.values(PRODUCT_CATALOG).find(
    (product) => product.stripeProductId === identifier
  );
}
