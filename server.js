const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const nodemailer = require('nodemailer');

const CONFIG_FILE = path.join(__dirname, 'email.config.json');
const PORT = 3000;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function loadEmailConfig() {
  try { return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')); }
  catch { return null; }
}

function buildTransporter(cfg) {
  if (!cfg) return null;
  let transportOpts;

  if (cfg.provider === 'gmail') {
    transportOpts = {
      service: 'gmail',
      auth: { user: cfg.user, pass: cfg.pass }
    };
  } else if (cfg.provider === 'outlook') {
    transportOpts = {
      host: 'smtp.office365.com', port: 587, secure: false,
      auth: { user: cfg.user, pass: cfg.pass }
    };
  } else if (cfg.provider === 'yahoo') {
    transportOpts = {
      service: 'yahoo',
      auth: { user: cfg.user, pass: cfg.pass }
    };
  } else {
    // Custom SMTP
    transportOpts = {
      host: cfg.smtpHost, port: parseInt(cfg.smtpPort) || 587,
      secure: cfg.smtpPort == 465,
      auth: { user: cfg.user, pass: cfg.pass }
    };
  }
  return nodemailer.createTransport(transportOpts);
}

function buildEmailHtml(d) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <div style="background:#2563eb;padding:24px;color:#fff;">
      <h2 style="margin:0;">☁️ New Lead — CloudZentra</h2>
      <p style="margin:4px 0 0;opacity:0.8;font-size:14px;">Submitted on ${new Date().toLocaleString()}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;color:#64748b;font-size:13px;width:140px;">Name</td><td style="padding:10px 0;font-weight:600;">${d.name||'—'}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;">Email</td><td style="padding:10px;font-weight:600;"><a href="mailto:${d.email}" style="color:#2563eb;">${d.email||'—'}</a></td></tr>
        <tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Company</td><td style="padding:10px 0;font-weight:600;">${d.company||'—'}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;">Cloud Provider</td><td style="padding:10px;font-weight:600;">${d.cloud||'—'}</td></tr>
        <tr><td style="padding:10px 0;color:#64748b;font-size:13px;">Source</td><td style="padding:10px 0;"><span style="background:#dbeafe;color:#2563eb;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;">${d.source||'Contact Form'}</span></td></tr>
        <tr style="background:#f8fafc;"><td style="padding:10px;color:#64748b;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px;">${d.message||'—'}</td></tr>
      </table>
    </div>
    <div style="background:#f8fafc;padding:16px 24px;text-align:center;font-size:12px;color:#94a3b8;">CloudZentra — cloudzentra.in</div>
  </div>`;
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(); } });
  });
}

const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.ico':'image/x-icon' };

// ─── SERVER ───────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // ── Save email config ──────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/save-email-config') {
    try {
      const cfg = await parseBody(req);
      // Test connection before saving
      const transporter = buildTransporter(cfg);
      if (!transporter) throw new Error('Invalid config');
      await transporter.verify();
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: 'Email config saved & connection verified!' }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message || 'Connection failed. Check credentials.' }));
    }
    return;
  }

  // ── Get email config status ────────────────────────────────────────────────
  if (req.method === 'GET' && req.url === '/email-config-status') {
    const cfg = loadEmailConfig();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      configured: !!cfg,
      provider: cfg ? cfg.provider : null,
      user: cfg ? cfg.user : null
    }));
    return;
  }

  // ── Send email ─────────────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/send-email') {
    try {
      const d = await parseBody(req);
      const cfg = loadEmailConfig();
      if (!cfg) {
        res.writeHead(503, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: false, error: 'Email not configured' }));
      }
      const transporter = buildTransporter(cfg);
      await transporter.sendMail({
        from: `"CloudZentra Website" <${cfg.user}>`,
        to:   cfg.to || cfg.user,
        subject: `New Lead: ${d.name || 'Unknown'} — CloudZentra`,
        html: buildEmailHtml(d)
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  // ── Static files ───────────────────────────────────────────────────────────
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (e, d) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(d);
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  const cfg = loadEmailConfig();
  console.log(`✅ CloudZentra server running → http://localhost:${PORT}`);
  console.log(cfg
    ? `📧 Email configured: ${cfg.provider} (${cfg.user})`
    : `⚠️  Email not configured yet — set it up in Admin → Settings`);
});
