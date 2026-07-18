export const CAREERS_EMAIL = 'team@blihops.com';

export type CareerRole = {
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: string;
  employmentType: string;
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  preferred: string[];
};

// Illustrative records shaped like the future careers CMS response.
export const careerRoles: CareerRole[] = [
  {
    slug: 'operations-delivery-lead',
    title: 'Operations Delivery Lead',
    department: 'Operations',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary:
      'Lead a managed delivery pod and turn client commitments into dependable daily operations.',
    overview: [
      'You will own the operating rhythm for a client delivery pod, from workload planning and quality reviews to weekly reporting and escalation management.',
      'This role suits someone who can bring structure to moving work, coach a team with clarity, and keep clients informed without losing sight of the people doing the work.',
    ],
    responsibilities: [
      'Run daily delivery routines, capacity planning, and work allocation for a managed pod.',
      'Track service levels, quality measures, risks, and corrective actions.',
      'Coach specialists and team leads through regular feedback and performance reviews.',
      'Prepare concise weekly reporting and lead client delivery conversations.',
      'Identify process improvements and practical automation opportunities.',
    ],
    requirements: [
      'Three or more years of experience in operations, service delivery, or team leadership.',
      'Strong written and spoken English with confident stakeholder communication.',
      'Experience managing priorities, quality expectations, and recurring deadlines.',
      'A structured approach to documentation, problem solving, and follow-through.',
    ],
    preferred: [
      'Experience in BPO, managed services, customer operations, or back-office delivery.',
      'Familiarity with SLA reporting, process mapping, or continuous improvement methods.',
    ],
  },
  {
    slug: 'ai-automation-engineer',
    title: 'AI Automation Engineer',
    department: 'AI & Automation',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    summary:
      'Design reliable automations that remove repetitive work while keeping human review visible.',
    overview: [
      'You will translate operational workflows into dependable automations using APIs, AI services, and low-code or code-based orchestration where each is appropriate.',
      'The work goes beyond demos. You will design validation, exception handling, monitoring, and documentation so automations can be operated safely by delivery teams.',
    ],
    responsibilities: [
      'Map workflows and identify automation opportunities with clear business value.',
      'Build and integrate AI-assisted automations, internal tools, and API workflows.',
      'Design validation rules, human review steps, and failure recovery paths.',
      'Monitor production workflows and improve reliability from operating feedback.',
      'Document system behavior and train delivery teams on safe operation.',
    ],
    requirements: [
      'Hands-on experience building workflow automations or software integrations.',
      'Working knowledge of JavaScript or TypeScript, Python, REST APIs, and webhooks.',
      'Ability to reason about data quality, security, edge cases, and observability.',
      'Clear communication with both technical and operational teammates.',
    ],
    preferred: [
      'Experience with LLM APIs, document processing, queues, or integration platforms.',
      'A portfolio or GitHub profile showing production-minded automation work.',
    ],
  },
  {
    slug: 'full-stack-software-engineer',
    title: 'Full-Stack Software Engineer',
    department: 'Engineering',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    summary:
      'Build internal and client-facing software that makes managed operations easier to run and improve.',
    overview: [
      'You will work across product interfaces, APIs, and data models for tools used by Blih Ops teams and clients. The focus is clear, maintainable software that supports real operating workflows.',
      'You will collaborate closely with operations and automation specialists, turning practical needs into small, dependable product increments.',
    ],
    responsibilities: [
      'Develop accessible web interfaces and well-structured backend services.',
      'Translate workflow needs into maintainable product and technical decisions.',
      'Write tests, review code, and improve delivery quality with the engineering team.',
      'Integrate third-party systems and maintain clear API boundaries.',
      'Investigate production issues and improve performance and reliability.',
    ],
    requirements: [
      'Professional experience with TypeScript, React, and a server-side application framework.',
      'Solid understanding of relational data, APIs, testing, and version control.',
      'Ability to explain technical trade-offs and work from incomplete requirements.',
      'A portfolio or GitHub profile demonstrating relevant software work.',
    ],
    preferred: [
      'Experience with Next.js, PostgreSQL, background jobs, or cloud deployment.',
      'Interest in developer experience, internal tools, and operational software.',
    ],
  },
  {
    slug: 'customer-experience-specialist',
    title: 'Customer Experience Specialist',
    department: 'Customer Experience',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'On-site',
    employmentType: 'Full-time',
    summary:
      'Represent client brands with empathy, sound judgment, and consistent follow-through across customer channels.',
    overview: [
      'You will support customers on behalf of international clients through written and voice channels, resolving routine needs and escalating sensitive cases with useful context.',
      'You will be part of a managed team with clear playbooks, coaching, quality reviews, and room to grow into specialist or leadership paths.',
    ],
    responsibilities: [
      'Respond to customer questions accurately across assigned support channels.',
      'Follow client procedures while using good judgment in unfamiliar situations.',
      'Document interactions and escalate issues with complete, useful context.',
      'Participate in coaching, quality reviews, and knowledge-base improvements.',
      'Identify recurring customer friction and share actionable observations.',
    ],
    requirements: [
      'Excellent written and spoken English with attentive listening skills.',
      'A calm, empathetic approach to customer conversations and problem solving.',
      'Strong reliability, attention to detail, and comfort learning new systems.',
      'Availability to work schedules aligned with assigned client coverage.',
    ],
    preferred: [
      'Previous experience in customer support, hospitality, sales, or service operations.',
      'Additional language skills relevant to European or Middle Eastern customers.',
    ],
  },
  {
    slug: 'business-development-associate',
    title: 'Business Development Associate',
    department: 'Growth',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'Hybrid',
    employmentType: 'Full-time',
    summary:
      'Help growing companies understand where a managed Blih Ops team can create measurable operational value.',
    overview: [
      'You will research prospective clients, start thoughtful conversations, and help the growth team qualify opportunities across Europe, the Middle East, and Africa.',
      'This is a research-led role for someone who writes clearly, asks good questions, and can connect operational pain points to a focused next step.',
    ],
    responsibilities: [
      'Research target companies, sectors, and relevant operational signals.',
      'Write personalized outreach and manage consistent follow-up across channels.',
      'Qualify early conversations and maintain accurate CRM records.',
      'Support discovery preparation, proposals, and pipeline reporting.',
      'Share market feedback that improves positioning and service design.',
    ],
    requirements: [
      'Strong English writing, research, and professional communication skills.',
      'A disciplined approach to follow-up, record keeping, and weekly goals.',
      'Curiosity about business operations, technology, and managed services.',
      'Confidence learning from feedback and testing better ways to communicate value.',
    ],
    preferred: [
      'Experience in B2B sales, partnerships, marketing, or customer-facing work.',
      'Familiarity with CRM tools and international business communication.',
    ],
  },
];

export function getCareerRoleBySlug(slug: string) {
  return careerRoles.find((role) => role.slug === slug);
}

export function getApplicationSubject(role: CareerRole) {
  return `Application: ${role.title} - [Applicant Name]`;
}
