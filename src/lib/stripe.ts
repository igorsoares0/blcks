import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Product IDs - these will be set after creating products in Stripe Dashboard
export const STRIPE_PRODUCTS = {
  INDIVIDUAL: process.env.STRIPE_PRODUCT_INDIVIDUAL || '',
  TEAM: process.env.STRIPE_PRODUCT_TEAM || '',
};

// Price IDs - these will be set after creating prices in Stripe Dashboard
export const STRIPE_PRICES = {
  INDIVIDUAL: process.env.STRIPE_PRICE_INDIVIDUAL || '',
  TEAM: process.env.STRIPE_PRICE_TEAM || '',
};

export type PlanType = 'individual' | 'team';

export const PLAN_DETAILS = {
  individual: {
    name: 'Individual License',
    price: 4900, // $49 in cents
    priceId: STRIPE_PRICES.INDIVIDUAL,
    seats: 1,
  },
  team: {
    name: 'Team License',
    price: 14900, // $149 in cents
    priceId: STRIPE_PRICES.TEAM,
    seats: 5,
  },
} as const;
