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
  e.target.style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}

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
