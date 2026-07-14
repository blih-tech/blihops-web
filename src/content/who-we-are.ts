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

export const story: StoryContent = {
  eyebrow: 'Our story',
  heading: 'Born from the operations we',
  headingAccent: 'wished someone would handle',
  pullQuote:
    'We saw the same problem in every growing business we worked with: brilliant founders buried under operations. They didn\u2019t need more people. They needed an intelligent system. So we built one.',
  paragraphs: [
    'Blih Intelligent Operations was born inside Blih Marketing & Communications, an established agency in Addis Ababa that learned firsthand what it takes to build operations that scale. After years of perfecting internal SOPs, KPIs, automation workflows, and AI integrations, we realized the frameworks we built for ourselves could transform how other businesses run.',
    'We launched BlihOps to deliver intelligent operations to growing businesses worldwide. Not just people. Not just technology. A complete system where human talent and AI work together to produce better outcomes, faster delivery, and measurable results.',
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
    alt: 'BlihOps team at work in the Addis Ababa office',
    caption: 'Addis Ababa, Ethiopia',
  },
};
