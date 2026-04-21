const http    = require('http');
const https   = require('https');
const fs      = require('fs');
const path    = require('path');
const nodemailer = require('nodemailer');

// ─── EMAIL CONFIG ─────────────────────────────────────────────────────────────
// Change these to your email credentials
const EMAIL_CONFIG = {
  service:  'gmail',          // 'gmail' or 'outlook' or 'yahoo'
  user:     'your@gmail.com', // your email address
  pass:     'your_app_password', // Gmail: App Password | Outlook: your password
  to:       'your@gmail.com', // where to receive lead emails
};
// ─────────────────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: EMAIL_CONFIG.service,
  auth: { user: EMAIL_CONFIG.user, pass: EMAIL_CONFIG.pass }
});

// Static file server
const MIME = {
  '.html': 'text/html', '.css': 'text/css',
  '.js': 'application/javascript', '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // Send email endpoint
  if (req.method === 'POST' && req.url === '/send-email') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const d = JSON.parse(body);
        const mailOptions = {
          from:    `"CloudZentra Website" <${EMAIL_CONFIG.user}>`,
          to:      EMAIL_CONFIG.to,
          subject: `New Lead: ${d.name || 'Unknown'} — CloudZentra`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
              <div style="background:#2563eb;padding:24px;color:#fff;">
                <h2 style="margin:0;">☁️ New Lead — CloudZentra</h2>
                <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Submitted on ${new Date().toLocaleString()}</p>
              </div>
              <div style="padding:24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:10px 0;color:#64748b;font-size:13px;width:140px;">Name</td><td style="padding:10px 0;font-weight:600;">${d.name || '—'}</td></tr>
                  <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;">Email</td><td style="padding:10px;font-weight:600;"><a href="mailto:${d.email}" style="color:#2563eb;">${d.email || '—'}</a></td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Company</td><td style="padding:10px 0;font-weight:600;">${d.company || '—'}</td></tr>
                  <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;">Cloud Provider</td><td style="padding:10px;font-weight:600;">${d.cloud || '—'}</td></tr>
                  <tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Source</td><td style="padding:10px 0;"><span style="background:#dbeafe;color:#2563eb;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;">${d.source || 'Contact Form'}</span></td></tr>
                  <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px;">${d.message || '—'}</td></tr>
                </table>
              </div>
              <div style="background:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;">
                CloudZentra — cloudzentra.in
              </div>
            </div>`
        };
        transporter.sendMail(mailOptions, (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: err.message }));
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true }));
          }
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid request' }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (e, d) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(d);
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ CloudZentra server running at http://localhost:${PORT}`);
  console.log(`📧 Emails will be sent from: ${EMAIL_CONFIG.user}`);
  console.log(`📬 Leads will arrive at: ${EMAIL_CONFIG.to}`);
});
