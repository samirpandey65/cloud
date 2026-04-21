// ─── LOAD ADMIN CONFIG ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Contact info from admin settings
  const c = JSON.parse(localStorage.getItem('cz_contact') || '{"email":"info@cloudzentra.in","waNum":"918855865379","waMsg":"Hi CloudZentra! I want a free cloud audit."}');

  const emailLink = document.getElementById('footer-email');
  if (emailLink) { emailLink.href = 'mailto:' + c.email; emailLink.textContent = c.email; }

  const waBtn = document.getElementById('whatsapp-btn');
  if (waBtn) waBtn.href = 'https://wa.me/' + c.waNum + '?text=' + encodeURIComponent(c.waMsg);

  // Social links from admin settings
  const SOCIAL_META = {
    linkedin:  { label: 'LinkedIn' },
    twitter:   { label: 'X / Twitter' },
    instagram: { label: 'Instagram' },
    facebook:  { label: 'Facebook' },
    youtube:   { label: 'YouTube' }
  };
  const sc = JSON.parse(localStorage.getItem('cz_socials') || '{}');
  const socialContainer = document.getElementById('footer-socials');
  if (socialContainer) {
    socialContainer.innerHTML = '';
    Object.entries(SOCIAL_META).forEach(([key, meta]) => {
      if (sc[key] && sc[key].enabled && sc[key].url) {
        const a = document.createElement('a');
        a.href = sc[key].url;
        a.textContent = meta.label;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        socialContainer.appendChild(a);
      }
    });
  }
});
// ─────────────────────────────────────────────────────────────────────────────

// Service modal data
const services = [
  {
    icon: '&#9729;&#65039;',
    title: 'Cloud Setup & Migration',
    desc: 'We design and deploy your entire cloud infrastructure from scratch or migrate your existing on-premise setup to AWS, Azure, or GCP — with zero downtime, full data integrity, and security compliance built in from day one.',
    includes: ['Cloud architecture design & planning', 'Server & database migration', 'DNS, domain & SSL configuration', 'IAM roles & access control setup', 'VPC, subnets & networking setup', 'Post-migration testing & validation'],
    tags: ['AWS', 'Azure', 'GCP', 'EC2', 'S3', 'RDS', 'VPC', 'Route 53'],
    ideal: 'Startups moving to cloud for the first time, or businesses migrating from on-premise servers to a managed cloud environment.'
  },
  {
    icon: '&#9881;&#65039;',
    title: 'DevOps Automation',
    desc: 'We build fully automated CI/CD pipelines so your team can deploy code in minutes, not hours. From containerization with Docker to orchestration with Kubernetes — we handle the entire DevOps lifecycle.',
    includes: ['CI/CD pipeline setup (GitHub Actions / Jenkins)', 'Docker containerization', 'Kubernetes cluster setup & management', 'Auto-scaling & load balancing', 'Infrastructure as Code (Terraform)', 'Blue-green & rolling deployments'],
    tags: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'Helm', 'ArgoCD'],
    ideal: 'Development teams that want faster, reliable deployments and want to eliminate manual release processes.'
  },
  {
    icon: '&#128176;',
    title: 'Cost Optimization',
    desc: 'Most businesses overpay for cloud by 20–40% due to idle resources, wrong instance types, and lack of monitoring. We audit your entire cloud bill and implement changes that reduce costs immediately — without affecting performance.',
    includes: ['Full cloud cost audit & report', 'Right-sizing EC2 / VM instances', 'Reserved instance & savings plan recommendations', 'Identifying & removing idle resources', 'S3 storage lifecycle policies', 'Budget alerts & cost dashboards'],
    tags: ['AWS Cost Explorer', 'Azure Cost Management', 'CloudWatch', 'Trusted Advisor', 'Savings Plans'],
    ideal: 'Any business already on cloud that wants to reduce their monthly bill and get more value from their existing infrastructure.'
  },
  {
    icon: '&#128202;',
    title: 'Monitoring & Alerts',
    desc: 'Know about issues before your users do. We set up real-time monitoring dashboards, log aggregation, and intelligent alerting so your team is always aware of system health — and can act fast when something goes wrong.',
    includes: ['Real-time performance dashboards (Grafana)', 'Infrastructure & application metrics', 'Log aggregation & analysis', 'Uptime monitoring & alerting', 'Custom alert rules (email, Slack, SMS)', 'Monthly health reports'],
    tags: ['Grafana', 'Prometheus', 'CloudWatch', 'Datadog', 'ELK Stack', 'PagerDuty'],
    ideal: 'Teams that need full visibility into their infrastructure and want to catch and resolve issues before they impact customers.'
  },
  {
    icon: '&#128272;',
    title: 'Cloud Security',
    desc: 'Security is not optional. We harden your cloud environment against threats — from misconfigured IAM policies to open ports and unencrypted data. We follow industry best practices and compliance frameworks to keep your data safe.',
    includes: ['IAM policy audit & hardening', 'VPC security groups & firewall rules', 'Data encryption at rest & in transit', 'Vulnerability scanning & patching', 'Compliance checks (SOC2, GDPR basics)', 'Security incident response plan'],
    tags: ['AWS IAM', 'AWS Shield', 'Azure Defender', 'SSL/TLS', 'WAF', 'GuardDuty', 'Security Hub'],
    ideal: 'Businesses handling sensitive customer data, fintech, healthtech, or any company that needs to meet compliance requirements.'
  },
  {
    icon: '&#128295;',
    title: 'Managed Support',
    desc: 'We become your dedicated cloud team on a monthly retainer. You get proactive monitoring, fast incident response, regular infrastructure reviews, and a team that knows your setup inside out — without hiring full-time engineers.',
    includes: ['24/7 infrastructure monitoring', 'Incident response & resolution', 'Monthly performance & cost review', 'Patch management & updates', 'On-demand support via chat/call', 'Quarterly architecture review'],
    tags: ['AWS', 'Azure', 'GCP', 'Slack', 'Jira', 'PagerDuty', 'Grafana'],
    ideal: 'Startups and SMBs that need reliable cloud support without the cost of a full-time DevOps or cloud engineer on staff.'
  }
];

function openService(index) {
  const s = services[index];
  document.getElementById('svc-icon').innerHTML = s.icon;
  document.getElementById('svc-title').textContent = s.title;
  document.getElementById('svc-desc').textContent = s.desc;
  document.getElementById('svc-includes').innerHTML = s.includes.map(i => '<li>' + i + '</li>').join('');
  document.getElementById('svc-tags').innerHTML = s.tags.map(t => '<span>' + t + '</span>').join('');
  document.getElementById('svc-ideal').textContent = s.ideal;
  document.getElementById('svcOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeService(e) {
  if (e && e.target !== document.getElementById('svcOverlay') && e.type === 'click') return;
  document.getElementById('svcOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeService();
});

// FAQ toggle
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) { answer.classList.add('open'); btn.classList.add('open'); }
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.boxShadow =
    window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submission = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
    name:    form.querySelector('[name="name"]').value.trim(),
    email:   form.querySelector('[name="email"]').value.trim(),
    company: form.querySelector('[name="company"]').value.trim(),
    cloud:   form.querySelector('[name="cloud"]').value,
    message: form.querySelector('[name="message"]').value.trim()
  };

  // Save to localStorage (admin dashboard)
  const existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));

  // Send email via server
  fetch('/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:    submission.name,
      email:   submission.email,
      company: submission.company || 'N/A',
      cloud:   submission.cloud   || 'N/A',
      message: submission.message || 'N/A',
      source:  'Contact Form'
    })
  }).catch(() => {});

  form.style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}

// Smart reply map: cloud|need -> contextual message
const SMART_REPLIES = {
  'AWS|Cost Optimization':                   'Many AWS users overspend due to idle resources and wrong instance types. Based on what you shared, there is likely room to reduce your bill significantly.',
  'AWS|Security':                            'AWS security often has gaps in IAM policies and open security groups. Based on what you shared, a targeted review could strengthen your setup.',
  'AWS|DevOps / CI-CD':                      'AWS teams often spend hours on manual deployments. Based on what you shared, automating your pipeline could cut deployment time drastically.',
  'AWS|Cloud Migration':                     'Migrating to AWS requires careful planning to avoid downtime. Based on what you shared, we can map out a smooth transition.',
  'AWS|Monitoring':                          'AWS monitoring can get noisy without proper alerting rules. Based on what you shared, we can help improve visibility and reduce alert fatigue.',
  'Azure|Cost Optimization':                 'Azure environments often have underutilised resources driving up costs. Based on what you shared, better resource management could help.',
  'Azure|Security':                          'Azure security benefits from tighter policies and Defender configuration. Based on what you shared, there is scope to harden your environment.',
  'Azure|DevOps / CI-CD':                    'Azure DevOps pipelines can be optimised for faster, more reliable releases. Based on what you shared, we can streamline your workflow.',
  'Azure|Monitoring':                        'Azure monitoring setups often lack centralised dashboards. Based on what you shared, we can improve observability across your environment.',
  'Google Cloud|Monitoring':                 'Google Cloud setups often struggle with alert noise and visibility gaps. Based on what you shared, we can help improve observability and real-time insights.',
  'Google Cloud|Cost Optimization':          'GCP billing can be complex with committed use discounts often missed. Based on what you shared, there is likely savings to unlock.',
  'Google Cloud|Security':                   'GCP security requires careful IAM and VPC configuration. Based on what you shared, a focused review could close key gaps.',
  'Google Cloud|DevOps / CI-CD':             'GCP teams benefit greatly from Cloud Build and automated pipelines. Based on what you shared, we can help speed up your delivery.',
  'Multiple clouds|DevOps / CI-CD':          'Multi-cloud environments often face challenges with deployment consistency and pipeline standardisation. Based on what you shared, having a unified CI/CD strategy across environments makes a significant difference.',
  'Multiple clouds|Cost Optimization':       'Managing costs across multiple clouds is complex — billing models differ and waste is easy to miss. Based on what you shared, a unified cost visibility approach could help.',
  'Multiple clouds|Security':                'Security in multi-cloud setups requires consistent policies across all environments. Based on what you shared, a unified security posture review would be valuable.',
  'Multiple clouds|Monitoring':              'Multi-cloud monitoring often results in fragmented visibility. Based on what you shared, centralising observability across all platforms would improve your response time.',
  'Multiple clouds|Cloud Migration':         'Migrating across multiple cloud environments requires careful orchestration. Based on what you shared, a phased migration plan would reduce risk significantly.',
  'Not using yet|Cloud Migration':           'Moving to cloud for the first time is a big step. Based on what you shared, starting with the right architecture will save time and cost down the line.',
  'Not using yet|Cost Optimization':         'Cloud cost planning before migration is critical. Based on what you shared, we can help you choose the most cost-effective setup from day one.',
  'Not using yet|DevOps / CI-CD':            'Setting up DevOps from scratch gives you the advantage of doing it right the first time. Based on what you shared, we can build a clean, automated pipeline for you.',
};

// Solution suggestions map
const SOLUTIONS = {
  'AWS|Cost Optimization':                   ['Right-size EC2 instances', 'Remove idle resources', 'Set up budget alerts'],
  'AWS|Security':                            ['Audit IAM roles & policies', 'Harden security groups', 'Enable GuardDuty'],
  'AWS|DevOps / CI-CD':                      ['Set up GitHub Actions / CodePipeline', 'Dockerise your application', 'Configure auto-scaling'],
  'AWS|Monitoring':                          ['Set up CloudWatch dashboards', 'Configure smart alerting rules', 'Centralise log aggregation'],
  'Azure|Cost Optimization':                 ['Identify underutilised VMs', 'Set up Cost Management alerts', 'Review reserved capacity'],
  'Azure|Security':                          ['Configure Azure Defender', 'Review RBAC policies', 'Enable Azure Sentinel'],
  'Azure|DevOps / CI-CD':                    ['Set up Azure DevOps pipelines', 'Containerise with AKS', 'Automate with Terraform'],
  'Azure|Monitoring':                        ['Set up Azure Monitor dashboards', 'Configure Application Insights', 'Centralise logs with Log Analytics'],
  'Google Cloud|Monitoring':                 ['Set up Cloud Monitoring dashboards', 'Reduce alert noise with smart policies', 'Centralise logs with Cloud Logging'],
  'Google Cloud|Cost Optimization':          ['Review committed use discounts', 'Identify idle Compute Engine VMs', 'Set up billing alerts'],
  'Google Cloud|Security':                   ['Audit IAM bindings', 'Configure VPC firewall rules', 'Enable Security Command Center'],
  'Google Cloud|DevOps / CI-CD':             ['Set up Cloud Build pipelines', 'Deploy with GKE', 'Automate with Terraform'],
  'Multiple clouds|DevOps / CI-CD':          ['Standardise CI/CD pipelines across all environments', 'Automate deployments with Jenkins / GitHub Actions', 'Securely manage secrets & configs across clouds', 'Improve build & release reliability'],
  'Multiple clouds|Cost Optimization':       ['Unified cost visibility across all clouds', 'Identify duplicate or idle resources', 'Set up cross-cloud budget alerts'],
  'Multiple clouds|Security':                ['Consistent IAM policies across environments', 'Centralised security monitoring', 'Cross-cloud compliance checks'],
  'Multiple clouds|Monitoring':              ['Centralised observability dashboard (Grafana)', 'Unified alerting across all platforms', 'Cross-cloud log aggregation'],
  'Multiple clouds|Cloud Migration':         ['Phased migration planning', 'Zero-downtime cutover strategy', 'Post-migration validation & optimisation'],
  'Not using yet|Cloud Migration':           ['Cloud readiness assessment', 'Architecture design for your use case', 'Cost-optimised setup from day one'],
  'Not using yet|Cost Optimization':         ['Right-sized infrastructure planning', 'Reserved vs on-demand cost modelling', 'Budget alert setup'],
  'Not using yet|DevOps / CI-CD':            ['CI/CD pipeline design from scratch', 'Docker & Kubernetes setup', 'Automated testing & deployment'],
};

function buildFinalMessage(d) {
  const key     = d.cloud + '|' + d.need;
  const reply   = SMART_REPLIES[key] || ('Based on what you shared about your ' + d.cloud + ' usage and ' + d.need + ' needs, our team can suggest the right improvements.');
  const items   = SOLUTIONS[key]     || ['Infrastructure review', 'Performance improvements', 'Cost & security assessment'];
  return reply + '\n\nHere is what we can help with:\n' + items.map(function(i){ return '• ' + i; }).join('\n') + '\n\nAnything specific you would like to add?';
}

function getPersonalizedCTA(d) {
  if (d.budget === 'Above ₹1,00,000')        return '🔥 Book a priority consultation with our cloud expert';
  if (d.budget === '₹25,000 – ₹1,00,000')   return '📞 Schedule a free call with our team';
  return '💬 Connect with us on WhatsApp to explore solutions';
}

// ─── CHATBOT ─────────────────────────────────────────────────────────────────
const CHAT_STEPS = [
  { key: 'name',    bot: "Hi 👋 I'm the CloudZentra assistant. I help businesses with DevOps & cloud solutions. What's your name?", type: 'input' },
  { key: 'email',   bot: function(d) { return 'Nice to meet you, ' + d.name + '! 😊 What is your work email so our team can reach you?'; }, type: 'input' },
  { key: 'cloud',   bot: 'Which cloud platform are you using?', type: 'options', options: ['AWS', 'Azure', 'Google Cloud', 'Not using yet', 'Multiple clouds'] },
  { key: 'need',    bot: 'What do you want to improve?', type: 'options', options: ['Cost Optimization', 'DevOps / CI-CD', 'Cloud Migration', 'Security', 'Monitoring', 'General Inquiry'] },
  { key: 'budget',  bot: 'What is your approximate monthly cloud spend?', type: 'options', options: ['Under ₹5,000', '₹5,000 – ₹25,000', '₹25,000 – ₹1,00,000', 'Above ₹1,00,000'] },
  { key: 'message', bot: function(d) { return buildFinalMessage(d); }, type: 'input', placeholder: 'Type here or press Enter to skip...' },
  { key: 'done',    bot: function(d) { return '✅ Thanks, ' + d.name + '! Our team will reach out at ' + d.email + ' with tailored recommendations.\n\n' + getPersonalizedCTA(d); }, type: 'done' }
];

let chatData = {};
let chatStep = 0;
let chatOpened = false;

function toggleChat() {
  const box = document.getElementById('cz-chatbox');
  const badge = document.getElementById('cz-chat-badge');
  box.classList.toggle('open');
  if (box.classList.contains('open') && !chatOpened) {
    chatOpened = true;
    badge.style.display = 'none';
    setTimeout(() => chatNext(), 400);
  }
}

function chatNext() {
  const step = CHAT_STEPS[chatStep];
  if (!step) return;
  showTyping();
  setTimeout(() => {
    hideTyping();
    const msg = typeof step.bot === 'function' ? step.bot(chatData) : step.bot;
    addChatMsg(msg, 'bot');
    const opts = document.getElementById('cz-chat-options');
    const inp  = document.getElementById('cz-chat-input');
    opts.innerHTML = '';
    if (step.type === 'options') {
      inp.style.display = 'none';
      step.options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'chat-opt';
        btn.textContent = o;
        btn.onclick = () => chatAnswer(o);
        opts.appendChild(btn);
      });
    } else if (step.type === 'done') {
      inp.style.display = 'none';
      saveChatLead();
      // Show WhatsApp CTA button
      const c = JSON.parse(localStorage.getItem('cz_contact') || '{"waNum":"918855865379","waMsg":"Hi CloudZentra! I need help with cloud solutions."}');
      const wa = document.createElement('a');
      wa.href = 'https://wa.me/' + c.waNum + '?text=' + encodeURIComponent(c.waMsg);
      wa.target = '_blank'; wa.rel = 'noopener noreferrer';
      wa.className = 'chat-opt';
      wa.style.textDecoration = 'none';
      wa.textContent = '💬 Chat on WhatsApp';
      opts.appendChild(wa);
    } else {
      inp.placeholder = step.placeholder || 'Type your answer...';
      inp.style.display = '';
      inp.focus();
    }
  }, 800);
}

function showTyping() {
  const msgs = document.getElementById('cz-chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg-bot chat-typing';
  div.id = 'cz-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById('cz-typing');
  if (t) t.remove();
}

function chatSend() {
  const inp = document.getElementById('cz-chat-input');
  const val = inp.value.trim();
  if (!val) return;
  inp.value = '';
  chatAnswer(val);
}

function chatAnswer(val) {
  const step = CHAT_STEPS[chatStep];
  addChatMsg(val, 'user');
  document.getElementById('cz-chat-options').innerHTML = '';
  chatData[step.key] = val;
  chatStep++;
  setTimeout(() => chatNext(), 300);
}

function addChatMsg(text, who) {
  const msgs = document.getElementById('cz-chat-messages');
  const div = document.createElement('div');
  div.className = who === 'bot' ? 'chat-msg-bot' : 'chat-msg-user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function saveChatLead() {
  const submission = {
    id:      Date.now().toString(),
    date:    new Date().toISOString(),
    read:    false,
    name:    chatData.name    || '',
    email:   chatData.email   || '',
    company: '',
    cloud:   chatData.cloud   || '',
    message: `[Chatbot] Need: ${chatData.need || ''} | Budget: ${chatData.budget || ''} | Note: ${chatData.message || ''}`
  };
  const existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));
  fetch('/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: submission.name, email: submission.email, company: 'Via Chatbot', cloud: submission.cloud, message: submission.message, source: 'Chatbot' })
  }).catch(() => {});
}

// Show badge after 8 seconds if chat not opened
setTimeout(() => {
  if (!chatOpened) document.getElementById('cz-chat-badge').style.display = 'flex';
}, 8000);
// ─────────────────────────────────────────────────────────────────────────────

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.1 });

// Cards with stagger delay
document.querySelectorAll('.card, .price-card, .tcard, .about-stat, .value-item, .faq-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 3) * 120;
  revealObserver.observe(el);
});

// Section titles
document.querySelectorAll('.section-title, .section-sub, .about-left, .about-right').forEach(el => {
  revealObserver.observe(el);
});

// Animate cards on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .price-card, .tcard').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
