# Template System Setup Guide

This guide explains how to set up and use the template marketplace system.

## Overview

The template system allows you to sell complete project templates ($47 each) individually OR include them for free with Individual/Team licenses.

## Features Implemented

✅ **2 Templates Available:**
- Modern Dashboard ($47)
- SaaS Landing Page ($47)

✅ **Access Control:**
- Users with Individual or Team licenses get ALL templates for free
- Users can also purchase templates individually without a license
- Unlimited downloads for authorized users

✅ **Complete Integration:**
- Stripe checkout for template purchases
- Webhook handling for purchase confirmation
- Email notifications on purchase
- Protected download API routes
- Dashboard section showing available templates
- /templates page with conditional UI (Download vs Buy buttons)

## File Structure

```
/storage/templates/
├── dashboard.zip           # Your template file (you need to create this)
├── landing.zip            # Your template file (you need to create this)
├── versions.json          # Version metadata
└── README.md             # Instructions for updating

/src/app/api/templates/
├── check-access/route.ts  # Check if user has access to template
└── download/[id]/route.ts # Serve protected template files

/src/app/templates/
└── page.tsx              # Templates marketplace page

Database:
- TemplatePurchase table (tracks individual purchases)
```

## Setup Steps

### 1. Create Template .zip Files

Generate your template projects locally and create .zip files:

```bash
# Example
cd /path/to/your/dashboard-project
zip -r dashboard.zip .

# Copy to project
cp dashboard.zip /path/to/blcks/storage/templates/
```

**Important:** Each .zip should contain a complete, ready-to-use Next.js/React project.

### 2. Run Database Migration

```bash
npx prisma migrate dev --name add-template-purchase
# or
npx prisma db push
```

This creates the `TemplatePurchase` table.

### 3. Create Stripe Products

Go to Stripe Dashboard → Products → Create Product:

1. **Dashboard Template**
   - Name: "Modern Dashboard Template"
   - Price: $47 USD (one-time)
   - Copy the Price ID

2. **Landing Template**
   - Name: "SaaS Landing Page Template"
   - Price: $47 USD (one-time)
   - Copy the Price ID

### 4. Add Environment Variables

Add these to your `.env`:

```bash
# Existing variables (keep these)
STRIPE_PRICE_INDIVIDUAL=price_xxx
STRIPE_PRICE_TEAM=price_xxx

# New template price IDs
STRIPE_PRICE_TEMPLATE_DASHBOARD=price_xxx_dashboard
STRIPE_PRICE_TEMPLATE_LANDING=price_xxx_landing
```

### 5. Add Template Images (Optional)

Add preview images for the templates page:

```bash
/public/templates/
├── dashboard-preview.png  # 1920x1440px
└── landing-preview.png    # 1920x1440px
```

If images don't exist, the page shows gracefully without them.

## How It Works

### For Users WITH License (Individual/Team):

1. User goes to `/templates`
2. System detects active license
3. Shows "Download Template" button (free)
4. User downloads .zip directly from dashboard

### For Users WITHOUT License:

1. User goes to `/templates`
2. Shows "Buy for $47" button
3. Clicks → Stripe checkout
4. After payment → Webhook creates `TemplatePurchase` record
5. User gets email notification
6. Can download from `/dashboard`

### Purchase Flow:

```
User clicks "Buy"
→ /api/checkout/create-session (plan: "template-dashboard")
→ Stripe Checkout
→ Payment success
→ Webhook: checkout.session.completed
→ Create TemplatePurchase record
→ Send confirmation email
→ User can download from dashboard
```

## Updating Templates

To release a new version:

1. **Create updated .zip:**
   ```bash
   zip -r dashboard.zip /path/to/updated/project
   ```

2. **Replace file:**
   ```bash
   cp dashboard.zip storage/templates/dashboard.zip
   ```

3. **Update versions.json:**
   ```json
   {
     "dashboard": {
       "version": "1.1.0",
       "updated": "2025-02-01",
       "changelog": "Added dark mode to all pages"
     }
   }
   ```

4. **Deploy:**
   ```bash
   git add storage/templates/
   git commit -m "Update dashboard template to v1.1.0"
   git push
   ```

Users automatically get the latest version when they download.

## Adding More Templates

1. **Add to template list** in `/src/app/templates/page.tsx`:
   ```typescript
   const templates: Template[] = [
     // existing templates...
     {
       id: 'new-template',
       name: 'New Template',
       description: '...',
       price: 47,
       // ...
     }
   ];
   ```

2. **Add to dashboard** in `/src/app/dashboard/page.tsx`:
   ```typescript
   const TEMPLATES = [
     // existing...
     { id: 'new-template', name: 'New Template', description: '...' }
   ];
   ```

3. **Update Stripe config** in `/src/lib/stripe.ts`:
   ```typescript
   STRIPE_PRICES: {
     TEMPLATE_NEW: process.env.STRIPE_PRICE_TEMPLATE_NEW || '',
   }
   ```

4. **Update validation** in both:
   - `/src/app/api/templates/check-access/route.ts`
   - `/src/app/api/templates/download/[id]/route.ts`

   Change: `['dashboard', 'landing']` → `['dashboard', 'landing', 'new-template']`

5. **Create .zip file** and add to `storage/templates/`

6. **Create Stripe product** and add price ID to `.env`

## Testing

### Test Template Purchase:

1. Create test account (or use existing)
2. Go to `/templates`
3. Click "Buy for $47" on Dashboard template
4. Use Stripe test card: `4242 4242 4242 4242`
5. Complete checkout
6. Check email for confirmation
7. Go to `/dashboard`
8. Should see template in "Premium Templates" section
9. Click "Download" → should download .zip

### Test License Access:

1. Purchase Individual or Team license
2. Go to `/templates`
3. Should see "Download Template" button (not "Buy")
4. Click download → should work immediately
5. Go to `/dashboard`
6. Should see both templates available

## Troubleshooting

**"Template file not found" error:**
- Check that .zip files exist in `storage/templates/`
- Verify file names match template IDs (`dashboard.zip`, `landing.zip`)

**"You do not have access" error:**
- Check user has active license OR individual template purchase
- Verify `TemplatePurchase` record exists in database
- Check `hasActiveLicense` and `licenseType` fields on User

**Stripe webhook not firing:**
- Verify webhook secret is correct in `.env`
- Check Stripe Dashboard → Webhooks → Events
- Ensure webhook listens to `checkout.session.completed`
- Check server logs for webhook errors

**Download button not showing:**
- Check `/api/templates/check-access` returns `hasAccess: true`
- Verify user is authenticated
- Check browser console for API errors

## Security Notes

- ✅ Templates stored outside `/public` (not directly accessible)
- ✅ Downloads require authentication
- ✅ Access verified on every download request
- ✅ Stripe webhooks verify signature
- ✅ No client-side bypassing possible

## Future Enhancements

Ideas for extending the system:

- [ ] Template bundles (buy multiple at discount)
- [ ] Version history and changelog in dashboard
- [ ] Preview screenshots/demos
- [ ] Template categories and filtering
- [ ] License key generation for templates
- [ ] Analytics on download counts
- [ ] Automatic updates notification
