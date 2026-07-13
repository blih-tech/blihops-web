import type { LucideIcon } from 'lucide-react';
import {
  BotIcon,
  ChartColumnIcon,
  CodeIcon,
  HeadsetIcon,
  FilesIcon,
} from 'lucide-react';

export type ServiceItem = {
  id: string;
  title: string;
  shortDescription: string;
  details: string;
  tag: string;
  href: string;
  icon: LucideIcon;
  image: string;
  subtitle: string;
  body: string;
  features: string[];
  whoThisIsFor: string;
};

export const services: ServiceItem[] = [
  {
    id: 'customer-support',
    title: 'Customer Support',
    subtitle: 'Support that scales without the chaos',
    shortDescription:
      'Omnichannel support across email, chat, and voice with response-time SLAs.',
    details:
      'Trained agents, quality scoring, and clear ownership. Your customers get consistent help. You get relief.',
    body: 'Email, chat, and voice with trained agents, AI-assisted routing, and clear response SLAs. Tracked and reported every week.',
    tag: 'SUPPORT THAT SCALES',
    href: '/what-we-offer#customer-support',
    icon: HeadsetIcon,
    image: '/services/customer.jpg',
    features: [
      'Omnichannel: email, chat, voice',
      'AI-assisted routing',
      'Response-time SLAs',
      'Weekly quality reports',
    ],
    whoThisIsFor:
      'SaaS and ecommerce teams that want better support without growing headcount.',
  },
  {
    id: 'back-office',
    title: 'Back-Office',
    subtitle: 'Operations that run like clockwork',
    shortDescription:
      'Data entry, document processing, and admin ops on documented SOPs.',
    details:
      'Reliable execution at a fraction of in-house cost. Accuracy and throughput you can measure weekly.',
    body: 'Data entry, documents, CRM, and admin on documented SOPs with QA checks. Structured execution you can measure weekly.',
    tag: 'EXECUTION YOU CAN TRUST',
    href: '/what-we-offer#back-office',
    icon: FilesIcon,
    image: '/services/back-office.jpg',
    features: [
      'Data entry & validation',
      'Document processing',
      'CRM & admin ops',
      'SOP-based QA',
    ],
    whoThisIsFor:
      'Teams buried in admin who need reliable throughput without more hires.',
  },
  {
    id: 'it-software',
    title: 'IT & Software',
    subtitle: 'Tech talent that feels like your team',
    shortDescription:
      'Dedicated developers, software support, and QA as an extension of your team.',
    details:
      'Skilled engineers who ship with your stack and process, not a disconnected vendor queue.',
    body: 'Dedicated developers, support, and QA from Ethiopia with GMT+3 overlap. Sprint cadence and code standards, not freelancers.',
    tag: 'TECH TALENT ON DEMAND',
    href: '/what-we-offer#it-software',
    icon: CodeIcon,
    image: '/services/software.jpg',
    features: [
      'Dedicated dev teams',
      'Support & maintenance',
      'QA & testing',
      'Nearshore GMT+3 overlap',
    ],
    whoThisIsFor:
      'Product teams scaling engineering without the full hiring burden.',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'AI that solves business problems',
    shortDescription:
      'Workflow mapping and AI-powered automation that removes busywork.',
    details:
      'From intelligent document processing to AI-assisted support. Outsourcing that gets smarter over time.',
    body: 'We map workflows, cut busywork, and deploy automation where judgment is not required. Practical, measurable, ROI-tracked.',
    tag: 'INTELLIGENCE THAT WORKS',
    href: '/what-we-offer#ai-automation',
    icon: BotIcon,
    image: '/services/ai.jpg',
    features: [
      'Workflow mapping',
      'Document AI & extraction',
      'CRM & ops automation',
      'ROI-tracked rollout',
    ],
    whoThisIsFor:
      'Companies slowed by manual work that need automation done, not just demos.',
  },
  {
    id: 'data-reporting',
    title: 'Data & Reporting',
    subtitle: 'See everything. Guess nothing.',
    shortDescription:
      'Operational dashboards, KPI tracking, and automated reporting.',
    details:
      'Always know how ops are performing. Decisions driven by data, not guesswork.',
    body: 'KPI dashboards, automated reports, and clean operational data so leadership sees performance clearly. No guesswork.',
    tag: 'CLARITY YOU CAN ACT ON',
    href: '/what-we-offer#data-reporting',
    icon: ChartColumnIcon,
    image: '/services/data.jpg',
    features: [
      'KPI dashboards',
      'Automated weekly reports',
      'Data cleaning & validation',
      'Stakeholder-ready summaries',
    ],
    whoThisIsFor:
      'Leaders who need clear ops reporting to decide and improve faster.',
  },
];
