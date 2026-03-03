// api/contact.js — CleanMyPool
//
// NOTE: This endpoint is NOT active.
// All form handling uses EmailJS (client-side SDK in public/index.html).
// No serverless function, no API keys, no Vercel env variables needed.
//
// EmailJS config — set these 3 values in public/index.html:
//   EMAILJS_PUBLIC_KEY  → emailjs.com → Account → API Keys
//   EMAILJS_SERVICE_ID  → emailjs.com → Email Services tab
//   EMAILJS_TEMPLATE_ID → emailjs.com → Email Templates tab

export default function handler(req, res) {
  return res.status(404).json({ error: 'Not active. CleanMyPool uses EmailJS.' });
}
