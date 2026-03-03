// api/contact.js — CleanMyPool
// Vercel Serverless Function — uses Resend to forward contact/signup form emails.
// Required environment variable in Vercel dashboard:
//   RESEND_API_KEY  → your Resend API key
//   CONTACT_TO      → where to receive messages (defaults to cleanmypool.fl@gmail.com)

const TO_EMAIL   = process.env.CONTACT_TO   || 'cleanmypool.fl@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM || 'CleanMyPool <onboarding@resend.dev>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const clean = (s) => String(s ?? '').trim().replace(/<[^>]*>/g, '').slice(0, 2000);

  const safeName    = clean(name);
  const safePhone   = clean(phone);
  const safeEmail   = clean(email);
  const safeSubject = clean(subject) || 'General Inquiry';
  const safeMessage = clean(message);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: safeEmail,
        subject: `[CleanMyPool] ${safeSubject} — ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f0f9ff; border-radius: 12px;">
            <div style="background: linear-gradient(135deg, #082F49, #0369A1); padding: 28px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 1.6rem; margin: 0;">🏊 New Service Signup</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 0.9rem;">cleanmypool.pro</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e0f2fe; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #64748b; font-size: 0.9rem; width: 120px;"><strong>Name</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #0c1a2e;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #64748b; font-size: 0.9rem;"><strong>Email</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff;"><a href="mailto:${safeEmail}" style="color: #0EA5E9;">${safeEmail}</a></td>
                </tr>
                ${safePhone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #64748b; font-size: 0.9rem;"><strong>Phone</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff;"><a href="tel:${safePhone}" style="color: #0EA5E9;">${safePhone}</a></td>
                </tr>` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #64748b; font-size: 0.9rem;"><strong>Subject</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f9ff; color: #0c1a2e;">${safeSubject}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 12px;"><strong>Details</strong></p>
                <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #0EA5E9; color: #0c1a2e; line-height: 1.7; white-space: pre-wrap; font-size: 0.9rem;">${safeMessage}</div>
              </div>
              <div style="margin-top: 28px; padding: 16px; background: #e0f2fe; border-radius: 10px; text-align: center;">
                <p style="margin: 0; color: #0369a1; font-size: 0.9rem;">
                  🏊 Reply directly to this email to respond to ${safeName}
                </p>
              </div>
            </div>
          </div>
        `,
        text: `New CleanMyPool Submission\n\nName: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone || 'N/A'}\nSubject: ${safeSubject}\n\nDetails:\n${safeMessage}`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data.id });

  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
