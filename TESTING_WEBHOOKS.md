# Testing Stripe Webhooks Locally

This guide explains how to test the complete payment flow with Stripe webhooks on your local development environment.

## Prerequisites

- ✅ Completed Stripe setup (see `STRIPE_SETUP.md`)
- ✅ Stripe CLI installed
- ✅ All environment variables configured
- ✅ Local development server running

## Step 1: Start Your Development Server

```bash
npm run dev
```

Your app should be running on `http://localhost:3000`

## Step 2: Start Stripe CLI Webhook Forwarding

Open a **new terminal window** and run:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

You should see output like:
```
> Ready! You are using Stripe API Version [2024-11-20]. Your webhook signing secret is whsec_xxx (^C to quit)
```

⚠️ **Important**: Copy the webhook signing secret (`whsec_xxx`) and update your `.env` file:

```env
STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

Then restart your dev server for the new secret to take effect.

## Step 3: Complete Test Purchase Flow

### 3.1 Create Test Account

1. Go to `http://localhost:3000/auth/signup`
2. Create a test account (use a real email if you want to receive test emails)
3. Verify email if required
4. Log in

### 3.2 Navigate to Pricing

1. Go to `http://localhost:3000/pricing`
2. You should see two plans: Individual ($49) and Team ($149)

### 3.3 Start Checkout

1. Click "Buy Individual" or "Buy Team"
2. You'll be redirected to Stripe Checkout (hosted page)

### 3.4 Complete Payment with Test Card

Use Stripe test cards:

**Successful Payment:**
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any valid postal code

**Payment Declined:**
- Card number: `4000 0000 0000 0002`

**3D Secure Authentication Required:**
- Card number: `4000 0025 0000 3155`

### 3.5 Monitor Webhook Events

In the terminal where Stripe CLI is running, you should see:

```
<-  checkout.session.completed [evt_xxx]
```

This means the webhook was received and forwarded to your app.

### 3.6 Check Server Logs

In your dev server terminal, you should see:

```
Processing checkout.session.completed: cs_test_xxx
License created successfully: clxxxxx
Confirmation email sent to: user@example.com
```

### 3.7 Verify Success Page

After payment, you'll be redirected to:
```
http://localhost:3000/purchase/success?session_id=cs_test_xxx
```

You should see:
1. Loading spinner (while verifying)
2. Success message with checkmark
3. Welcome message
4. Links to browse blocks and dashboard

## Step 4: Verify License Was Created

### Check Database

Use Prisma Studio:
```bash
npx prisma studio
```

Navigate to the `License` table and verify:
- ✅ New record exists
- ✅ `userId` matches your test user
- ✅ `type` is "individual" or "team"
- ✅ `status` is "active"
- ✅ `stripePaymentId` matches the session ID

Check the `User` table:
- ✅ `hasActiveLicense` is `true`
- ✅ `licenseType` is "individual" or "team"

### Check UI

1. Go to homepage: `http://localhost:3000`
2. Premium banner should **not** be visible (only shown to users without license)
3. All block cards should show "✓ Premium" in green (not locked)
4. Click on any premium block - code should be visible (not blurred)

## Step 5: Test Refund Flow (Optional)

### 5.1 Create Refund in Stripe Dashboard

1. Go to [Stripe Dashboard → Payments](https://dashboard.stripe.com/test/payments)
2. Find your test payment
3. Click on it
4. Click "Refund payment"
5. Enter the amount and confirm

### 5.2 Monitor Webhook

Stripe CLI terminal should show:
```
<-  charge.refunded [evt_xxx]
```

Server logs should show:
```
Processing charge.refunded: ch_xxx
License deactivated: clxxxxx
Refund email sent to: user@example.com
```

### 5.3 Verify License Deactivation

Check Prisma Studio:
- `License.status` should be "refunded"
- `User.hasActiveLicense` should be `false`
- `User.licenseType` should be `null`

Check UI:
- Premium banner should reappear on homepage
- Premium blocks should show lock icon
- Clicking premium block shows blur + upgrade overlay

## Troubleshooting

### Webhook Not Received

**Issue**: Stripe CLI shows event sent, but nothing in server logs

**Solutions**:
1. Verify webhook endpoint is correct: `/api/webhooks/stripe`
2. Check Stripe CLI is forwarding to correct port (3000)
3. Restart dev server
4. Check for errors in dev server logs

### "Invalid signature" Error

**Issue**: Webhook returns 400 with "Invalid signature"

**Solutions**:
1. Copy the webhook secret from Stripe CLI output
2. Update `.env` with `STRIPE_WEBHOOK_SECRET="whsec_xxx"`
3. Restart dev server
4. Make sure you're using the secret from Stripe CLI, not Dashboard

### License Not Created

**Issue**: Webhook received but license not in database

**Solutions**:
1. Check server logs for detailed error messages
2. Verify database is running (`npx prisma studio`)
3. Check metadata is being passed correctly in checkout session
4. Verify user exists in database

### Email Not Sent

**Issue**: License created but no confirmation email

**Solutions**:
1. Check Mailgun configuration in `.env`
2. Check server logs for email errors
3. Verify Mailgun domain is verified
4. Check spam folder

### Success Page Shows Error

**Issue**: Redirected to success page but shows "Verification Error"

**Solutions**:
1. Check that webhook was processed (license created)
2. Verify session ID in URL is correct
3. Check browser console for errors
4. Try refreshing the page

## Testing Checklist

Before moving to production, verify:

- [ ] Successful payment creates active license
- [ ] License appears in database with correct data
- [ ] User cache fields updated correctly
- [ ] Confirmation email sent
- [ ] Success page shows correct information
- [ ] Premium blocks unlocked after purchase
- [ ] Premium banner hidden for licensed users
- [ ] Refund deactivates license
- [ ] Refund email sent
- [ ] Premium blocks locked after refund
- [ ] Cannot purchase duplicate license
- [ ] Rate limiting works (max 3 checkout attempts/hour)
- [ ] Webhook signature verification works
- [ ] Error handling works for failed payments

## Useful Commands

### Trigger Specific Webhook Event

```bash
# Trigger checkout.session.completed
stripe trigger checkout.session.completed

# Trigger charge.refunded
stripe trigger charge.refunded
```

### View Webhook Event Details

```bash
# List recent events
stripe events list --limit 10

# View specific event
stripe events retrieve evt_xxx
```

### View Checkout Session

```bash
stripe checkout sessions retrieve cs_test_xxx
```

### View Payment Intent

```bash
stripe payment_intents retrieve pi_xxx
```

## Production Webhook Setup

When deploying to production:

1. **Stop using Stripe CLI** - it's only for local development
2. **Create webhook in Stripe Dashboard**:
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `charge.refunded`
3. **Copy signing secret** and add to production environment variables
4. **Test with live mode** (but small amounts first!)

## Security Notes

✅ **DO**:
- Always verify webhook signatures
- Use HTTPS in production
- Log all webhook events for debugging
- Handle idempotency (same event sent multiple times)
- Set up monitoring for failed webhooks

❌ **DON'T**:
- Skip signature verification
- Trust webhook data without validation
- Expose webhook secrets in client code
- Process webhooks synchronously (use queues for production)
- Forget to handle edge cases (duplicate events, etc.)

## Next Steps

After successful webhook testing:

1. ✅ Test with multiple users
2. ✅ Test team license flow (Phase 6)
3. ✅ Set up error monitoring (Sentry, etc.)
4. ✅ Configure production webhooks
5. ✅ Test in staging environment
6. ✅ Go live!

---

**Last updated**: 2025-01-21
