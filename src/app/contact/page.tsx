import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { ContactForm } from '@/components/sections/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact BlihOps about managed outsourcing, AI automation, partnerships, or a general enquiry.',
  alternates: {
    canonical: '/contact',
  },
};

const contactDetails = [
  ['Response time', 'Within one business day'],
  ['Working region', 'Europe, Middle East and Africa'],
  ['Delivery base', 'Addis Ababa, Ethiopia'],
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/80">
        <SectionWrapper className="py-10 md:py-14 lg:py-20">
          <div className="relative border-x border-border/80">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -left-3 h-px w-3 bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute -top-4 -right-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -right-3 h-px w-3 bg-border"
            />

            <div className="flex items-center justify-between border-y border-border/80 px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-8">
              <span>Contact BlihOps</span>
              <span>New business / General enquiries</span>
            </div>

            <div className="grid lg:grid-cols-[0.88fr_1.12fr] lg:divide-x lg:divide-border/80">
              <div className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-20">
                <p className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
                  Start a conversation
                </p>
                <h1 className="mt-7 max-w-lg font-heading text-5xl leading-[0.94] font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                  Tell us what needs attention.
                </h1>
                <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                  Share the operational problem, partnership idea, or question.
                  We will connect you with the right person.
                </p>

                <a
                  href="mailto:blih.marketing2023@gmail.com"
                  className="mt-12 inline-block border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:text-primary"
                >
                  blih.marketing2023@gmail.com
                </a>

                <dl className="mt-12 border-t border-border/80">
                  {contactDetails.map(([term, detail], index) => (
                    <div
                      key={term}
                      className="grid grid-cols-[2rem_0.8fr_1.2fr] gap-3 border-b border-border/80 py-4 text-sm"
                    >
                      <span className="font-mono text-[10px] text-primary">
                        0{index + 1}
                      </span>
                      <dt className="text-muted-foreground">{term}</dt>
                      <dd className="text-foreground">{detail}</dd>
                    </div>
                  ))}
                </dl>

                <figure className="mt-14 hidden lg:block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src="/addis-image.jpg"
                      alt="Addis Ababa skyline at night"
                      fill
                      className="object-cover saturate-[0.72]"
                      sizes="28rem"
                      priority
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-b border-border/80 py-4 text-xs text-muted-foreground">
                    <span>Built and delivered from Addis Ababa.</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      UTC +3
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="border-t border-border/80 px-5 py-12 sm:px-8 md:py-16 lg:border-t-0 lg:px-10 lg:py-20">
                <ContactForm />
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      <SectionWrapper
        as="section"
        className="py-24 md:py-32"
        aria-labelledby="pilot-route"
      >
        <div className="grid items-end gap-10 border-y border-border/80 py-10 md:grid-cols-[0.72fr_1.28fr] md:gap-20 md:py-14">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Looking for proof first?
            </p>
            <h2
              id="pilot-route"
              className="mt-5 max-w-sm font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              Test one workflow before you commit.
            </h2>
          </div>

          <div className="md:pb-1">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              The free two-week pilot gives you clear scope, measures, and
              reporting before a longer engagement.
            </p>
            <Link
              href="/pilot"
              className="mt-7 inline-flex items-center gap-3 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:text-primary"
            >
              Start a two-week pilot
              <ArrowUpRightIcon
                className="size-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
