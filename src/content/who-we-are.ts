export type StoryStat = {
  value: string;
  label: string;
};

export type StoryContent = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  pullQuote: string;
  paragraphs: string[];
  stats: StoryStat[];
  image: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type VisionMissionContent = {
  eyebrow: string;
  heading: string;
  vision: string;
  mission: string;
  drivers: Array<{
    title: string;
    description: string;
  }>;
};

export type CoreValue = {
  title: string;
  description: string;
};

export type EthiopiaAdvantage = {
  highlight: string;
  label: string;
};

export type LeadershipPrinciple = {
  title: string;
  description: string;
};

export const story: StoryContent = {
  eyebrow: 'Our story',
  heading: 'Born from the operations we',
  headingAccent: 'wished someone would handle',
  pullQuote:
    'We saw the same problem in every growing business we worked with: brilliant founders buried under operations. They didn\u2019t need more people. They needed an intelligent system. So we built one.',
  paragraphs: [
    'Blih Intelligent Operations was born inside Blih Marketing & Communications, an established agency in Addis Ababa that learned firsthand what it takes to build operations that scale. After years of perfecting internal SOPs, KPIs, automation workflows, and AI integrations, we realized the frameworks we built for ourselves could transform how other businesses run.',
    'We launched Blih Ops to deliver intelligent operations to growing businesses worldwide. Not just people. Not just technology. A complete system where human talent and AI work together to produce better outcomes, faster delivery, and measurable results.',
    'Today we serve international SMEs across Europe, the Middle East, and Asia. We combine business process outsourcing, IT and software, and AI automation under one brand because your operations don\u2019t fit neatly into one category, and your outsourcing partner shouldn\u2019t either.',
  ],
  stats: [
    {
      value: 'BPO + IT + AI',
      label: 'Under one roof',
    },
    {
      value: 'SLA',
      label: 'Backed delivery',
    },
  ],
  image: {
    src: '/about-us-image.jpg',
    alt: 'Blih Ops team at work in the Addis Ababa office',
    caption: 'Addis Ababa, Ethiopia',
  },
};

export const visionMission: VisionMissionContent = {
  eyebrow: 'Vision & mission',
  heading: 'Where we\u2019re going. How we get there.',
  vision:
    'To make Ethiopia a global destination for intelligent outsourcing, powered by AI and African talent.',
  mission:
    'We run modern operations globally so founders and leaders can focus on building their vision.',
  drivers: [
    {
      title: 'Reliable systems',
      description: 'Documented processes and accountable delivery.',
    },
    {
      title: 'AI-assisted operations',
      description: 'Automation that strengthens human ownership and QA.',
    },
    {
      title: 'African talent',
      description: 'Skilled teams from Ethiopia serving global businesses.',
    },
  ],
};

export const coreValues: CoreValue[] = [
  {
    title: 'Intelligence',
    description: 'We examine every process for smarter, data-led ways to work.',
  },
  {
    title: 'Talent',
    description:
      'We invest in skilled Ethiopian professionals and long-term growth.',
  },
  {
    title: 'Reliability',
    description: 'We honor SLAs, commitments, and reporting cadences.',
  },
  {
    title: 'Quality',
    description: 'Every output passes defined standards and quality gates.',
  },
  {
    title: 'Efficiency',
    description:
      'We remove wasted time, cost, and effort through better systems.',
  },
];

export const ethiopiaAdvantages: EthiopiaAdvantage[] = [
  { highlight: '40-60%', label: 'Lower operating costs' },
  { highlight: 'Global', label: 'English-speaking talent' },
  { highlight: 'GMT+3', label: 'Business-hour overlap' },
  { highlight: 'Emerging', label: 'Outsourcing hub' },
  { highlight: 'AI-first', label: 'Workforce model' },
];

export const leadershipPrinciples: LeadershipPrinciple[] = [
  {
    title: 'Delivery ownership',
    description: 'A pod lead owns priorities, workload, and escalation.',
  },
  {
    title: 'Quality ownership',
    description: 'QA checks standards and closes gaps before they spread.',
  },
  {
    title: 'Performance visibility',
    description:
      'Weekly reporting keeps progress, risks, and next actions clear.',
  },
];
