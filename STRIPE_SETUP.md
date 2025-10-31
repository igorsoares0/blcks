# Stripe Setup Guide for Blcks

This guide will walk you through setting up Stripe payments for the Blcks platform.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Access to Stripe Dashboard
- Access to your `.env` file

## Step 1: Get Stripe API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. Copy the following keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

4. Add them to your `.env` file:
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

⚠️ **Important**: Never commit your secret key to version control!

## Step 2: Create Products

You need to create two products in Stripe:

### Individual License

1. Go to **Products** in the Stripe Dashboard
2. Click **Add product**
3. Fill in the details:
   - **Name**: `Blcks Individual License`
   - **Description**: `Lifetime access to all 110 blocks for individual developers`
   - **Pricing model**: One-time
   - **Price**: `$49.00 USD`
4. Click **Save product**
5. Copy the **Product ID** (starts with `prod_`)
6. Copy the **Price ID** (starts with `price_`)

Add to `.env`:
```env
STRIPE_PRODUCT_INDIVIDUAL="prod_..."
STRIPE_PRICE_INDIVIDUAL="price_..."
```

### Team License

1. Click **Add product** again
2. Fill in the details:
   - **Name**: `Blcks Team License`
   - **Description**: `Lifetime access to all 110 blocks for up to 5 team members`
   - **Pricing model**: One-time
   - **Price**: `$149.00 USD`
3. Click **Save product**
4. Copy the **Product ID** (starts with `prod_`)
5. Copy the **Price ID** (starts with `price_`)

Add to `.env`:
```env
STRIPE_PRODUCT_TEAM="prod_..."
STRIPE_PRICE_TEAM="price_..."
```

## Step 3: Set Up Webhooks

Webhooks allow Stripe to notify your application when payments are completed.

### Create Webhook Endpoint

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your endpoint URL:
   - **Development**: Use Stripe CLI (see below)
   - **Production**: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `charge.refunded`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

Add to `.env`:
```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Testing Webhooks Locally (Development)

1. Install the Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
# Download from https://github.com/stripe/stripe-cli/releases
```

2. Authenticate:
```bash
stripe login
```

3. Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. The CLI will display a webhook signing secret. Add it to your `.env`:
```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## Step 4: Complete Environment Variables

Your final `.env` file should look like this:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/blcks"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Mailgun
MAILGUN_API_KEY="your-mailgun-api-key"
MAILGUN_DOMAIN="your-domain.com"
MAILGUN_FROM="Blcks <noreply@your-domain.com>"

# App
APP_URL="http://localhost:3000"
APP_NAME="Blcks"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_INDIVIDUAL="price_..."
STRIPE_PRICE_TEAM="price_..."
STRIPE_PRODUCT_INDIVIDUAL="prod_..."
STRIPE_PRODUCT_TEAM="prod_..."
```

## Step 5: Test the Integration

### Test Checkout Flow

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/pricing`

3. Click on one of the "Buy" buttons

4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Requires authentication**: `4000 0025 0000 3155`

5. Use any future expiry date (e.g., `12/34`)

6. Use any 3-digit CVC (e.g., `123`)

7. Use any valid billing postal code

### Test Webhooks

1. Make sure the Stripe CLI is running:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

2. Complete a test purchase

3. Check your console logs to see if the webhook was received

4. Check your database to verify the license was created

## Step 6: Production Deployment

When deploying to production:

### Update Environment Variables

1. Replace test API keys with live keys (start with `pk_live_` and `sk_live_`)
2. Update `APP_URL` to your production domain
3. Update `NEXTAUTH_URL` to your production domain

### Create Production Webhook

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Add a new endpoint with your production URL
3. Copy the new **Signing secret** and update your production environment

### Enable Live Mode

1. Toggle the "Test mode" switch in Stripe Dashboard to OFF
2. Create new products and prices in live mode
3. Update the product and price IDs in your production environment

## Troubleshooting

### "Stripe is not configured" Error

This means the price IDs are missing from your environment variables. Make sure you've added:
- `STRIPE_PRICE_INDIVIDUAL`
- `STRIPE_PRICE_TEAM`

### Webhooks Not Received

1. Check that Stripe CLI is running (`stripe listen`)
2. Verify the webhook secret matches your `.env` file
3. Check your endpoint URL is correct
4. Look at webhook logs in Stripe Dashboard

### "You already have an active license" Error

This is expected if you've already purchased a license. The system prevents duplicate purchases. To test again:
1. Use a different user account
2. Or manually delete the license from the database

### Checkout Session Not Created

1. Check that you're logged in
2. Verify all Stripe environment variables are set
3. Check the browser console for errors
4. Check server logs for detailed error messages

## Security Best Practices

✅ **DO**:
- Use environment variables for all keys
- Keep secret keys on the server only
- Verify webhook signatures
- Use HTTPS in production
- Enable live mode only when ready
- Monitor failed payments in Stripe Dashboard

❌ **DON'T**:
- Commit `.env` file to version control
- Share secret keys
- Use test keys in production
- Skip webhook signature verification
- Expose secret keys to the client

## Next Steps

After completing this setup:

1. ✅ Test the complete purchase flow (see `TESTING_WEBHOOKS.md` for detailed testing guide)
2. ✅ Webhook handler implemented (Phase 5 complete)
3. ⏳ Set up team invitations (Phase 6)
4. ✅ Email notifications configured
5. ⏳ Set up proper error monitoring

**📖 For detailed webhook testing instructions, see [TESTING_WEBHOOKS.md](./TESTING_WEBHOOKS.md)**

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

## Support

If you encounter issues:
1. Check Stripe Dashboard logs
2. Review server console logs
3. Consult Stripe documentation
4. Contact Stripe support

---

**Last updated**: 2025-01-21
