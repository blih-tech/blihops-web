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
      <p>A pilot should answer a specific business question: can this workflow be transferred safely, managed consistently, and improved over time? That is different from asking whether another team can complete a temporary batch of tasks.</p>
      <p>Before selecting the work, write down the decision the pilot will support. The decision might be whether to transfer a complete process, whether a dedicated pod can meet the required quality standard, or whether automation can reduce repetitive work without weakening control.</p>
      <h3>A useful pilot question is narrow</h3>
      <ul>
        <li>It names the workflow and the part being tested.</li>
        <li>It identifies the evidence required for a confident decision.</li>
        <li>It defines what the client and delivery partner will each own.</li>
      </ul>
      <blockquote>A pilot is a controlled test of an operating relationship, not a discounted version of business as usual.</blockquote>
      <h2>Define the operating boundary</h2>
      <p>Choose a workflow with recognizable inputs, owners, exceptions, and completion criteria. If the process changes every time it is performed, the pilot will mostly measure the team's ability to improvise.</p>
      <p>Map the work from intake to completion. Document the systems involved, information required, approvals, common exceptions, and the point at which responsibility returns to the client. This creates a shared operating boundary before delivery begins.</p>
      <h3>Prepare the minimum operating system</h3>
      <ul>
        <li>A current process map and source-of-truth documentation</li>
        <li>Readiness and completion definitions for each unit of work</li>
        <li>Escalation rules with named decision owners</li>
        <li>A short reporting cadence for volume, quality, and open risks</li>
      </ul>
      <h2>Measure evidence, not activity</h2>
      <p>Volume shows that work moved, but it does not show whether the operating model is sustainable. Review quality, handoff completeness, exception handling, visibility, and the effort required from the internal team.</p>
      <p>Pay close attention to hidden coordination. If client managers must repeatedly clarify routine decisions, rebuild context, or chase status, the process is not ready to scale even when output appears acceptable.</p>
      <h3>Close with a documented decision</h3>
      <p>At the end of the pilot, compare the evidence with the original question. Record what worked, which controls need improvement, what additional transition work is required, and whether the next step is to scale, redesign, or stop.</p>
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
      <p>Start with work that follows a recognizable pattern and uses reasonably dependable inputs. Repetition matters because it gives the automation a stable job; clear inputs matter because they make the result testable.</p>
      <p>A process that depends on undocumented judgment, inconsistent source documents, and frequent policy changes is not an easy first candidate. Automating it may simply move uncertainty into a system where it becomes harder to see.</p>
      <h3>Good first candidates tend to have</h3>
      <ul>
        <li>High enough frequency to justify the design effort</li>
        <li>Clear rules for routine cases</li>
        <li>Source data that can be checked against known formats</li>
        <li>A visible completion state and an accountable process owner</li>
      </ul>
      <h2>Keep exceptions visible</h2>
      <p>The goal is not to force every case through the same automated path. The goal is to complete predictable work efficiently and route uncertain work to the right person with useful context.</p>
      <p>Define the conditions that require review before implementation begins. These might include missing fields, conflicting values, low-confidence extraction, policy exceptions, or an amount outside an expected range.</p>
      <h3>Design the exception queue</h3>
      <ul>
        <li>Show the source information beside the proposed result.</li>
        <li>Explain why the item was routed for review.</li>
        <li>Give the operator a small set of clear next actions.</li>
        <li>Preserve who approved or changed the result.</li>
      </ul>
      <blockquote>Human review should be a designed part of the workflow, not a safety net added after automation fails.</blockquote>
      <h2>Design the review loop</h2>
      <p>Implementation is the beginning of the operating cycle, not the end. Track where validation fails, why operators override results, and which sources produce the most exceptions.</p>
      <p>Review those patterns with the process owner. Some failures will require changes to automation rules, while others reveal weak forms, unclear policies, or inconsistent upstream behavior.</p>
      <h3>Expand only after the controls work</h3>
      <p>Once routine cases are dependable and the exception path is manageable, extend the workflow deliberately. Add one document type, decision rule, or integration at a time so the team can identify what changed when performance moves.</p>
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
      <p>Service levels define the boundary of an expected result: how quickly work should begin, when it should be completed, or what quality threshold it must meet. That clarity is valuable, but it does not manage the service by itself.</p>
      <p>An SLA cannot explain why work is ageing, whether a queue contains the right priorities, or which recurring issue needs a process change. Those questions require context, ownership, and a regular operating conversation.</p>
      <h3>Pair every target with an operating definition</h3>
      <ul>
        <li>When the clock starts and stops</li>
        <li>Which states pause the measure and why</li>
        <li>How priority and severity are assigned</li>
        <li>Who owns recovery when the target is at risk</li>
      </ul>
      <h2>Review the exceptions</h2>
      <p>A useful operating review does not read every number aloud. It focuses attention on deviation: ageing work, repeated failure points, quality findings, unusual demand, and decisions that need an owner.</p>
      <p>The frequency should match the operation. A fast-moving customer queue may need a short daily review, while deeper performance and improvement themes may belong in a weekly or monthly session.</p>
      <h3>A practical review agenda</h3>
      <ul>
        <li>Current performance and any target at risk</li>
        <li>Oldest or highest-impact open items</li>
        <li>Quality findings and recurring causes</li>
        <li>Actions from the previous review</li>
        <li>New decisions, owners, and expected completion dates</li>
      </ul>
      <blockquote>The review should spend more time on causes and actions than on reporting what already happened.</blockquote>
      <h2>Close the loop</h2>
      <p>Every review should end with named actions and return to them in the next cycle. Without that loop, reporting becomes administration and the same exceptions appear week after week.</p>
      <p>Keep the action record simple: what will change, who owns it, when it will be reviewed, and what evidence will show that it worked. The purpose is accountability, not another complex tracking system.</p>
      <h3>Use the SLA as an improvement signal</h3>
      <p>Repeated misses should lead to a decision about capacity, workflow design, demand management, or the target itself. The service level is useful because it exposes where the operating system needs attention.</p>
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
      <p>Human-in-the-loop design is often described as automation followed by a person checking the result. In practice, the human role must be designed at the same time as the automated one.</p>
      <p>Begin by identifying which decisions require judgment, accountability, or sensitivity to context. Then define what evidence a reviewer needs, what authority they have, and what should happen after their decision.</p>
      <h3>Clarify the division of work</h3>
      <ul>
        <li>Automation handles repeatable extraction, routing, and validation.</li>
        <li>People resolve ambiguity, policy exceptions, and high-impact decisions.</li>
        <li>Process owners decide how repeated exception patterns change the system.</li>
      </ul>
      <h2>Route uncertainty deliberately</h2>
      <p>Not every uncertain case is the same. Low-confidence extraction, missing information, conflicting records, and policy exceptions require different expertise and different next actions.</p>
      <p>Use explicit exception categories instead of sending everything into a generic manual queue. The category should determine priority, owner, required context, and the options available to the reviewer.</p>
      <h3>Protect the reviewer experience</h3>
      <ul>
        <li>Place source evidence beside the automated result.</li>
        <li>Highlight the exact field or rule that needs attention.</li>
        <li>Avoid asking the reviewer to reconstruct work the system already performed.</li>
        <li>Record decisions without adding unnecessary administrative steps.</li>
      </ul>
      <blockquote>A good review interface concentrates human attention on the uncertain part of the case.</blockquote>
      <h2>Use decisions to improve the system</h2>
      <p>Overrides and exception outcomes are operational data. They show where rules are incomplete, source documents are weak, policies are unclear, or the automation is being asked to make a decision it should not own.</p>
      <p>Review patterns on a regular cadence rather than treating each case as an isolated correction. A cluster of similar overrides may justify a rule change; a recurring missing field may require an upstream form change.</p>
      <h3>Keep accountability visible</h3>
      <p>The final record should show what the system proposed, what the reviewer decided, and which version entered the downstream process. This supports quality review, learning, and appropriate auditability without turning every interaction into bureaucracy.</p>
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
      <p>A quality scorecard should translate the customer promise into observable behaviors. Begin with what customers need from the interaction: accurate information, clear ownership, appropriate tone, and confidence about what happens next.</p>
      <p>Do not begin by assigning points. First describe what good performance looks like in plain language and identify the failures that create meaningful risk for the customer or business.</p>
      <h3>Keep the dimensions distinct</h3>
      <ul>
        <li><strong>Accuracy:</strong> Was the information correct and supported by an approved source?</li>
        <li><strong>Ownership:</strong> Did the agent move the request forward and explain the next step?</li>
        <li><strong>Communication:</strong> Was the response clear, relevant, and appropriate for the customer?</li>
        <li><strong>Process:</strong> Were required checks, records, and escalation rules followed?</li>
      </ul>
      <h2>Calibrate the reviewers</h2>
      <p>A detailed scorecard will not create consistency on its own. Reviewers need to assess the same examples independently, compare their conclusions, and discuss where interpretation differs.</p>
      <p>Use real conversations that include straightforward work, ambiguous situations, and known edge cases. The purpose is not to force identical opinions; it is to agree on how the standard applies and where guidance needs more detail.</p>
      <h3>Build calibration into the cadence</h3>
      <ul>
        <li>Calibrate before the scorecard is used for formal coaching.</li>
        <li>Repeat calibration when policies or channels change.</li>
        <li>Track dimensions where reviewers disagree most often.</li>
        <li>Update examples and guidance when ambiguity is recurring.</li>
      </ul>
      <blockquote>Consistency comes from shared interpretation, not from adding more fields to the form.</blockquote>
      <h2>Connect findings to action</h2>
      <p>Not every quality failure is an agent coaching issue. A correct process may be difficult to follow, approved documentation may be unclear, or the product may create a recurring customer problem.</p>
      <p>Classify findings by the action they require. Individual behavior belongs in coaching; unclear guidance belongs with the knowledge owner; repeated workflow failure belongs with operations; product patterns belong with the relevant product team.</p>
      <h3>Use quality as a learning system</h3>
      <p>Review trends over time and bring recurring themes into the operating review. The scorecard is valuable when it changes coaching, documentation, workflows, and decisions, not when it only produces a weekly score.</p>
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
      <p>Every measure should support a recurring operational question. Leaders may need to decide where capacity is required, which queue needs intervention, whether quality is stable, or which process change should be prioritized.</p>
      <p>If nobody knows what changes when a number moves, the measure is probably noise. Starting with the decision keeps the report focused and makes it easier to identify the right level of detail.</p>
      <h3>Write the question beside the measure</h3>
      <ul>
        <li>What decision does this information support?</li>
        <li>Who is responsible for making that decision?</li>
        <li>How frequently can the team act on it?</li>
        <li>What comparison or threshold gives the value meaning?</li>
      </ul>
      <h2>Make definitions explicit</h2>
      <p>Common labels such as completed, response time, backlog, and quality can hide different interpretations. One team may count reopened work as complete while another does not; one location may exclude waiting cases while another includes them.</p>
      <p>Document the source, owner, calculation, exclusions, and reporting period for each measure. Definitions should be accessible to the people producing and reviewing the report, not hidden in an analyst's workbook.</p>
      <h3>Protect the reporting pipeline</h3>
      <ul>
        <li>Name an owner for every source field.</li>
        <li>Validate missing, duplicate, and unexpected values before reporting.</li>
        <li>Record definition changes so historical comparisons remain understandable.</li>
        <li>Separate unavailable data from genuinely zero activity.</li>
      </ul>
      <blockquote>A trusted report begins with shared definitions, not with a better chart.</blockquote>
      <h2>Show exceptions and actions</h2>
      <p>A concise operating report should make risk, ageing work, and unresolved ownership easier to see than routine activity. Summary measures provide context, but exceptions tell the team where attention is required.</p>
      <p>Place commentary beside the relevant signal. Explain what changed, the likely cause, the action underway, and who owns the next update. This prevents the review from becoming a separate search for context.</p>
      <h3>Design for the meeting that uses it</h3>
      <p>Order the report in the same sequence as the operating conversation: current position, exceptions, causes, actions, and decisions. When reporting and review share a structure, teams spend less time presenting and more time managing.</p>
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
      <p>An embedded pod adds capacity without changing who owns the product. The client should retain product direction, customer priorities, architecture decisions, and the standards that govern delivery.</p>
      <p>The pod needs a clear area of responsibility within those boundaries. That may be a product capability, maintenance queue, integration stream, or defined group of roadmap outcomes.</p>
      <h3>Document the decision rights</h3>
      <ul>
        <li>Who approves scope and accepts completed work?</li>
        <li>Which technical decisions can the pod make independently?</li>
        <li>What requires architecture, security, or product review?</li>
        <li>Who resolves priority conflicts and cross-team dependencies?</li>
      </ul>
      <h2>Join the existing cadence</h2>
      <p>The pod should join the client's planning, refinement, code review, QA, and release practices. A parallel delivery system creates translation work and makes quality harder to compare.</p>
      <p>Before delivery begins, agree on the definition of ready and definition of done. Clarify documentation expectations, test evidence, review requirements, release responsibilities, and how operational issues return to the backlog.</p>
      <h3>Create one source of delivery truth</h3>
      <ul>
        <li>Use the same backlog and status definitions as the internal team.</li>
        <li>Attach decisions and evidence to the work they affect.</li>
        <li>Surface dependencies and blocked work during the shared cadence.</li>
        <li>Keep release status visible to product and operational stakeholders.</li>
      </ul>
      <blockquote>The pod should feel like additional ownership inside the delivery system, not another vendor process beside it.</blockquote>
      <h2>Reduce coordination cost</h2>
      <p>Additional capacity is not useful if senior client engineers must coordinate every task. A pod lead should consolidate ownership, surface risk early, and resolve routine delivery questions within the agreed boundaries.</p>
      <p>Communication should be predictable: brief delivery updates, visible risks, clear decisions required from the client, and no separate status reconstruction.</p>
      <h3>Review the relationship as well as the output</h3>
      <p>Alongside delivery performance, review handoff quality, decision latency, avoidable dependencies, and the effort the client spends managing the pod. These signals show whether the model is truly adding capacity.</p>
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
      <p>Shared inboxes are useful intake channels because customers and partners already understand them. The problem begins when the inbox is also expected to function as the operating system.</p>
      <p>Read and unread states do not show whether work is ready, duplicated, waiting on information, blocked by a decision, or complete. Folders and flags often develop local meanings that new team members cannot interpret.</p>
      <h3>Separate intake from management</h3>
      <ul>
        <li>Capture each request as a distinct unit of work.</li>
        <li>Preserve the original message and attachments as source evidence.</li>
        <li>Assign a readiness state before processing begins.</li>
        <li>Keep replies connected to the same case rather than creating duplicates.</li>
      </ul>
      <h2>Define the work states</h2>
      <p>A small, explicit state model gives the team a shared language for progress. New work has not been assessed; ready work has the information required to begin; active work has an owner; waiting work depends on an external response.</p>
      <p>Exceptions should be separated from ordinary waiting because they require a decision or specialist action. Complete work should have a defined output, not simply a closed message.</p>
      <h3>Give every state an operating rule</h3>
      <ul>
        <li>Entry criteria: what must be true before work enters the state</li>
        <li>Ownership: which role is accountable while it remains there</li>
        <li>Ageing: when the item needs review or escalation</li>
        <li>Exit criteria: what moves the item to its next state</li>
      </ul>
      <blockquote>A queue becomes controllable when status describes the work, not the last action someone took in the inbox.</blockquote>
      <h2>Manage the queue as a system</h2>
      <p>Once work has consistent states and owners, the team can manage the queue rather than chase individual messages. Daily attention can focus on readiness, priority, ageing, and blocked cases.</p>
      <p>Recurring exceptions should feed process improvement. If the same information is repeatedly missing, improve the intake guidance. If one approval blocks many cases, review the decision path rather than escalating every item separately.</p>
      <h3>Keep the controls proportionate</h3>
      <p>The goal is not to replace a simple inbox with a complex administration system. Use the fewest states, fields, and reports required to make ownership and risk visible, then add structure only when a real operating need appears.</p>
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

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getRelatedInsights(slug: string, limit = 2): Insight[] {
  const current = getInsightBySlug(slug);
  if (!current) return [];

  const related = insights.filter(
    (insight) => insight.slug !== slug && insight.category === current.category,
  );

  if (related.length >= limit) return related.slice(0, limit);

  const remaining = insights.filter(
    (insight) =>
      insight.slug !== slug &&
      !related.some((item) => item.slug === insight.slug),
  );

  return [...related, ...remaining].slice(0, limit);
}
