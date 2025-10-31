# Testing Team Features

This guide explains how to test the complete team license functionality, including invitations, acceptance, and member management.

## Prerequisites

- ✅ Stripe webhooks working (see `TESTING_WEBHOOKS.md`)
- ✅ Email service configured (Mailgun)
- ✅ At least 2 test email addresses (for owner and team member)
- ✅ Local development server running

## Overview

Team licenses allow:
- 1 owner (the purchaser)
- Up to 5 total seats (owner + 4 invited members)
- Lifetime access for all members
- Owner can invite and remove members
- Invited members receive email with secure token
- 7-day expiry on invitations

## Test Scenario 1: Purchase Team License

### Step 1: Create Owner Account

1. Go to `http://localhost:3000/auth/signup`
2. Create account with email: `owner@example.com`
3. Verify email if required
4. Log in

### Step 2: Purchase Team License

1. Navigate to `/pricing`
2. Click "Buy Team" ($149)
3. Complete Stripe checkout with test card: `4242 4242 4242 4242`
4. Wait for webhook to process (check Stripe CLI logs)
5. Should redirect to `/purchase/success`

### Step 3: Verify Success Page

✅ Check that success page shows:
- "🎉 Purchase Successful!" message
- "Invite up to 5 team members" in the list
- Purple box with "Next Step: Invite Your Team"
- Primary button: "Go to Team Dashboard"

### Step 4: Verify Database

Using Prisma Studio (`npx prisma studio`):

**License table:**
- New record exists
- `type` = "team"
- `status` = "active"
- `teamSeats` = 5
- `userId` = owner's user ID

**User table (owner):**
- `hasActiveLicense` = true
- `licenseType` = "team"

### Step 5: Verify Email

Owner should receive confirmation email with:
- Subject: "🎉 Welcome to Blcks Premium!"
- Mentions "Team License"
- Lists "Up to 5 team members" feature
- Blue box: "Next Step: Visit your dashboard to invite..."

## Test Scenario 2: Invite Team Member

### Step 1: Access Team Dashboard

1. Logged in as owner (`owner@example.com`)
2. Go to `/dashboard`
3. Should see "Team Dashboard" page

### Step 2: Verify Dashboard UI

✅ License Info card shows:
- Type: "team" badge
- Team Seats: "0 / 5"
- "5 seats available"
- Purchase date

✅ Invite form visible:
- Email input enabled
- "Send Invite" button enabled

✅ Active Members section:
- Shows "No active team members yet"

### Step 3: Send First Invite

1. Enter email: `member1@example.com`
2. Click "Send Invite"
3. Should show green success message: "Invite sent successfully!"

### Step 4: Verify Updates

✅ Dashboard updates to show:
- Team Seats: "1 / 5" (0 active + 1 pending)
- "4 seats available"
- Pending Invites section appears
- Shows `member1@example.com` with yellow clock icon
- Shows expiry date (7 days from now)

### Step 5: Verify Database

**TeamMember table:**
- New record with `invitedEmail` = "member1@example.com"
- `status` = "pending"
- `role` = "member"
- `inviteToken` = 64-character hex string
- `inviteExpiresAt` = 7 days from now
- `licenseId` = owner's license ID
- `userId` = null (not yet accepted)

### Step 6: Verify Invite Email

Member should receive email:
- To: `member1@example.com`
- Subject: "owner@example.com invited you to join their Blcks team"
- Contains "Accept Invite" button
- Shows invite expiry date
- Note about logging in with invited email

## Test Scenario 3: Accept Team Invite

### Step 1: Extract Invite URL

From the email sent to `member1@example.com`:
- Click "Accept Invite" or copy the URL
- Should look like: `http://localhost:3000/team/accept-invite?token=abc123...`

### Step 2: Open Invite (Not Logged In)

1. Open invite URL in incognito/private window
2. Should see "Authentication Required" page
3. Shows "Log In" and "Create Account" buttons

### Step 3: Create Member Account

1. Click "Create Account"
2. Redirected to signup with `callbackUrl` parameter
3. **Important**: Sign up with SAME email: `member1@example.com`
4. Complete signup

### Step 4: Auto-Accept After Login

After successful signup/login:
- Should automatically redirect back to accept-invite page
- Should process the invite
- Should show "🎉 Welcome to the Team!" success message

### Step 5: Verify Success Page

✅ Shows:
- Green checkmark icon
- "Welcome to the Team!" message
- "You now have access to all 110 premium blocks"
- "Your access is lifetime as part of this team"
- "You joined owner@example.com's team"
- "Browse All Blocks" button

### Step 6: Verify Database Changes

**TeamMember table:**
- Same record, now updated:
  - `status` = "active" (changed from pending)
  - `userId` = member1's user ID (now linked)
  - `inviteToken` = null (cleared)
  - `inviteExpiresAt` = null (cleared)

**User table (member1):**
- `hasActiveLicense` = true
- `licenseType` = "team"

### Step 7: Verify Owner Email

Owner should receive notification email:
- Subject: "member1@example.com joined your Blcks team"
- Green header: "Team Member Joined"
- Shows who joined
- Link to dashboard

### Step 8: Verify Owner Dashboard

Owner logs in and goes to `/dashboard`:
- Team Seats now shows: "1 / 5"
- "4 seats available"
- Active Members section shows:
  - `member1@example.com` with green checkmark
  - Trash icon to remove
- Pending Invites section is empty (invite accepted)

### Step 9: Verify Member Access

Member logs in as `member1@example.com`:
- Homepage shows NO premium banner (has access)
- All blocks show "✓ Premium" badge in green
- Can view code for premium blocks (not blurred)
- Cannot access `/dashboard` (not owner, shows "No Team License Found")

## Test Scenario 4: Multiple Team Members

### Step 1: Invite More Members

As owner, invite 4 more members:
1. `member2@example.com`
2. `member3@example.com`
3. `member4@example.com`
4. `member5@example.com`

After all invites:
- Team Seats: "5 / 5"
- "0 seats available"
- Invite form input/button should be disabled
- Warning: "Your team is full. Remove a member to invite someone new."

### Step 2: Try to Invite When Full

1. Try entering another email
2. Button is disabled
3. Cannot submit form

### Step 3: Accept All Invites

Repeat acceptance process for all members:
- Each creates account with their invited email
- Each accepts their invite
- Each gets team access

After all accepted:
- Owner's dashboard shows 5 active members
- Team Seats: "5 / 5"
- 0 pending invites
- 0 seats available

## Test Scenario 5: Remove Team Member

### Step 1: Remove a Member

As owner, from dashboard:
1. Click trash icon next to `member3@example.com`
2. Confirm the removal dialog
3. Should show green success: "Team member removed successfully"

### Step 2: Verify Dashboard Updates

- Team Seats: "4 / 5"
- "1 seat available"
- `member3@example.com` no longer in Active Members list
- Invite form is now enabled again

### Step 3: Verify Database

**TeamMember table:**
- Record for member3 is DELETED (not just status changed)

**User table (member3):**
- `hasActiveLicense` = false (lost access)
- `licenseType` = null

### Step 4: Verify Member3 Lost Access

Member3 logs in:
- Homepage shows premium banner again
- Premium blocks show lock icon
- Code is blurred with upgrade overlay

### Step 5: Re-invite Same Member

Can invite `member3@example.com` again:
1. Enter same email in invite form
2. Sends new invite
3. They can accept and regain access

## Test Scenario 6: Edge Cases

### 6.1 Expired Invite

1. Create invite for `expired@example.com`
2. Manually update database to set `inviteExpiresAt` to past date
3. Try to accept invite
4. Should show error: "This invite has expired"

### 6.2 Wrong Email

1. Create invite for `correct@example.com`
2. Try to accept while logged in as `wrong@example.com`
3. Should show error: "This invite was sent to a different email address"

### 6.3 Already Accepted

1. Accept an invite successfully
2. Try to use same invite token again
3. Should show error: "Invalid or expired invite"

### 6.4 Duplicate Invite

1. Send invite to `member1@example.com`
2. Try to send another invite to same email
3. Should show error: "This email has already been invited"

### 6.5 Self-Invite

1. As owner, try to invite your own email
2. Should show error: "You cannot invite yourself"

### 6.6 Invalid Email

1. Try to invite `not-an-email`
2. Form validation should prevent submission
3. Server also validates and rejects

## Test Scenario 7: Individual License Behavior

### Verify Individual License Doesn't Get Dashboard

1. Purchase individual license (not team)
2. After success, should NOT see team dashboard link
3. Go to `/dashboard` manually
4. Should see "No Team License Found" message
5. Shows "View Pricing" button

## Verification Checklist

Before considering team features complete, verify:

### Purchase Flow
- [  ] Team license costs $149
- [ ] Individual license costs $49
- [ ] Cannot purchase if already have license
- [ ] Webhook creates license correctly
- [ ] User cache fields updated
- [ ] Confirmation email sent

### Dashboard Access
- [ ] Only team license owners see dashboard
- [ ] Individual license holders see "not found" message
- [ ] Team members (non-owners) see "not found" message
- [ ] Dashboard shows correct seat count
- [ ] Dashboard UI is responsive

### Invitations
- [ ] Can send invite when seats available
- [ ] Cannot send when team is full
- [ ] Cannot invite same email twice
- [ ] Cannot invite self
- [ ] Email validation works
- [ ] Invite email received with correct content
- [ ] Invite token is secure (64 chars)
- [ ] Invite expires after 7 days

### Acceptance
- [ ] Requires authentication
- [ ] Must use invited email
- [ ] Redirects correctly after login
- [ ] Updates all database records
- [ ] Updates user cache fields
- [ ] Grants premium access immediately
- [ ] Owner receives notification email
- [ ] Cannot accept expired invite
- [ ] Cannot accept same invite twice

### Member Management
- [ ] Owner can see all members
- [ ] Active vs pending status shown
- [ ] Expiry dates displayed correctly
- [ ] Remove member works
- [ ] Removed member loses access
- [ ] Can re-invite removed member
- [ ] Seat count updates correctly

### Access Control
- [ ] Team members have premium access
- [ ] Removed members lose access
- [ ] Non-members don't have access
- [ ] Individual license holders have access
- [ ] Free users see limited content

## Troubleshooting

### Invite Email Not Received

1. Check Mailgun configuration
2. Check server logs for email errors
3. Verify email in spam folder
4. Check Mailgun dashboard for delivery status

### "No Team License Found" for Owner

1. Check License table in database
2. Verify `type` is "team" not "individual"
3. Verify `status` is "active"
4. Verify `userId` matches logged-in user

### Team Member Can't Accept Invite

1. Verify they're logging in with EXACT email that was invited
2. Check invite hasn't expired (inviteExpiresAt)
3. Check invite hasn't already been accepted (status = pending)
4. Check team isn't full (active + pending < teamSeats)

### Member Still Has Access After Removal

1. Check TeamMember record was actually deleted
2. Check user doesn't have their OWN license
3. Check user isn't member of ANOTHER team
4. Try logging out and back in
5. Check user cache fields (hasActiveLicense, licenseType)

## Performance Notes

- Invite tokens are cryptographically secure (32 bytes = 64 hex chars)
- Database queries are optimized with proper indexes
- Email sending is asynchronous (doesn't block request)
- Seat counting uses efficient filters

## Security Notes

✅ **Implemented:**
- Secure random invite tokens
- Token cleared after acceptance
- Email verification required
- Ownership verification on all actions
- No enumeration of team members by non-owners
- Rate limiting on checkout (prevents abuse)

## Next Steps

After successful testing:

1. ✅ Test all scenarios above
2. ⏳ Set up monitoring for failed invites
3. ⏳ Configure production email templates
4. ⏳ Test in staging environment
5. ⏳ Deploy to production
6. ⏳ Monitor webhook deliveries
7. ⏳ Set up customer support for invite issues

---

**Last updated**: 2025-01-21
