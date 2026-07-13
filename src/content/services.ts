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
  /** Path under /public — swap when final assets land */
  image: string;
};

export const services: ServiceItem[] = [
  {
    id: 'customer-support',
    title: 'Customer Support',
    shortDescription:
      'Omnichannel support across email, chat, and voice with response-time SLAs.',
    details:
      'Trained agents, quality scoring, and clear ownership. Your customers get consistent help you get relief.',
    tag: 'SUPPORT THAT SCALES',
    href: '/what-we-offer#customer-support',
    icon: HeadsetIcon,
    image: '/services/customer.jpg',
  },
  {
    id: 'back-office',
    title: 'Back-Office',
    shortDescription:
      'Data entry, document processing, and admin ops on documented SOPs.',
    details:
      'Reliable execution at a fraction of in-house cost accuracy and throughput you can measure weekly.',
    tag: 'EXECUTION YOU CAN TRUST',
    href: '/what-we-offer#back-office',
    icon: FilesIcon,
    image: '/services/back-office.jpg',
  },
  {
    id: 'it-software',
    title: 'IT & Software',
    shortDescription:
      'Dedicated developers, software support, and QA as an extension of your team.',
    details:
      'Skilled engineers who ship with your stack and process not a disconnected vendor queue.',
    tag: 'TECH TALENT ON DEMAND',
    href: '/what-we-offer#it-software',
    icon: CodeIcon,
    image: '/services/software.jpg',
  },
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    shortDescription:
      'Workflow mapping and AI-powered automation that removes busywork.',
    details:
      'From intelligent document processing to AI-assisted support outsourcing that gets smarter over time.',
    tag: 'INTELLIGENCE THAT WORKS',
    href: '/what-we-offer#ai-automation',
    icon: BotIcon,
    image: '/services/ai.jpg',
  },
  {
    id: 'data-reporting',
    title: 'Data & Reporting',
    shortDescription:
      'Operational dashboards, KPI tracking, and automated reporting.',
    details:
      'Always know how ops are performing. Decisions driven by data, not guesswork.',
    tag: 'CLARITY YOU CAN ACT ON',
    href: '/what-we-offer#data-reporting',
    icon: ChartColumnIcon,
    image: '/services/data.jpg',
  },
];
