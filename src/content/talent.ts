import type { LucideIcon } from 'lucide-react';
import {
  BotIcon,
  ClipboardCheckIcon,
  CodeXmlIcon,
  HeadphonesIcon,
} from 'lucide-react';

export type TalentOpportunity = {
  id: string;
  title: string;
  area: string;
  description: string;
  workMode: string;
  location: string;
  commitment: string;
  skills: string[];
  icon: LucideIcon;
};

// Preview content until the Talent platform opportunity feed is available.
export const talentOpportunities: TalentOpportunity[] = [
  {
    id: 'customer-support-specialist',
    title: 'Customer Support Specialist',
    area: 'Customer experience',
    description:
      'Support customers across email and chat while maintaining clear response, escalation, and quality standards.',
    workMode: 'Remote-ready',
    location: 'Addis Ababa',
    commitment: 'Full-time pathway',
    skills: ['Ticket handling', 'Written communication', 'Quality routines'],
    icon: HeadphonesIcon,
  },
  {
    id: 'back-office-associate',
    title: 'Back-Office Associate',
    area: 'Operations',
    description:
      'Run structured data, document, and administrative workflows with consistent accuracy and documented checks.',
    workMode: 'Hybrid',
    location: 'Addis Ababa',
    commitment: 'Full-time pathway',
    skills: ['Data accuracy', 'SOP execution', 'Document review'],
    icon: ClipboardCheckIcon,
  },
  {
    id: 'junior-qa-analyst',
    title: 'Junior QA Analyst',
    area: 'Technology',
    description:
      'Help product teams test releases, document issues, and maintain dependable regression coverage.',
    workMode: 'Hybrid',
    location: 'Addis Ababa',
    commitment: 'Project or full-time',
    skills: ['Test planning', 'Issue reporting', 'Regression testing'],
    icon: CodeXmlIcon,
  },
  {
    id: 'ai-automation-assistant',
    title: 'AI Automation Assistant',
    area: 'AI & automation',
    description:
      'Support workflow mapping, AI-assisted operations, and practical automation projects with human review built in.',
    workMode: 'Remote-ready',
    location: 'Addis Ababa',
    commitment: 'Project pathway',
    skills: ['Workflow mapping', 'Prompt practice', 'Process documentation'],
    icon: BotIcon,
  },
];
