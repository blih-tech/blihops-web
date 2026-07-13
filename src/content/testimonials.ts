export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  source: string;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'BlihOps took support off our plate in two weeks. SLAs are real — we finally see response times every Monday.',
    name: 'Sarah Chen',
    role: 'Head of Operations',
    company: 'Northline SaaS',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop&crop=face',
    source: 'northline.io',
  },
  {
    id: '2',
    quote:
      'We tried three offshore vendors before this. Dedicated pods and weekly reporting changed how we scale ops.',
    name: 'Marcus Webb',
    role: 'COO',
    company: 'Parcelpath',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
    source: 'parcelpath.com',
  },
  {
    id: '3',
    quote:
      'Back-office accuracy jumped after they documented SOPs. Our team reclaimed leadership hours almost immediately.',
    name: 'Amira Hassan',
    role: 'Founder',
    company: 'Ledgerly',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=face',
    source: 'ledgerly.co',
  },
  {
    id: '4',
    quote:
      'AI-assisted triage cut ticket noise without losing the human handoff. QA is built in, not bolted on.',
    name: 'James Okonkwo',
    role: 'VP Customer Success',
    company: 'HelioPay',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face',
    source: 'heliopay.com',
  },
  {
    id: '5',
    quote:
      'Pilot to live in under three weeks. Clear ownership, one pod lead, and reporting we actually use.',
    name: 'Elena Petrova',
    role: 'Director of Ops',
    company: 'Stackfield',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face',
    source: 'stackfield.io',
  },
  {
    id: '6',
    quote:
      'Cost dropped versus our in-house plan, but quality held. That combination is rare in outsourcing.',
    name: 'David Kim',
    role: 'CEO',
    company: 'Brightlane',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face',
    source: 'brightlane.com',
  },
];
