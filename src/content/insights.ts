export const insightCategoryNames = [
  'Operations Design',
  'AI & Automation',
  'Customer Experience',
  'Data & Reporting',
  'Team & Delivery',
] as const;

export type InsightCategory = (typeof insightCategoryNames)[number];

export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  heroImage: string;
  category: InsightCategory;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  publishedAt: string;
};

// Illustrative records shaped like the future CMS response.
export const insights: Insight[] = [
  {
    slug: 'designing-an-outsourcing-pilot-that-proves-value',
    title: 'Designing an outsourcing pilot that proves value',
    excerpt:
      'A useful pilot tests the operating model, not just whether a few tasks can be completed by another team.',
    contentHtml: `
      <h2>Start with a decision</h2>
      <p>A pilot should answer a specific business question: can this workflow be transferred safely, managed consistently, and improved over time?</p>
      <h2>Define the operating boundary</h2>
      <p>Choose a workflow with clear inputs, owners, exceptions, and completion criteria. Document what remains with the client and what the delivery pod owns.</p>
      <h2>Measure evidence, not activity</h2>
      <p>Review quality, handoffs, visibility, and the effort required from the internal team. Volume alone does not prove that the model will scale.</p>
    `,
    heroImage: '/services/back-office.jpg',
    category: 'Operations Design',
    author: 'BlihOps Editorial',
    readTime: '6 min read',
    tags: ['Outsourcing', 'Pilot design', 'Operations'],
    featured: true,
    publishedAt: '2026-06-12',
  },
  {
    slug: 'what-to-automate-first-in-back-office-operations',
    title: 'What to automate first in back-office operations',
    excerpt:
      'The best first automation is rarely the largest workflow. It is the repeatable step with clear rules and visible exceptions.',
    contentHtml: `
      <h2>Look for stable repetition</h2>
      <p>Start with work that follows a recognizable pattern and uses dependable inputs. Automating an unstable process usually makes its problems move faster.</p>
      <h2>Keep exceptions visible</h2>
      <p>Automation should separate routine work from uncertain cases, then give operators enough source context to make a decision.</p>
      <h2>Design the review loop</h2>
      <p>Track where validation fails, why people override results, and which upstream changes would improve performance.</p>
    `,
    heroImage: '/services/ai.jpg',
    category: 'AI & Automation',
    author: 'BlihOps Editorial',
    readTime: '7 min read',
    tags: ['Automation', 'Back-office', 'Human review'],
    featured: false,
    publishedAt: '2026-05-27',
  },
  {
    slug: 'slas-need-an-operating-cadence',
    title: 'Why SLAs need an operating cadence',
    excerpt:
      'A target on paper does not manage a service. Teams need a recurring way to review performance, risk, and ownership.',
    contentHtml: `
      <h2>An SLA is a boundary</h2>
      <p>Service levels define an expectation, but they do not explain why work is late, where quality is slipping, or who should act.</p>
      <h2>Review the exceptions</h2>
      <p>A useful operating review focuses on ageing work, repeated failure points, quality findings, and decisions that need an owner.</p>
      <h2>Close the loop</h2>
      <p>Every review should end with named actions and return to them in the next cycle. Reporting without follow-through becomes administration.</p>
    `,
    heroImage: '/services/data.jpg',
    category: 'Operations Design',
    author: 'BlihOps Editorial',
    readTime: '5 min read',
    tags: ['SLAs', 'Governance', 'Service delivery'],
    featured: false,
    publishedAt: '2026-05-08',
  },
  {
    slug: 'human-in-the-loop-is-an-operating-model',
    title: 'Human-in-the-loop is an operating model',
    excerpt:
      'Human review works only when confidence, exceptions, authority, and feedback are designed as one system.',
    contentHtml: `
      <h2>Do not add a person at the end</h2>
      <p>Human-in-the-loop design begins by deciding which judgments require accountability and what evidence a reviewer needs.</p>
      <h2>Route uncertainty deliberately</h2>
      <p>Low-confidence results, policy exceptions, and conflicting inputs should arrive with a reason and a defined next action.</p>
      <h2>Use decisions to improve the system</h2>
      <p>Overrides and exception outcomes are operational data. Reviewing them reveals where rules, source documents, or models need adjustment.</p>
    `,
    heroImage: '/services/ai.jpg',
    category: 'AI & Automation',
    author: 'BlihOps Editorial',
    readTime: '8 min read',
    tags: ['AI operations', 'Quality control', 'Exceptions'],
    featured: false,
    publishedAt: '2026-04-16',
  },
  {
    slug: 'building-a-quality-scorecard-people-can-use',
    title: 'Building a quality scorecard people can use',
    excerpt:
      'A scorecard should make good work easier to recognize and coach, not reduce every conversation to a number.',
    contentHtml: `
      <h2>Begin with the customer promise</h2>
      <p>Define the behaviors that protect accuracy, ownership, clarity, and customer context before assigning weights or pass marks.</p>
      <h2>Calibrate the reviewers</h2>
      <p>Reviewers need to assess the same examples together and discuss disagreements. Consistency comes from shared interpretation.</p>
      <h2>Connect findings to action</h2>
      <p>Separate coaching needs from process, documentation, and product issues so each finding reaches the right owner.</p>
    `,
    heroImage: '/services/customer.jpg',
    category: 'Customer Experience',
    author: 'BlihOps Editorial',
    readTime: '6 min read',
    tags: ['Customer support', 'Quality assurance', 'Coaching'],
    featured: false,
    publishedAt: '2026-03-29',
  },
  {
    slug: 'operational-reporting-people-actually-use',
    title: 'Operational reporting people actually use',
    excerpt:
      'Useful reporting reduces uncertainty and points to a decision. More charts do not automatically create more visibility.',
    contentHtml: `
      <h2>Define the decision first</h2>
      <p>Every measure should support a recurring operational question. If nobody knows what changes when a number moves, it is probably noise.</p>
      <h2>Make definitions explicit</h2>
      <p>Document the source, owner, calculation, and reporting period so teams spend less time reconciling different versions of performance.</p>
      <h2>Show exceptions and actions</h2>
      <p>A concise report should make risk, ageing work, and unresolved ownership easier to see than routine activity.</p>
    `,
    heroImage: '/services/data.jpg',
    category: 'Data & Reporting',
    author: 'BlihOps Editorial',
    readTime: '5 min read',
    tags: ['Reporting', 'KPIs', 'Decision making'],
    featured: false,
    publishedAt: '2026-03-07',
  },
  {
    slug: 'how-an-embedded-pod-joins-a-product-team',
    title: 'How an embedded pod joins a product team',
    excerpt:
      'External delivery capacity works best when it adopts the team’s standards instead of introducing a parallel process.',
    contentHtml: `
      <h2>Keep product authority clear</h2>
      <p>The client should retain product direction and architecture decisions while the pod owns agreed delivery outcomes.</p>
      <h2>Join the existing cadence</h2>
      <p>Planning, code review, QA evidence, and release readiness should follow the same definitions used by the internal team.</p>
      <h2>Reduce coordination cost</h2>
      <p>A pod lead should consolidate ownership, surface risk early, and prevent routine coordination from returning to senior client engineers.</p>
    `,
    heroImage: '/services/software.jpg',
    category: 'Team & Delivery',
    author: 'BlihOps Editorial',
    readTime: '7 min read',
    tags: ['Engineering', 'Embedded teams', 'Delivery'],
    featured: false,
    publishedAt: '2026-02-18',
  },
  {
    slug: 'from-shared-inbox-to-controlled-queue',
    title: 'From shared inbox to controlled queue',
    excerpt:
      'A queue becomes manageable when every item has a state, an owner, a readiness definition, and an exception path.',
    contentHtml: `
      <h2>Email hides operational state</h2>
      <p>Shared inboxes are useful intake channels, but they do not reliably show readiness, duplicate work, blockers, or ownership.</p>
      <h2>Define the work states</h2>
      <p>Separate new, ready, active, waiting, exception, and complete work so the team can distinguish progress from delay.</p>
      <h2>Manage the queue as a system</h2>
      <p>Review ageing work, blocked cases, and recurring exceptions on a predictable cadence rather than relying on individual follow-up.</p>
    `,
    heroImage: '/services/back-office.jpg',
    category: 'Operations Design',
    author: 'BlihOps Editorial',
    readTime: '6 min read',
    tags: ['Workflow', 'Queue management', 'Back-office'],
    featured: false,
    publishedAt: '2026-01-30',
  },
];
