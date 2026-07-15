export const caseStudyServiceNames = [
  'Customer Support',
  'Back-Office',
  'IT & Software',
  'AI & Automation',
  'Data & Reporting',
] as const;

export type CaseStudyService = (typeof caseStudyServiceNames)[number];

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  contentHtml: string;
  heroImage: string;
  services: CaseStudyService[];
  outcomes: string[];
  tags: string[];
  featured: boolean;
  publishedAt: string;
};

// Illustrative records shaped like the future CMS response.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'scaling-support-across-channels',
    title: 'Scaling customer support across channels',
    client: 'European SaaS platform',
    excerpt:
      'A dedicated support operation designed around clear response targets, escalation paths, and weekly quality reviews.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Support demand was growing faster than the internal team could document and review customer conversations.</p>
      <h2>Our approach</h2>
      <p>BlihOps built a dedicated pod with defined workflows, escalation rules, and quality checks.</p>
      <h2>The outcome</h2>
      <p>The client gained more consistent responses and clearer visibility into service quality.</p>
    `,
    heroImage: '/services/customer.jpg',
    services: ['Customer Support'],
    outcomes: ['Faster response times and more consistent service quality'],
    tags: ['SaaS', 'Omnichannel support'],
    featured: true,
    publishedAt: '2026-05-18',
  },
  {
    slug: 'streamlining-document-processing',
    title: 'Streamlining document processing',
    client: 'Regional logistics group',
    excerpt:
      'A fragmented document queue became a controlled workflow with clear ownership, validation, and daily visibility.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Documents moved through email and spreadsheets, making ownership and completion difficult to track.</p>
      <h2>Our approach</h2>
      <p>We documented the process, introduced quality checkpoints, and created one operating view.</p>
      <h2>The outcome</h2>
      <p>Teams gained cleaner data and fewer processing delays.</p>
    `,
    heroImage: '/services/back-office.jpg',
    services: ['Back-Office'],
    outcomes: ['Cleaner data and fewer processing delays'],
    tags: ['Logistics', 'Document operations'],
    featured: false,
    publishedAt: '2026-04-22',
  },
  {
    slug: 'engineering-support-for-product-roadmap',
    title: 'Engineering support for a product roadmap',
    client: 'B2B software company',
    excerpt:
      'An embedded engineering and QA team added delivery capacity while preserving the client’s standards and sprint rhythm.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Hiring delays were putting roadmap delivery and maintenance work under pressure.</p>
      <h2>Our approach</h2>
      <p>A dedicated pod joined the client’s sprint cadence, review process, and quality standards.</p>
      <h2>The outcome</h2>
      <p>The product team established a steadier release rhythm and stronger QA coverage.</p>
    `,
    heroImage: '/services/software.jpg',
    services: ['IT & Software'],
    outcomes: ['Steadier delivery and improved product stability'],
    tags: ['Software', 'Embedded team'],
    featured: false,
    publishedAt: '2026-03-14',
  },
  {
    slug: 'automating-repetitive-operations',
    title: 'Automating repetitive operations',
    client: 'Insurance services provider',
    excerpt:
      'Practical automation reduced repetitive intake work while keeping judgment and exceptions with trained operators.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Operators spent too much time moving information from incoming documents into internal systems.</p>
      <h2>Our approach</h2>
      <p>We introduced structured extraction, validation rules, and human review for exceptions.</p>
      <h2>The outcome</h2>
      <p>The team spent less time on manual entry and more time on meaningful review.</p>
    `,
    heroImage: '/services/ai.jpg',
    services: ['AI & Automation'],
    outcomes: ['Less manual effort and faster cycle times'],
    tags: ['Insurance', 'Workflow automation'],
    featured: false,
    publishedAt: '2026-02-26',
  },
  {
    slug: 'turning-data-into-clear-decisions',
    title: 'Turning data into clear decisions',
    client: 'Multi-location services company',
    excerpt:
      'Disconnected reports were consolidated into one dependable view of workload, quality, and team performance.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Leaders received different versions of performance data from every location.</p>
      <h2>Our approach</h2>
      <p>BlihOps standardized definitions, cleaned the data, and built a concise reporting cadence.</p>
      <h2>The outcome</h2>
      <p>Weekly decisions could be made from one trusted reporting layer.</p>
    `,
    heroImage: '/services/data.jpg',
    services: ['Data & Reporting'],
    outcomes: ['Better visibility and more informed decisions'],
    tags: ['Reporting', 'KPI visibility'],
    featured: false,
    publishedAt: '2026-01-19',
  },
  {
    slug: 'optimizing-provider-onboarding',
    title: 'Optimizing provider onboarding',
    client: 'Healthcare services network',
    excerpt:
      'A documented onboarding operation improved handoffs, document quality, and visibility across every active case.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Onboarding cases stalled because documents, checks, and ownership were spread across teams.</p>
      <h2>Our approach</h2>
      <p>We established one queue, clear service levels, and structured quality control.</p>
      <h2>The outcome</h2>
      <p>The operation became easier to track with fewer rework loops.</p>
    `,
    heroImage: '/services/back-office.jpg',
    services: ['Back-Office', 'Data & Reporting'],
    outcomes: ['Smoother onboarding and fewer rework loops'],
    tags: ['Healthcare', 'Onboarding'],
    featured: false,
    publishedAt: '2025-12-08',
  },
  {
    slug: 'quality-system-for-customer-conversations',
    title: 'A quality system for every customer conversation',
    client: 'Digital commerce brand',
    excerpt:
      'A shared review framework connected customer conversations to coaching priorities and operational reporting.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>The business lacked a consistent method for reviewing support quality and coaching agents.</p>
      <h2>Our approach</h2>
      <p>We introduced a shared scorecard, calibrated reviews, and recurring issue reporting.</p>
      <h2>The outcome</h2>
      <p>Coaching decisions became grounded in consistent quality data.</p>
    `,
    heroImage: '/services/customer.jpg',
    services: ['Customer Support', 'Data & Reporting'],
    outcomes: ['More focused coaching backed by consistent QA data'],
    tags: ['Commerce', 'Quality assurance'],
    featured: false,
    publishedAt: '2025-11-16',
  },
  {
    slug: 'software-support-with-clear-ownership',
    title: 'Software support with clear ownership',
    client: 'Financial technology company',
    excerpt:
      'A structured maintenance workflow gave product leaders dependable triage, ownership, and release visibility.',
    contentHtml: `
      <h2>The challenge</h2>
      <p>Maintenance work competed with roadmap delivery and lacked a consistent owner.</p>
      <h2>Our approach</h2>
      <p>A focused support team introduced triage rules, service levels, and release reporting.</p>
      <h2>The outcome</h2>
      <p>Issues moved through a clearer path from report to resolution.</p>
    `,
    heroImage: '/services/software.jpg',
    services: ['IT & Software'],
    outcomes: ['Clearer triage and more predictable issue resolution'],
    tags: ['Fintech', 'Software support'],
    featured: false,
    publishedAt: '2025-10-04',
  },
];
