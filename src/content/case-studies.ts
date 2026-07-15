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
      <p>The platform's customer base was expanding across email, live chat, and in-product requests. Support demand was growing faster than the internal team could document conversations, maintain response consistency, and review recurring issues.</p>
      <p>Ownership changed between channels and complex cases reached product specialists without enough context. Team leads were spending more time rebuilding the history of a request than coaching agents or improving the support operation.</p>
      <h3>What needed to change</h3>
      <ul>
        <li>One intake and prioritization method across every channel</li>
        <li>Clear escalation rules for billing, technical, and account issues</li>
        <li>A repeatable quality review and coaching cadence</li>
      </ul>
      <h2>Our approach</h2>
      <p>BlihOps began by mapping the request lifecycle from first contact to resolution. Together with the client, we documented channel-specific playbooks, severity definitions, ownership rules, and the information required before an issue could be escalated.</p>
      <p>A dedicated support pod then took ownership of the agreed queues. The pod lead reviewed workload and exceptions daily, while quality specialists sampled conversations against a shared scorecard each week.</p>
      <h3>The operating system</h3>
      <ul>
        <li>Shared response standards and approved knowledge sources</li>
        <li>Structured handoffs with complete customer and issue context</li>
        <li>Weekly reporting on demand themes, quality findings, and open risks</li>
      </ul>
      <blockquote>Every conversation followed the same operating standard, regardless of where the customer first contacted the team.</blockquote>
      <h2>The outcome</h2>
      <p>The client gained a more dependable support operation with clearer ownership at each stage. Customers received more consistent answers, while complex cases arrived with the context internal specialists needed to act.</p>
      <p>Support leaders also gained a regular view of quality and demand patterns. Instead of reacting to isolated conversations, they could use recurring evidence to improve documentation, coaching, and product feedback.</p>
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
      <p>Shipping documents, delivery confirmations, and supplier records arrived through multiple inboxes. Teams copied details into separate spreadsheets, making it difficult to see who owned a document or whether its information had been validated.</p>
      <p>When a file was incomplete, follow-up depended on individual memory. Delays were usually discovered downstream, after another team had already started working from missing or inconsistent data.</p>
      <h3>Operational friction</h3>
      <ul>
        <li>Duplicate records created from different email threads</li>
        <li>No shared definition of complete or ready for processing</li>
        <li>Limited visibility into ageing work and blocked cases</li>
      </ul>
      <h2>Our approach</h2>
      <p>We documented every document type, required field, exception path, and handoff. The resulting workflow moved incoming files into one controlled queue with an assigned owner and a visible processing state.</p>
      <p>Operators followed validation checklists before records could advance. Exceptions were separated from routine work and routed with a clear reason, supporting evidence, and next action.</p>
      <h3>Controls introduced</h3>
      <ul>
        <li>Standard naming, indexing, and duplicate checks</li>
        <li>Quality gates before data entered downstream systems</li>
        <li>A daily operating view for pending, blocked, and completed work</li>
      </ul>
      <h2>The outcome</h2>
      <p>Document processing became easier to manage because ownership and status were visible in one place. Teams worked from cleaner records and could address incomplete files before they disrupted later stages.</p>
      <p>The shared operating view also gave managers a practical basis for workload planning, exception review, and continuous process improvement.</p>
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
      <p>The product team had a committed roadmap, but hiring delays left too little capacity for feature delivery, regression testing, and maintenance. Senior engineers were repeatedly pulled away from planned work to investigate support issues and validate releases.</p>
      <p>The client needed additional capacity without creating a separate delivery culture or lowering its engineering standards.</p>
      <h3>Delivery constraints</h3>
      <ul>
        <li>Roadmap and maintenance work competing in the same sprint</li>
        <li>Limited QA coverage across browsers and release paths</li>
        <li>Too much coordination falling on senior product engineers</li>
      </ul>
      <h2>Our approach</h2>
      <p>BlihOps formed an embedded engineering and QA pod around a defined portion of the roadmap. The team joined the client's planning, stand-ups, code review, and release process rather than introducing a parallel workflow.</p>
      <p>Responsibilities were divided clearly: the client retained product and architecture decisions, while the pod owned implementation, test coverage, documentation, and release readiness for assigned work.</p>
      <h3>Working agreement</h3>
      <ul>
        <li>Shared definition of ready and definition of done</li>
        <li>Pull requests reviewed against the client's existing standards</li>
        <li>QA evidence attached before work moved to release</li>
      </ul>
      <blockquote>The pod was designed to extend the existing product team, not create another layer for it to manage.</blockquote>
      <h2>The outcome</h2>
      <p>The product team established a steadier delivery rhythm while preserving its established technical standards. Planned work had clearer ownership, and release decisions were supported by more consistent QA evidence.</p>
      <p>Internal engineers recovered time for architecture, product discovery, and the complex decisions where their context mattered most.</p>
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
      <p>Operators received policy forms, claims documents, and supporting records in several layouts. They manually located the required fields, transferred information into internal systems, and checked each entry before work could continue.</p>
      <p>The task was repetitive, but full automation was unsafe because unclear documents and policy exceptions still required human judgment.</p>
      <h3>The design constraint</h3>
      <ul>
        <li>Reduce routine entry without hiding uncertainty</li>
        <li>Preserve a clear audit trail from source to approved record</li>
        <li>Keep trained operators responsible for exceptions</li>
      </ul>
      <h2>Our approach</h2>
      <p>We separated the workflow into extraction, validation, and decision stages. Automation captured candidate values and applied format and completeness rules before presenting the result for review.</p>
      <p>High-confidence routine fields followed a streamlined approval path. Missing, conflicting, or unusual information moved into an exception queue with the source document and validation reason visible to the operator.</p>
      <h3>Human-in-the-loop controls</h3>
      <ul>
        <li>Field-level confidence and validation states</li>
        <li>Exception categories linked to clear review actions</li>
        <li>Sampling and quality checks after approval</li>
      </ul>
      <h2>The outcome</h2>
      <p>The team spent less time retyping routine information and more time reviewing cases that genuinely required attention. Automation supported the operation without removing human ownership of judgment-heavy decisions.</p>
      <p>The structured exception data also showed where document quality and upstream processes could be improved.</p>
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
      <p>Each location maintained its own spreadsheets and interpreted key measures differently. Leadership received several versions of workload, service quality, and team performance, often after the period for useful action had passed.</p>
      <p>The problem was not a lack of reports. It was the absence of shared definitions, dependable source data, and one reporting cadence that people trusted.</p>
      <h3>Reporting gaps</h3>
      <ul>
        <li>The same measure calculated differently by each location</li>
        <li>Manual consolidation that introduced avoidable errors</li>
        <li>Important exceptions hidden inside large spreadsheets</li>
      </ul>
      <h2>Our approach</h2>
      <p>BlihOps worked with operational leaders to define a small set of measures, the decision each measure supported, and the source fields required to calculate it. We then mapped the existing reports to those definitions and resolved inconsistent categories.</p>
      <p>The reporting layer was designed around review, not decoration. It separated current performance, emerging risks, and actions requiring an owner.</p>
      <h3>A single reporting cadence</h3>
      <ul>
        <li>Documented metric definitions and source ownership</li>
        <li>Validation checks before each reporting cycle</li>
        <li>A concise weekly view with exceptions and actions</li>
      </ul>
      <blockquote>A dependable report is not the one with the most charts. It is the one that helps the team decide what to do next.</blockquote>
      <h2>The outcome</h2>
      <p>Leaders could review workload, quality, and performance from one consistent operating view. Discussions shifted away from reconciling numbers and toward understanding causes, assigning actions, and monitoring progress.</p>
      <p>Locations also gained clearer accountability for the quality and timeliness of the data they contributed.</p>
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
      <p>Provider onboarding required documents, credential checks, internal approvals, and system updates across several teams. Cases frequently paused between handoffs because the next owner could not see what was complete or what information was still required.</p>
      <p>Follow-up happened through email, creating duplicate requests and making it difficult to distinguish active work from cases waiting on the provider.</p>
      <h3>Where cases stalled</h3>
      <ul>
        <li>Incomplete document sets entering review</li>
        <li>Checks performed without a shared sequence or owner</li>
        <li>No reliable view of ageing cases and blockers</li>
      </ul>
      <h2>Our approach</h2>
      <p>We mapped the complete onboarding journey and established one case record for every provider. Required documents, review states, owners, and next actions were visible from that record.</p>
      <p>Routine checks followed documented service levels and quality controls. Cases missing information moved into a separate waiting state, while true exceptions were escalated with the supporting context required for a decision.</p>
      <h3>Workflow controls</h3>
      <ul>
        <li>Readiness checklist before formal review began</li>
        <li>Named owner and due state for every active case</li>
        <li>Regular ageing and exception review with stakeholders</li>
      </ul>
      <h2>The outcome</h2>
      <p>The onboarding operation became easier to track from submission through completion. Teams could identify blocked cases earlier, avoid repeated document requests, and hand work over with clearer context.</p>
      <p>Managers gained a practical view of workload and bottlenecks, supporting better planning and more focused process improvements.</p>
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
      <p>Team leads reviewed customer conversations differently, so feedback depended heavily on who performed the review. Agents received isolated coaching notes, while recurring product and process issues remained difficult to separate from individual performance.</p>
      <p>The business needed a quality system that was consistent enough for reporting but practical enough to support real coaching conversations.</p>
      <h3>Quality blind spots</h3>
      <ul>
        <li>No shared interpretation of a high-quality conversation</li>
        <li>Review samples selected inconsistently across channels</li>
        <li>Findings not connected to coaching or operational action</li>
      </ul>
      <h2>Our approach</h2>
      <p>BlihOps created a scorecard around accuracy, ownership, communication, process compliance, and customer context. Review guidance described what good performance looked like and how to handle issues that did not fit a simple pass-or-fail decision.</p>
      <p>Reviewers calibrated together using the same conversations before the scorecard entered routine use. Findings then flowed into individual coaching, knowledge-base updates, and recurring operational reports.</p>
      <h3>From review to improvement</h3>
      <ul>
        <li>Balanced sampling across agents, channels, and issue types</li>
        <li>Regular reviewer calibration and score discussion</li>
        <li>Issue themes assigned to coaching, process, or product owners</li>
      </ul>
      <blockquote>Quality review became a learning system, not a score collected at the end of the week.</blockquote>
      <h2>The outcome</h2>
      <p>Coaching decisions became grounded in a shared body of evidence. Agents received clearer feedback, and team leads could distinguish individual development needs from wider process or product problems.</p>
      <p>The business also gained a repeatable way to connect customer conversations to documentation priorities and operational improvements.</p>
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
      <p>Customer-reported defects, internal maintenance, and small technical requests entered the product team through several channels. Items were discussed, but they did not always receive a clear severity, owner, or next decision.</p>
      <p>Maintenance work competed with roadmap delivery, and product leaders lacked one view of what was being investigated, scheduled, released, or declined.</p>
      <h3>Support gaps</h3>
      <ul>
        <li>Incomplete reports slowing initial investigation</li>
        <li>Severity decisions applied inconsistently</li>
        <li>Release status difficult for non-engineering teams to follow</li>
      </ul>
      <h2>Our approach</h2>
      <p>A focused software support team took ownership of intake and triage. Each item was checked for reproducibility, customer impact, supporting evidence, and the product area involved before reaching the engineering backlog.</p>
      <p>Agreed severity rules determined the response path. The team maintained ownership through investigation, fix validation, release, and communication back to the reporting stakeholder.</p>
      <h3>A clearer path to resolution</h3>
      <ul>
        <li>Standard issue template with evidence requirements</li>
        <li>Documented severity and escalation criteria</li>
        <li>Release notes and a recurring maintenance report</li>
      </ul>
      <h2>The outcome</h2>
      <p>Issues moved through a clearer path from report to resolution. Engineers received better-prepared work, while product and customer teams had a dependable place to see status and ownership.</p>
      <p>The structured maintenance flow reduced ambiguity around priorities and helped roadmap discussions account for support work more deliberately.</p>
    `,
    heroImage: '/services/software.jpg',
    services: ['IT & Software'],
    outcomes: ['Clearer triage and more predictable issue resolution'],
    tags: ['Fintech', 'Software support'],
    featured: false,
    publishedAt: '2025-10-04',
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getRelatedCaseStudies(slug: string, limit = 2): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return [];

  const related = caseStudies.filter(
    (study) =>
      study.slug !== slug &&
      study.services.some((service) => current.services.includes(service)),
  );

  if (related.length >= limit) return related.slice(0, limit);

  const remaining = caseStudies.filter(
    (study) =>
      study.slug !== slug && !related.some((r) => r.slug === study.slug),
  );

  return [...related, ...remaining].slice(0, limit);
}
