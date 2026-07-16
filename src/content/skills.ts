import type { LucideIcon } from 'lucide-react';
import {
  BotIcon,
  ClipboardCheckIcon,
  CodeXmlIcon,
  HeadphonesIcon,
} from 'lucide-react';

export type SkillTrack = {
  id: string;
  title: string;
  category: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  outcome: string;
  icon: LucideIcon;
};

// Preview content until the Skills platform catalog is available.
export const skillTracks: SkillTrack[] = [
  {
    id: 'customer-support-operations',
    title: 'Customer Support Operations',
    category: 'Customer experience',
    description:
      'Build the communication, ticket handling, escalation, and quality habits required for dependable customer support.',
    level: 'Foundation',
    duration: '6 weeks',
    modules: '8 modules',
    outcome: 'Support-ready assessment',
    icon: HeadphonesIcon,
  },
  {
    id: 'back-office-data-quality',
    title: 'Back-Office & Data Quality',
    category: 'Operations',
    description:
      'Learn accurate data handling, document processing, SOP execution, and practical quality-control routines.',
    level: 'Foundation',
    duration: '5 weeks',
    modules: '7 modules',
    outcome: 'Operations skills review',
    icon: ClipboardCheckIcon,
  },
  {
    id: 'software-quality-assurance',
    title: 'Software Quality Assurance',
    category: 'Technology',
    description:
      'Practice test planning, issue reporting, regression checks, and the workflows used by reliable product teams.',
    level: 'Intermediate',
    duration: '8 weeks',
    modules: '10 modules',
    outcome: 'Portfolio QA project',
    icon: CodeXmlIcon,
  },
  {
    id: 'ai-workflow-automation',
    title: 'AI Workflow Automation',
    category: 'AI & automation',
    description:
      'Map repetitive work, identify safe automation opportunities, and build practical AI-assisted workflows.',
    level: 'Intermediate',
    duration: '6 weeks',
    modules: '8 modules',
    outcome: 'Automation case project',
    icon: BotIcon,
  },
];
