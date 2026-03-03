# 🏊 CleanMyPool — Website Setup Gameplan

> **Motto:** All you do is swim.
> **Target Domain:** cleanmypool.pro (or .com)

---

## 📋 ACCOUNTS TO CREATE (in order)

### 1. GitHub
- Go to github.com → Create a NEW account (or new org)
- **Repo name:** `cleanmypool`
- Push this codebase to the repo (instructions below)

### 2. Vercel
- Go to vercel.com → Sign up / connect GitHub
- Import the `cleanmypool` GitHub repo
- Vercel auto-detects the `vercel.json` config — no build needed
- Set custom domain: `cleanmypool.pro`

### 3. Domain (Namecheap / GoDaddy / Cloudflare)
- Buy `cleanmypool.pro` or `cleanmypool.com`
- Point DNS to Vercel nameservers
- Vercel handles SSL automatically

### 4. Resend (Email API) — **Separate from FixMyPool**
- Go to resend.com → Create new account
- Create a new API key
- Verify your domain (cleanmypool.pro) for sending
- **Vercel env variable:** `RESEND_API_KEY=re_xxxxxx`
- **Vercel env variable:** `CONTACT_TO=cleanmypool.fl@gmail.com`
- Update `api/contact.js` FROM_EMAIL once domain is verified:
  `CleanMyPool <hello@cleanmypool.pro>`

### 5. Gmail — **Separate business Gmail**
- Create: `cleanmypool.fl@gmail.com`
- This receives all form submissions
- Set up Google Workspace (optional, for @cleanmypool.pro email)

### 6. EmailJS — **Fallback / Separate**
- Go to emailjs.com → Create new account for CleanMyPool
- Create a new service (connect to cleanmypool Gmail)
- Create a template for signup notifications
- Get your **Public Key**, **Service ID**, **Template ID**
- Update in `public/index.html`:
  ```js
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  // and in the form handler:
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {...})
  ```

### 7. Google reCAPTCHA v3 — **Separate**
- Go to google.com/recaptcha → Register new site
- Domain: cleanmypool.pro
- Get your Site Key and Secret Key
- Uncomment the reCAPTCHA script in `public/index.html`
- Replace `YOUR_RECAPTCHA_SITE_KEY` with your key

### 8. Stripe — **Separate CleanMyPool Stripe Account**
- Go to stripe.com → Create new account
- Business name: CleanMyPool (or your LLC name)
- Use for monthly subscription billing
- Plans to create in Stripe:
  - "Screened + Salt System" — $165/mo recurring
  - "Open + Salt System" — $185/mo recurring
  - "Screened + Chlorine" — $205/mo recurring
  - "Open + Chlorine" — custom pricing
- Add Stripe payment link or Stripe Checkout to signup form (Phase 2)
- **Optional:** Stripe Customer Portal for self-service billing

### 9. Google Business Profile — **New listing for CleanMyPool**
- Go to business.google.com
- Create new listing: "CleanMyPool"
- Category: "Swimming Pool Contractor" / "Pool Cleaning Service"
- Address: Tampa, FL (service area business)
- Add service areas: South Tampa, Westchase, Carrollwood, Lutz, Wesley Chapel
- This powers Google Reviews and local SEO

### 10. Google Search Console
- Go to search.google.com/search-console
- Add property: cleanmypool.pro
- Verify via Vercel DNS TXT record
- Submit sitemap: https://cleanmypool.pro/sitemap.xml

### 11. Google Analytics 4 (optional)
- Create new GA4 property for cleanmypool.pro
- Add measurement ID to index.html head

---

## 🚀 DEPLOYING TO VERCEL (Step-by-Step)

```bash
# 1. Initialize git in this folder
cd cleanmypool
git init
git add .
git commit -m "Initial CleanMyPool website"

# 2. Create GitHub repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/cleanmypool.git
git push -u origin main

# 3. Go to vercel.com → New Project → Import from GitHub
# 4. Select cleanmypool repo
# 5. No build command needed (static + serverless)
# 6. Click Deploy ✅
```

### Vercel Environment Variables to Set:
| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_TO` | `cleanmypool.fl@gmail.com` |
| `CONTACT_FROM` | `CleanMyPool <hello@cleanmypool.pro>` |

---

## 📁 FILE STRUCTURE

```
cleanmypool/
├── vercel.json              # Vercel routing config
├── package.json
├── api/
│   └── contact.js           # Serverless email handler (Resend)
└── public/
    ├── index.html           # Main homepage ⭐
    ├── contact.html
    ├── terms-of-service.html  # Full service agreement
    ├── privacy-policy.html
    ├── 404.html
    ├── robots.txt
    ├── sitemap.xml
    └── areas/
        ├── pool-cleaning-south-tampa.html
        ├── pool-cleaning-westchase.html
        ├── pool-cleaning-carrollwood.html
        ├── pool-cleaning-lutz.html
        └── pool-cleaning-wesley-chapel.html
```

---

## 💡 PHASE 2 UPGRADES

- [ ] Add Stripe Checkout to signup form (replace email-only flow)
- [ ] Add Supabase for customer database + service history
- [ ] Customer portal (view billing, service notes, request extra visits)
- [ ] Service day calendar scheduling
- [ ] Automated SMS via Twilio for technician alerts
- [ ] Before/after photo uploads per visit
- [ ] Google Reviews widget integration
- [ ] Referral program

---

## 🎨 BRAND NOTES

- **Primary font:** Fraunces (serif, editorial — for headlines)
- **Body font:** DM Sans (clean, modern)
- **Primary color:** #0EA5E9 (sky blue)
- **Deep accent:** #082F49 (dark navy)
- **Highlight:** #22D3EE (aqua)
- **Motto:** "All you do is swim." — always italic

---

## 📞 CONTACT INFO TO UPDATE

Replace these placeholder values in the code:
- Phone: `(813) 585-4843` — update if different for CleanMyPool
- Email: `cleanmypool.fl@gmail.com` — update when Gmail is created
- License number: Add FL contractor license once obtained

---

*Built with the same stack as FixMyPool.pro — Vanilla HTML/CSS/JS + Vercel Serverless Functions. Zero framework, ultra-fast, SEO-optimized.*
