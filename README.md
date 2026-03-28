# ☁️ CloudNova – Cloud Services & DevOps Solutions Website

A fully static, professional business website for a cloud services startup. No frameworks, no dependencies, no server required — just HTML, CSS, and JavaScript.

---

## 📁 Project Structure

```
Website/
├── index.html        → Main website (all sections)
├── admin.html        → Admin dashboard (login protected)
├── style.css         → All styles
├── script.js         → All JavaScript logic
└── README.md         → This file
```

---

## 🌐 Website Sections

| Section | Description |
|---|---|
| Navbar | Fixed top navigation with mobile hamburger menu |
| Hero | Headline, CTA buttons, stats (30% cost saved, 50+ projects, 24/7 support) |
| Services | 6 clickable service cards with detailed modals |
| Packages | 3 pricing tiers — Starter, Growth, Pro |
| About | Company story, stats, and trust points |
| Testimonials | 3 client reviews with star ratings |
| FAQ | 6 accordion questions with smooth animation |
| Contact | Free audit request form |
| Footer | Links, email, copyright |
| WhatsApp Button | Floating chat button (bottom right) |

---

## ⚙️ Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Service cards open detailed modals on click
- ✅ Contact form saves submissions to browser localStorage
- ✅ Admin dashboard to view all form submissions
- ✅ Notification bell shows unread submission count
- ✅ Browser push notification on new form submission
- ✅ Scroll animations on cards
- ✅ FAQ accordion
- ✅ Mobile hamburger menu
- ✅ WhatsApp floating button
- ✅ No external dependencies (except Google Fonts)

---

## 🚀 How to Run

### Option 1 — Open Directly (Quickest)
Just double-click `index.html` to open in your browser.

> ⚠️ **Important:** If you open `index.html` and `admin.html` as separate files directly (`file://`), the admin dashboard **will not show form submissions** because browsers treat each file as a separate origin and do not share localStorage between them.

### Option 2 — Use VS Code Live Server (Recommended)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Website opens at `http://127.0.0.1:5500`
5. Admin dashboard at `http://127.0.0.1:5500/admin.html`

### Option 3 — Use Node.js (if installed)
```bash
# Install Node.js from https://nodejs.org
# Then run inside the Website folder:
node server.js
```
- Website → `http://localhost:3000`
- Admin → `http://localhost:3000/admin.html`

### Option 4 — Python (if installed)
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```
- Website → `http://localhost:3000`
- Admin → `http://localhost:3000/admin.html`

---

## 🔐 Admin Dashboard

Access the admin panel at `/admin.html`

### Default Login Credentials
| Field | Value |
|---|---|
| Username | `admin` |
| Password | `cloudnova123` |

> ⚠️ Change the password before going live. Open `admin.html` and update:
> ```js
> const ADMIN_USER = 'admin';
> const ADMIN_PASS = 'cloudnova123';
> ```

### Dashboard Features
- **Stats** — Total requests, unread count, AWS clients, not-on-cloud count
- **Notification Bell** — Shows unread submissions, click to view
- **Submissions Table** — Search by name/email, filter by read/unread
- **View Modal** — Click any row to see full submission details (auto-marks as read)
- **Delete** — Remove any submission
- **Auto-refresh** — Dashboard polls for new data every 10 seconds
- **Browser Notification** — Pop-up alert when a new form is submitted

---

## 📋 Contact Form Fields

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Email | Email | Yes |
| Company Name | Text | No |
| Cloud Provider | Dropdown | No |
| Message / Setup Description | Textarea | No |

All submissions are stored in **browser localStorage** under the key `cn_submissions`.

---

## ✏️ How to Customize

### 1. Company Name
Search and replace `CloudNova` with your company name in `index.html` and `admin.html`.

### 2. WhatsApp Number
In `index.html`, find the WhatsApp button and replace the number:
```html
https://wa.me/919999999999?text=...
```
Format: country code + number, no `+` or spaces.
Example for `+91 98765 43210` → `919876543210`

### 3. Email Address
In `index.html` footer, update:
```html
<a href="mailto:hello@cloudnova.in">hello@cloudnova.in</a>
```

### 4. Pricing
In `index.html`, find the `<!-- PACKAGES -->` section and update the prices and features.

### 5. Team / About Section
In `index.html`, find the `<!-- ABOUT -->` section and update the stats and values.

### 6. Testimonials
In `index.html`, find the `<!-- TESTIMONIALS -->` section and replace the dummy client names and quotes with real ones.

### 7. Service Details (Modal Content)
In `script.js`, find the `const services = [...]` array. Each object has:
```js
{
  icon: '...',        // emoji icon
  title: '...',       // service name
  desc: '...',        // full description
  includes: [...],    // list of what's included
  tags: [...],        // tools & technologies
  ideal: '...'        // who it's for
}
```

### 8. Colors
In `style.css`, update the CSS variables at the top:
```css
:root {
  --blue: #2563eb;       /* Primary brand color */
  --blue-dark: #1d4ed8;  /* Hover state */
  --dark: #0f172a;       /* Text / dark backgrounds */
  --gray: #64748b;       /* Subtext */
  --light: #f8fafc;      /* Light backgrounds */
}
```

### 9. Admin Password
In `admin.html`, find and update:
```js
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'cloudnova123';
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 768px | 3-column grid, full navbar |
| ≤ 768px | 1-column grid, hamburger menu |

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, animations, responsive layout |
| Vanilla JavaScript | Interactivity, localStorage, modals |
| Google Fonts (Inter) | Typography |
| localStorage | Form data storage |
| Web Notifications API | Browser push notifications |

---

## 🌍 Deploying Online (Free)

Once ready to go live, deploy for free on any of these platforms:

### Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your `Website` folder
3. Your site is live instantly with a free URL

### GitHub Pages
1. Push your files to a GitHub repository
2. Go to Settings → Pages → select `main` branch
3. Your site is live at `https://yourusername.github.io/repo-name`

### Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Deploy with one click

> ⚠️ Once deployed online, all visitors share the same domain origin, so localStorage will work correctly across `index.html` and `admin.html`.

---

## ⚠️ Known Limitations

| Limitation | Reason | Solution |
|---|---|---|
| Form data lost on browser clear | Uses localStorage | Use a backend/database for production |
| Admin password visible in code | No backend auth | Add server-side auth for production |
| Data not shared across devices | localStorage is device-specific | Use a database (Firebase, Supabase) for multi-device |
| No real email sending | Pure frontend | Integrate EmailJS or a backend for emails |

---

## 📞 Support & Contact

For any questions about this website setup:
- Email: `hello@cloudnova.in`
- WhatsApp: Your number

---

*Built with ❤️ by CloudNova Team*
