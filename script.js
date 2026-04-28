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

const services = [
  {
    icon: '&#9729;&#65039;',
    title: 'Cloud Solutions (AWS / Azure / GCP)',
    desc: 'We design, deploy, and manage cloud infrastructure tailored to your business needs. From architecture design to full migration and auto-scaling — with zero downtime, full data integrity, and security compliance built in from day one.',
    includes: ['Cloud architecture design & planning', 'Migration to AWS / Azure / GCP', 'Auto-scaling infrastructure setup', 'Cost optimization strategies', 'IAM roles, VPC & networking setup', 'Post-migration testing & validation'],
    tags: ['AWS', 'Azure', 'GCP', 'EC2', 'S3', 'RDS', 'VPC', 'Route 53'],
    ideal: 'Startups moving to cloud for the first time, or businesses migrating from on-premise servers to a managed cloud environment.'
  },
  {
    icon: '&#9889;',
    title: 'DevOps & Automation',
    desc: 'Speed up deployments and improve reliability with modern DevOps practices. We build fully automated CI/CD pipelines, containerize your applications, and manage orchestration — so your team ships faster with fewer errors.',
    includes: ['CI/CD pipeline setup (GitHub Actions / Jenkins)', 'Infrastructure as Code (Terraform)', 'Docker containerization', 'Kubernetes cluster setup & management', 'Monitoring & logging integration', 'Blue-green & rolling deployments'],
    tags: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins', 'Helm', 'ArgoCD'],
    ideal: 'Development teams that want faster, reliable deployments and want to eliminate manual release processes.'
  },
  {
    icon: '&#128187;',
    title: 'Web & Application Development',
    desc: 'We build scalable, high-performance applications designed to grow with your business. From custom web apps to full SaaS platforms — built on modern stacks and deployed on cloud infrastructure.',
    includes: ['Custom web application development', 'SaaS platform development', 'API development & integration', 'Backend systems & microservices', 'Cloud-native architecture', 'Performance optimization'],
    tags: ['Node.js', 'Python', 'React', 'REST APIs', 'PostgreSQL', 'AWS Lambda', 'Serverless'],
    ideal: 'Startups and businesses that need a reliable technical partner to build and scale their product on cloud infrastructure.'
  },
  {
    icon: '&#128272;',
    title: 'Cloud Security',
    desc: 'Protect your infrastructure and data with enterprise-grade security. We harden your cloud environment against threats — from misconfigured IAM policies to open ports and unencrypted data.',
    includes: ['IAM & access control audit & hardening', 'Data encryption at rest & in transit', 'VPC security groups & firewall rules', 'Security audits & vulnerability scanning', 'Compliance support (SOC2, GDPR basics)', 'Security incident response plan'],
    tags: ['AWS IAM', 'AWS Shield', 'Azure Defender', 'SSL/TLS', 'WAF', 'GuardDuty', 'Security Hub'],
    ideal: 'Businesses handling sensitive customer data, fintech, healthtech, or any company that needs to meet compliance requirements.'
  },
  {
    icon: '&#128176;',
    title: 'Cost Optimization',
    desc: 'Most businesses overpay for cloud by 30–40% due to idle resources, wrong instance types, and lack of monitoring. We audit your entire cloud bill and implement changes that reduce costs immediately — without affecting performance.',
    includes: ['Full cloud cost audit & report', 'Right-sizing EC2 / VM instances', 'Reserved instance & savings plan recommendations', 'Identifying & removing idle resources', 'S3 storage lifecycle policies', 'Budget alerts & cost dashboards'],
    tags: ['AWS Cost Explorer', 'Azure Cost Management', 'CloudWatch', 'Trusted Advisor', 'Savings Plans'],
    ideal: 'Any business already on cloud that wants to reduce their monthly bill and get more value from their existing infrastructure.'
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
  // Honeypot spam check
  if (form.querySelector('[name="_honeypot"]').value) return;
  const submission = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
    name:    form.querySelector('[name="name"]').value.trim(),
    email:   form.querySelector('[name="email"]').value.trim(),
    company: form.querySelector('[name="company"]').value.trim(),
    cloud:   form.querySelector('[name="cloud"]').value,
    message: form.querySelector('[name="message"]').value.trim(),
    source:  'Contact Form'
  };
  // Save to Worker KV (persistent, any device)
  fetch('https://cloudzentra-api.samirpandey65.workers.dev/save-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission)
  }).catch(() => {});
  // Also save to localStorage as fallback
  const existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));
  form.style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}

// Savings Calculator
function calcSavings() {
  var input = parseFloat(document.getElementById('calc-input').value) || 0;
  var result = document.getElementById('calc-result');
  if (input < 1000) { result.style.display = 'none'; return; }
  var saving = Math.round(input * 0.33);
  var optimized = input - saving;
  document.getElementById('calc-save').textContent    = '\u20b9' + saving.toLocaleString('en-IN') + '/mo';
  document.getElementById('calc-annual').textContent  = '\u20b9' + (saving * 12).toLocaleString('en-IN') + '/yr';
  document.getElementById('calc-optimized').textContent = '\u20b9' + optimized.toLocaleString('en-IN') + '/mo';
  result.style.display = 'flex';
}

// Lead magnet form
function handleAuditSubmit(e) {
  e.preventDefault();
  var form = e.target;
  if (form.querySelector('[name="_honeypot"]').value) return;
  var submission = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
    name:    form.querySelector('[name="name"]').value.trim(),
    email:   form.querySelector('[name="email"]').value.trim(),
    company: form.querySelector('[name="company"]').value.trim(),
    cloud:   form.querySelector('[name="cloud"]').value,
    message: '[Audit Request]',
    source:  'Audit Form'
  };
  fetch('https://cloudzentra-api.samirpandey65.workers.dev/save-lead', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(submission)
  }).catch(function(){});
  var existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));
  form.style.display = 'none';
  document.getElementById('audit-success').style.display = 'block';
}


const SMART_REPLIES = {
  'AWS|Cost Optimization': 'Many AWS users overspend due to idle resources. Based on what you shared, there is likely room to reduce your bill significantly.',
  'AWS|Security': 'AWS security often has gaps in IAM policies. Based on what you shared, a targeted review could strengthen your setup.',
  'AWS|DevOps / CI-CD': 'AWS teams often spend hours on manual deployments. Based on what you shared, automating your pipeline could cut deployment time drastically.',
  'AWS|Cloud Migration': 'Migrating to AWS requires careful planning. Based on what you shared, we can map out a smooth transition.',
  'AWS|Monitoring': 'AWS monitoring can get noisy without proper alerting rules. Based on what you shared, we can help improve visibility.',
  'AWS|General Inquiry': 'AWS has a vast range of services. Based on what you shared, we can help identify the right setup for your needs.',
  'Azure|Cost Optimization': 'Azure environments often have underutilised resources. Based on what you shared, better resource management could help.',
  'Azure|Security': 'Azure security benefits from tighter policies. Based on what you shared, there is scope to harden your environment.',
  'Azure|DevOps / CI-CD': 'Azure DevOps pipelines can be optimised for faster releases. Based on what you shared, we can streamline your workflow.',
  'Azure|Cloud Migration': 'Azure migrations require careful planning. Based on what you shared, a structured migration roadmap would ensure a smooth transition.',
  'Azure|Monitoring': 'Azure monitoring setups often lack centralised dashboards. Based on what you shared, we can improve observability.',
  'Azure|General Inquiry': 'Azure is a powerful platform. Based on what you shared, we can help identify the right services for your needs.',
  'Google Cloud|Monitoring': 'Google Cloud setups often struggle with alert noise. Based on what you shared, we can help improve observability.',
  'Google Cloud|Cost Optimization': 'GCP billing can be complex. Based on what you shared, there is likely savings to unlock.',
  'Google Cloud|Security': 'GCP security requires careful IAM configuration. Based on what you shared, a focused review could close key gaps.',
  'Google Cloud|DevOps / CI-CD': 'GCP teams benefit greatly from Cloud Build. Based on what you shared, we can help speed up your delivery.',
  'Google Cloud|Cloud Migration': 'Migrating to GCP requires careful workload assessment. Based on what you shared, we can map out a smooth transition.',
  'Google Cloud|General Inquiry': 'Google Cloud offers strong data capabilities. Based on what you shared, we can help you get started efficiently.',
  'Multiple clouds|DevOps / CI-CD': 'Multi-cloud environments often face pipeline consistency challenges. Based on what you shared, a unified CI/CD strategy makes a significant difference.',
  'Multiple clouds|Cost Optimization': 'Managing costs across multiple clouds is complex. Based on what you shared, a unified cost visibility approach could help.',
  'Multiple clouds|Security': 'Security in multi-cloud setups requires consistent policies. Based on what you shared, a unified security posture review would be valuable.',
  'Multiple clouds|Monitoring': 'Multi-cloud monitoring often results in fragmented visibility. Based on what you shared, centralising observability would improve your response time.',
  'Multiple clouds|Cloud Migration': 'Migrating across multiple clouds requires careful orchestration. Based on what you shared, a phased migration plan would reduce risk.',
  'Not using yet|Cloud Migration': 'Moving to cloud for the first time is a big step. Based on what you shared, starting with the right architecture will save time and cost.',
  'Not using yet|Cost Optimization': 'Cloud cost planning before migration is critical. Based on what you shared, we can help you choose the most cost-efficient setup.',
  'Not using yet|DevOps / CI-CD': 'Setting up DevOps from scratch gives you the advantage of doing it right. Based on what you shared, we can build a clean automated pipeline.',
  'Not using yet|General Inquiry': 'Great time to explore cloud options. Based on what you shared, we can guide you through the right starting point.',
  'Not using yet|Security': 'Planning security from the start is the smartest move. Based on what you shared, we can help you build a secure foundation.',
  'Not using yet|Monitoring': 'Setting up monitoring early means fewer surprises later. Based on what you shared, we can help you build visibility from day one.',
};

const SOLUTIONS = {
  'AWS|Cost Optimization': ['Right-size EC2 instances', 'Remove idle resources', 'Set up budget alerts'],
  'AWS|Security': ['Audit IAM roles & policies', 'Harden security groups', 'Enable GuardDuty'],
  'AWS|DevOps / CI-CD': ['Set up GitHub Actions / CodePipeline', 'Dockerise your application', 'Configure auto-scaling'],
  'AWS|Monitoring': ['Set up CloudWatch dashboards', 'Configure smart alerting rules', 'Centralise log aggregation'],
  'AWS|General Inquiry': ['AWS service selection & architecture', 'Cost & performance planning', 'Security & compliance setup'],
  'Azure|Cost Optimization': ['Identify underutilised VMs', 'Set up Cost Management alerts', 'Review reserved capacity'],
  'Azure|Security': ['Configure Azure Defender', 'Review RBAC policies', 'Enable Azure Sentinel'],
  'Azure|DevOps / CI-CD': ['Set up Azure DevOps pipelines', 'Containerise with AKS', 'Automate with Terraform'],
  'Azure|Cloud Migration': ['Structured migration roadmap', 'Zero-downtime cutover strategy', 'Post-migration optimisation'],
  'Azure|Monitoring': ['Set up Azure Monitor dashboards', 'Configure Application Insights', 'Centralise logs with Log Analytics'],
  'Azure|General Inquiry': ['Azure service selection & architecture', 'Cost & performance planning', 'Security & compliance setup'],
  'Google Cloud|Monitoring': ['Set up Cloud Monitoring dashboards', 'Reduce alert noise', 'Centralise logs with Cloud Logging'],
  'Google Cloud|Cost Optimization': ['Review committed use discounts', 'Identify idle Compute Engine VMs', 'Set up billing alerts'],
  'Google Cloud|Security': ['Audit IAM bindings', 'Configure VPC firewall rules', 'Enable Security Command Center'],
  'Google Cloud|DevOps / CI-CD': ['Set up Cloud Build pipelines', 'Deploy with GKE', 'Automate with Terraform'],
  'Google Cloud|Cloud Migration': ['Workload assessment & migration planning', 'Zero-downtime migration strategy', 'Post-migration optimisation'],
  'Google Cloud|General Inquiry': ['GCP service selection & architecture', 'Cost & performance planning', 'Security & compliance setup'],
  'Multiple clouds|DevOps / CI-CD': ['Standardise CI/CD pipelines across environments', 'Automate deployments with Jenkins / GitHub Actions', 'Securely manage secrets across clouds'],
  'Multiple clouds|Cost Optimization': ['Unified cost visibility across all clouds', 'Identify duplicate or idle resources', 'Set up cross-cloud budget alerts'],
  'Multiple clouds|Security': ['Consistent IAM policies across environments', 'Centralised security monitoring', 'Cross-cloud compliance checks'],
  'Multiple clouds|Monitoring': ['Centralised observability dashboard (Grafana)', 'Unified alerting across all platforms', 'Cross-cloud log aggregation'],
  'Multiple clouds|Cloud Migration': ['Phased migration planning', 'Zero-downtime cutover strategy', 'Post-migration validation'],
  'Not using yet|Cloud Migration': ['Cloud readiness assessment', 'Architecture design for your use case', 'Cost-optimised setup from day one'],
  'Not using yet|Cost Optimization': ['Right-sized infrastructure planning', 'Reserved vs on-demand cost modelling', 'Budget alert setup'],
  'Not using yet|DevOps / CI-CD': ['CI/CD pipeline design from scratch', 'Docker & Kubernetes setup', 'Automated testing & deployment'],
  'Not using yet|General Inquiry': ['Cloud platform comparison (AWS / Azure / GCP)', 'Starter architecture design', 'Cost & timeline estimate'],
  'Not using yet|Security': ['Security-first architecture design', 'IAM & access control setup', 'Compliance checklist for your industry'],
  'Not using yet|Monitoring': ['Monitoring strategy from day one', 'Alerting & dashboard setup', 'Log management planning'],
};

function getCloudKey(d) {
  return d.cloud || '';
}

function getNeedKey(d) {
  var map = {
    'Reduce cloud costs': 'Cost Optimization',
    'Automate deployments (CI/CD)': 'DevOps / CI-CD',
    'Improve security': 'Security',
    'Better monitoring': 'Monitoring',
    'Cloud migration': 'Cloud Migration',
    'General inquiry': 'General Inquiry',
    'Move to cloud': 'Cloud Migration',
    'Set up DevOps': 'DevOps / CI-CD',
    'Build new infrastructure': 'Cloud Migration',
    'Just exploring': 'General Inquiry'
  };
  return map[d.need] || d.need;
}

function scoreLead(d) {
  var score = 0;
  var b = d.budget || '';
  if (b.includes('1,00,000') || b.includes('50,000')) score += 40;
  else if (b.includes('25,000') || b.includes('10,000')) score += 20;
  else score += 5;
  if (d.cloud !== 'Not using yet') score += 20;
  var highNeeds = ['Reduce cloud costs','Automate deployments (CI/CD)','Improve security','Cloud migration','Move to cloud'];
  if (highNeeds.indexOf(d.need) !== -1) score += 20;
  if (score >= 60) return 'HOT';
  if (score >= 30) return 'WARM';
  return 'COLD';
}

function buildFinalMessage(d) {
  var cloud = getCloudKey(d);
  var need  = getNeedKey(d);
  var key   = cloud + '|' + need;
  var items = SOLUTIONS[key] || ['Infrastructure review', 'Performance improvements', 'Cost & security assessment'];
  var reply = SMART_REPLIES[key] || '';
  if (cloud === 'Not using yet') {
    var bReply = reply || 'Great time to start with cloud. Based on what you shared, we can guide you through the right starting point.';
    return bReply + '\n\nFor your use case, we recommend:\n' + items.map(function(i){ return '\u2022 ' + i; }).join('\n') + '\n\nStarting correctly saves a lot of cost and effort later.\n\nAnything specific you would like to add? (or press Enter to skip)';
  }
  if (reply) {
    return reply + '\n\nHere is what we can help with:\n' + items.map(function(i){ return '\u2022 ' + i; }).join('\n') + '\n\nWould you like to add anything? (or press Enter to skip)';
  }
  return 'Based on what you shared, our team can suggest the right improvements for your ' + cloud + ' setup.\n\nHere is what we can help with:\n' + items.map(function(i){ return '\u2022 ' + i; }).join('\n') + '\n\nAnything specific to add? (or press Enter to skip)';
}

function getPersonalizedCTA(d) {
  var score = scoreLead(d);
  if (score === 'HOT') return '\ud83d\udd25 Our team will prioritise your request. Expect a call within a few hours.';
  if (score === 'WARM') return '\ud83d\udcde We will reach out within 24 hours to discuss the best approach.';
  return '\ud83d\udcac Connect with us on WhatsApp anytime for a quick chat.';
}

// Chatbot modes defined above

// FAQ Knowledge Base
var FAQ = {
  'services': 'We offer: Cloud Setup & Migration, DevOps Automation, Cost Optimization, Monitoring & Alerts, Cloud Security, and Managed Support.',
  'pricing': 'Our pricing starts at \u20b910,000 for basic cloud setup. Growth plans at \u20b940,000 and Pro at \u20b91,00,000. Contact us for a custom quote.',
  'aws': 'Yes, we work with AWS. We handle EC2, S3, IAM, VPC, RDS, Route 53 and more.',
  'azure': 'Yes, we work with Microsoft Azure including AKS, Azure DevOps, Defender, and more.',
  'gcp': 'Yes, we work with Google Cloud Platform including GKE, Cloud Build, Cloud Monitoring and more.',
  'devops': 'We set up CI/CD pipelines using GitHub Actions, Jenkins, Docker, Kubernetes and Terraform.',
  'security': 'We handle IAM hardening, VPC security, encryption, compliance checks and vulnerability scanning.',
  'cost': 'We audit your cloud bill and typically reduce costs by 20-40% through right-sizing, removing idle resources and setting up budget alerts.',
  'migration': 'We migrate your infrastructure to AWS, Azure or GCP with zero downtime and full data integrity.',
  'monitoring': 'We set up real-time dashboards using Grafana, Prometheus and CloudWatch with smart alerting.',
  'support': 'We offer 24/7 managed support retainer plans starting at \u20b95,000/month.',
  'time': 'Starter projects take 1 week, Growth 2 weeks, Pro 3-4 weeks.',
  'contact': 'You can reach us at info@cloudzentra.in or chat with us on WhatsApp.',
  'about': 'CloudZentra is a cloud and DevOps solutions company helping startups and businesses build reliable, scalable infrastructure on AWS, Azure and GCP.',
  'nda': 'Yes, we sign an NDA before every engagement. Your data and code are fully protected.',
  'sla': 'Yes, every project comes with a clear SLA and delivery timeline.',
};

function getAutoReply(text) {
  var t = text.toLowerCase();
  if (t.includes('service') || t.includes('what do you do') || t.includes('offer') || t.includes('help')) return FAQ.services;
  if (t.includes('price') || t.includes('how much') || t.includes('pricing') || t.includes('charge') || t.includes('fee') || t.includes('rate')) return FAQ.pricing;
  if (t.includes('aws') || t.includes('amazon')) return FAQ.aws;
  if (t.includes('azure') || t.includes('microsoft')) return FAQ.azure;
  if (t.includes('gcp') || t.includes('google cloud') || t.includes('google')) return FAQ.gcp;
  if (t.includes('devops') || t.includes('ci/cd') || t.includes('cicd') || t.includes('pipeline') || t.includes('docker') || t.includes('kubernetes') || t.includes('k8s') || t.includes('deploy') || t.includes('automation')) return FAQ.devops;
  if (t.includes('secur') || t.includes('iam') || t.includes('compliance') || t.includes('hack') || t.includes('protect') || t.includes('privacy')) return FAQ.security;
  if (t.includes('reduc') || t.includes('optim') || t.includes('bill') || t.includes('saving') || t.includes('expensive') || t.includes('cheap') || t.includes('budget') || t.includes('cost')) return FAQ.cost;
  if (t.includes('migrat') || t.includes('move') || t.includes('transfer') || t.includes('shift')) return FAQ.migration;
  if (t.includes('monitor') || t.includes('alert') || t.includes('grafana') || t.includes('prometheus') || t.includes('dashboard') || t.includes('observ') || t.includes('log')) return FAQ.monitoring;
  if (t.includes('support') || t.includes('retainer') || t.includes('managed') || t.includes('24/7') || t.includes('247')) return FAQ.support;
  if (t.includes('how long') || t.includes('duration') || t.includes('week') || t.includes('deliver') || t.includes('timeline')) return FAQ.time;
  if (t.includes('contact') || t.includes('email') || t.includes('reach') || t.includes('phone') || t.includes('call') || t.includes('whatsapp')) return FAQ.contact;
  if (t.includes('about') || t.includes('who are') || t.includes('company') || t.includes('cloudzentra') || t.includes('team') || t.includes('founded')) return FAQ.about;
  if (t.includes('nda') || t.includes('confidential') || t.includes('data safe')) return FAQ.nda;
  if (t.includes('sla') || t.includes('guarantee') || t.includes('contract') || t.includes('agreement')) return FAQ.sla;
  if (t.includes('tech') || t.includes('tool') || t.includes('stack') || t.includes('terraform') || t.includes('jenkins') || t.includes('helm') || t.includes('cloud') || t.includes('infrastructure')) return FAQ.services;
  return null;
}

// Chatbot mode: 'menu' | 'faq' | 'quote'
var chatMode = 'menu';
var chatData = {};
var chatStep = 0;
var chatOpened = false;

var QUOTE_STEPS = [
  { key: 'name',    bot: 'What is your name?', type: 'input' },
  { key: 'email',   bot: function(d){ return 'Thanks ' + d.name + '! What is your work email?'; }, type: 'input' },
  { key: 'cloud',   bot: 'Which cloud platform are you using?', type: 'options', options: ['AWS', 'Azure', 'Google Cloud', 'Multiple clouds', 'Not using yet'] },
  { key: 'need',    bot: function(d){
      if (d.cloud === 'Not using yet') return 'What are you looking to do?';
      return 'What is your main challenge?';
    }, type: 'options', options: function(d){
      if (d.cloud === 'Not using yet') return ['Move to cloud', 'Set up DevOps', 'Build new infrastructure', 'Just exploring'];
      return ['Reduce cloud costs', 'Automate deployments (CI/CD)', 'Improve security', 'Better monitoring', 'Cloud migration', 'General inquiry'];
    }},
  { key: 'budget',  bot: function(d){
      if (d.cloud === 'Not using yet') return 'What is your approximate monthly IT budget?';
      return 'What is your approximate monthly cloud spend?';
    }, type: 'options', options: function(d){
      if (d.cloud === 'Not using yet') return ['Under \u20b910,000', '\u20b910,000 \u2013 \u20b950,000', 'Above \u20b950,000', 'Not sure yet'];
      return ['Under \u20b95,000', '\u20b95,000 \u2013 \u20b925,000', '\u20b925,000 \u2013 \u20b91,00,000', 'Above \u20b91,00,000'];
    }},
  { key: 'message', bot: function(d){ return buildFinalMessage(d); }, type: 'input', placeholder: 'Any specific details? (or press Enter to skip)' },
  { key: 'done',    bot: function(d){ return '\u2705 Thanks, ' + d.name + '! Our team will reach out at ' + d.email + '.\n\n' + getPersonalizedCTA(d); }, type: 'done' }
];

function toggleChat() {
  var box = document.getElementById('cz-chatbox');
  var badge = document.getElementById('cz-chat-badge');
  box.classList.toggle('open');
  if (box.classList.contains('open') && !chatOpened) {
    chatOpened = true;
    badge.style.display = 'none';
    setTimeout(showMenu, 400);
  }
}

function showMenu() {
  chatMode = 'menu';
  addChatMsg('Hi \ud83d\udc4b Welcome to CloudZentra! How can I help you?', 'bot');
  var opts = document.getElementById('cz-chat-options');
  var inp = document.getElementById('cz-chat-input');
  opts.innerHTML = '';
  inp.style.display = 'none';
  [['\ud83d\udcac Ask a question', 'faq'], ['\ud83d� Get a quote', 'quote']].forEach(function(item){
    var btn = document.createElement('button');
    btn.className = 'chat-opt';
    btn.textContent = item[0];
    btn.onclick = function(){ selectMode(item[1]); };
    opts.appendChild(btn);
  });
}

function selectMode(mode) {
  chatMode = mode;
  document.getElementById('cz-chat-options').innerHTML = '';
  if (mode === 'faq') {
    addChatMsg('\ud83d\udc4d Sure! Ask me anything about our services, pricing, technologies or how we work.', 'bot');
    var inp = document.getElementById('cz-chat-input');
    inp.placeholder = 'Type your question...';
    inp.style.display = '';
    inp.focus();
  } else {
    chatData = {}; chatStep = 0;
    addChatMsg('\ud83d� Let me collect a few details to prepare the right solution for you.', 'bot');
    setTimeout(quoteNext, 500);
  }
}

function quoteNext() {
  var step = QUOTE_STEPS[chatStep];
  if (!step) return;
  showTyping();
  setTimeout(function(){
    hideTyping();
    var msg = typeof step.bot === 'function' ? step.bot(chatData) : step.bot;
    var stepType = typeof step.type === 'function' ? step.type(chatData) : step.type;
    var stepOpts = typeof step.options === 'function' ? step.options(chatData) : step.options;
    addChatMsg(msg, 'bot');
    var opts = document.getElementById('cz-chat-options');
    var inp  = document.getElementById('cz-chat-input');
    opts.innerHTML = '';
    if (stepType === 'options') {
      inp.style.display = 'none';
      stepOpts.forEach(function(o){
        var btn = document.createElement('button');
        btn.className = 'chat-opt';
        btn.textContent = o;
        btn.onclick = function(){ quoteAnswer(o); };
        opts.appendChild(btn);
      });
    } else if (stepType === 'done') {
      inp.style.display = 'none';
      saveChatLead();
      var c = JSON.parse(localStorage.getItem('cz_contact') || '{"waNum":"918855865379"}');
      var wa = document.createElement('a');
      wa.href = 'https://wa.me/' + c.waNum + '?text=' + encodeURIComponent('Hi CloudZentra! I need help.');
      wa.target = '_blank'; wa.rel = 'noopener noreferrer';
      wa.className = 'chat-opt'; wa.style.textDecoration = 'none';
      wa.textContent = '\ud83d\udcac Chat on WhatsApp';
      opts.appendChild(wa);
      var restart = document.createElement('button');
      restart.className = 'chat-opt';
      restart.textContent = '\ud83d\udd04 Start over';
      restart.onclick = function(){ document.getElementById('cz-chat-messages').innerHTML = ''; showMenu(); };
      opts.appendChild(restart);
    } else {
      inp.placeholder = step.placeholder || 'Type your answer...';
      inp.style.display = '';
      inp.focus();
    }
  }, 800);
}

function quoteAnswer(val) {
  var step = QUOTE_STEPS[chatStep];
  addChatMsg(val, 'user');
  document.getElementById('cz-chat-options').innerHTML = '';
  chatData[step.key] = val;
  chatStep++;
  setTimeout(quoteNext, 300);
}

function chatSend() {
  var inp = document.getElementById('cz-chat-input');
  var val = inp.value.trim();
  inp.value = '';
  if (!val) {
    if (chatMode === 'quote') quoteAnswer('(skipped)');
    return;
  }
  addChatMsg(val, 'user');
  document.getElementById('cz-chat-options').innerHTML = '';
  if (chatMode === 'faq') {
    var reply = getAutoReply(val);
    showTyping();
    setTimeout(function(){
      hideTyping();
      if (reply) {
        addChatMsg(reply, 'bot');
      } else {
        addChatMsg('I\'m not sure about that specific question. Here\'s what I can help with: services, pricing, AWS/Azure/GCP, DevOps, security, cost optimization, migration, monitoring, or support. Or get a quote directly!', 'bot');
      }
      // Show options after reply
      var opts = document.getElementById('cz-chat-options');
      opts.innerHTML = '';
      var more = document.createElement('button');
      more.className = 'chat-opt'; more.textContent = '\ud83d\udcac Ask another question';
      more.onclick = function(){ opts.innerHTML = ''; inp.style.display=''; inp.focus(); };
      opts.appendChild(more);
      var quote = document.createElement('button');
      quote.className = 'chat-opt'; quote.textContent = '\ud83d� Get a quote';
      quote.onclick = function(){ opts.innerHTML=''; selectMode('quote'); };
      opts.appendChild(quote);
      inp.style.display = 'none';
    }, 800);
  } else if (chatMode === 'quote') {
    var step = QUOTE_STEPS[chatStep];
    if (step) { chatData[step.key] = val; chatStep++; setTimeout(quoteNext, 300); }
  }
}

function showTyping() {
  var msgs = document.getElementById('cz-chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg-bot chat-typing'; div.id = 'cz-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div); msgs.scrollTop = msgs.scrollHeight;
}

function hideTyping() {
  var t = document.getElementById('cz-typing');
  if (t) t.remove();
}

function addChatMsg(text, who) {
  var msgs = document.getElementById('cz-chat-messages');
  var div = document.createElement('div');
  div.className = who === 'bot' ? 'chat-msg-bot' : 'chat-msg-user';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function saveChatLead() {
  var submission = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    read: false,
    name: chatData.name || '',
    email: chatData.email || '',
    company: '',
    cloud: getCloudKey(chatData),
    need: getNeedKey(chatData),
    budget: chatData.budget || '',
    message: '[Chatbot] Need: ' + (chatData.need||'') + ' | Budget: ' + (chatData.budget||'') + ' | Note: ' + (chatData.message||''),
    source: 'Chatbot',
    score: scoreLead(chatData)
  };
  fetch('https://cloudzentra-api.samirpandey65.workers.dev/save-lead', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify(submission)
  }).catch(function(){});
  var existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));
}

setTimeout(function() {
  if (!chatOpened) document.getElementById('cz-chat-badge').style.display = 'flex';
}, 8000);


// Case Study Chart
window.addEventListener('load', function() {
  var canvas = document.getElementById('costChart');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  canvas.width = 320; canvas.height = 300;
  var before = 15000, after = 10500, max = before;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i <= 4; i++) {
    var y = 50 + i * 50;
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(300, y); ctx.stroke();
  }
  function drawBar(x, value, label, color) {
    var height = (value / max) * 200;
    ctx.fillStyle = color;
    ctx.beginPath();
    if (ctx.roundRect) { ctx.roundRect(x, 250 - height, 80, height, 8); } else { ctx.rect(x, 250 - height, 80, height); }
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('\u20b9' + value.toLocaleString('en-IN'), x + 40, 245 - height);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Inter';
    ctx.fillText(label, x + 40, 272);
  }
  drawBar(60, before, 'Before', '#ef4444');
  drawBar(180, after, 'After', '#22c55e');
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 13px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('~30% savings', 160, 295);
});

// Button ripple effect
document.querySelectorAll('.btn-primary').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    var circle = document.createElement('span');
    circle.classList.add('ripple');
    var rect = this.getBoundingClientRect();
    circle.style.left = (e.clientX - rect.left) + 'px';
    circle.style.top  = (e.clientY - rect.top)  + 'px';
    this.appendChild(circle);
    setTimeout(function(){ circle.remove(); }, 600);
  });
});

// Lead popup — show after 20s, only once per session
if (!sessionStorage.getItem('cz_popup_shown')) {
  setTimeout(function() {
    document.getElementById('cz-popup').style.display = 'flex';
    sessionStorage.setItem('cz_popup_shown', '1');
  }, 20000);
}
function closePopup() {
  document.getElementById('cz-popup').style.display = 'none';
}
function handlePopupSubmit(e) {
  e.preventDefault();
  var form = e.target;
  if (form.querySelector('[name="_honeypot"]').value) return;
  var submission = {
    id: Date.now().toString(), date: new Date().toISOString(), read: false,
    name: form.querySelector('[name="name"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    company: '', cloud: '', message: '[Popup Lead]', source: 'Popup'
  };
  fetch('https://cloudzentra-api.samirpandey65.workers.dev/save-lead', {
    method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(submission)
  }).catch(function(){});
  var existing = JSON.parse(localStorage.getItem('cn_submissions') || '[]');
  existing.unshift(submission);
  localStorage.setItem('cn_submissions', JSON.stringify(existing));
  form.style.display = 'none';
  document.getElementById('popup-success').style.display = 'block';
  setTimeout(closePopup, 2500);
}

// Scroll story reveal
var storyItems = document.querySelectorAll('.story-item');
var storyObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      storyObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
storyItems.forEach(function(item, i) {
  item.style.transitionDelay = (i * 0.15) + 's';
  storyObserver.observe(item);
});

// Architecture diagram hover
var archNodes = document.querySelectorAll('.node');
var archInfo  = document.getElementById('arch-info');
if (archInfo) {
  archNodes.forEach(function(node) {
    node.addEventListener('mouseenter', function() {
      archInfo.textContent = this.dataset.info;
      archInfo.style.color = '#38bdf8';
    });
    node.addEventListener('mouseleave', function() {
      archInfo.textContent = '\ud83d\udc49 Hover over any component to learn more';
      archInfo.style.color = '';
    });
  });
}

// GA4 event tracking
function safeGtag() {
  if (typeof gtag === 'function') gtag.apply(null, arguments);
}
document.querySelectorAll('.whatsapp-btn').forEach(function(btn) {
  btn.addEventListener('click', function() { safeGtag('event', 'whatsapp_click'); });
});
document.querySelectorAll('.btn-primary').forEach(function(btn) {
  btn.addEventListener('click', function() { safeGtag('event', 'cta_click', { btn_text: this.textContent.trim() }); });
});
document.querySelectorAll('.btn-lm').forEach(function(btn) {
  btn.addEventListener('click', function() { safeGtag('event', 'consultation_form_submit'); });
});

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
