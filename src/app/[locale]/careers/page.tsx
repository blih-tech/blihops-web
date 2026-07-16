import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, MapPinIcon } from 'lucide-react';
import * as motion from 'motion/react-client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CareersHero } from '@/components/sections/careers/Hero';
import { careerRoles } from '@/content/careers';
import { createGenerateMetadata } from '@/i18n/metadata';

const sectionReveal = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.12 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const;

export const generateMetadata = createGenerateMetadata('careers', '/careers');

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CareersHero />

        <motion.section
          {...sectionReveal}
          id="open-roles"
          className="scroll-mt-24 py-16 md:py-24"
          aria-labelledby="open-roles-heading"
        >
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:col-span-4">
              <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
                Open positions
              </p>
              <h2
                id="open-roles-heading"
                className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Find where you fit
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                We value clear thinking, dependable execution, and people who
                improve the system around them.
              </p>
            </div>

            <div className="border-t border-border lg:col-span-8">
              {careerRoles.length > 0 ? (
                careerRoles.map((role, index) => (
                  <motion.div
                    key={role.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/careers/${role.slug}`}
                      className="group grid gap-5 border-b border-border py-7 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:px-5"
                    >
                      <span className="font-mono text-[11px] tracking-widest text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="block font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                          {role.title}
                        </span>
                        <span className="mt-3 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {role.summary}
                        </span>
                        <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                          <span>{role.department}</span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPinIcon
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            {role.location}
                          </span>
                          <span>{role.workMode}</span>
                          <span>{role.employmentType}</span>
                        </span>
                      </span>
                      <span className="flex size-10 items-center justify-center self-start rounded-md border border-border bg-background text-primary transition-[color,background-color,border-color,transform] group-hover:translate-x-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRightIcon className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="border-b border-border py-12">
                  <h3 className="font-heading text-2xl font-semibold">
                    No open roles right now
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    Our teams are still growing. Check back for new
                    opportunities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </SectionWrapper>
    </main>
  );
}
