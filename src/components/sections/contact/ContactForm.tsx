'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, CheckCircle2Icon, RotateCcwIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { contactFormSchema, type ContactFormValues } from '@/lib/forms/contact';

const inputClassName =
  'h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const textareaClassName =
  'min-h-40 w-full resize-y rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base leading-relaxed text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const topics = [
  'Outsourcing services',
  'AI and workflow automation',
  'Partnership',
  'General enquiry',
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: standardSchemaResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      workEmail: '',
      company: '',
      topic: '',
      message: '',
    },
  });

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  function onSubmit(data: ContactFormValues) {
    console.info('Contact enquiry submitted:', data);
    setSubmitted(true);
  }

  function startAnotherMessage() {
    reset();
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <motion.div
        ref={successRef}
        className="flex min-h-[34rem] flex-col justify-between border-y border-border/80 py-10 outline-none"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div>
          <div className="mb-16 flex items-center justify-between border-b border-border/80 pb-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Contact enquiry
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              Received
            </span>
          </div>

          <CheckCircle2Icon
            className="size-9 text-primary"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <h2 className="mt-8 max-w-lg font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
            Thanks for reaching out.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            We will review your message and reply within one business day.
          </p>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-12 rounded-none px-5"
            onClick={startAnotherMessage}
          >
            <RotateCcwIcon data-icon="inline-start" aria-hidden="true" />
            Send another message
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex items-center justify-between border-y border-border/80 py-3">
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Contact enquiry
        </span>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          Approx. 02 min
        </span>
      </div>

      <div className="border-b border-border/80 py-10 sm:py-12">
        <h2 className="max-w-lg font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          What can we help with?
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Share the essentials. We will make sure your message reaches the right
          person.
        </p>
      </div>

      <form
        id="contact-form"
        className="space-y-10 pt-12"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="fullName"
            >
              Full name <span className="text-destructive">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={inputClassName}
              {...register('fullName')}
            />
            {errors.fullName ? (
              <p
                id="fullName-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.fullName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="workEmail"
            >
              Work email <span className="text-destructive">*</span>
            </label>
            <input
              id="workEmail"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              required
              aria-invalid={Boolean(errors.workEmail)}
              aria-describedby={
                errors.workEmail ? 'workEmail-error' : undefined
              }
              className={inputClassName}
              {...register('workEmail')}
            />
            {errors.workEmail ? (
              <p
                id="workEmail-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.workEmail.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="company"
          >
            Company{' '}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={inputClassName}
            {...register('company')}
          />
          {errors.company ? (
            <p
              id="company-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.company.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="topic"
          >
            Topic <span className="text-destructive">*</span>
          </label>
          <select
            id="topic"
            required
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? 'topic-error' : undefined}
            className={inputClassName}
            {...register('topic')}
          >
            <option value="">Select a topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errors.topic ? (
            <p
              id="topic-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.topic.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="message"
          >
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell us what you are working on and what you need from us."
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
            className={textareaClassName}
            {...register('message')}
          />
          {errors.message ? (
            <p
              id="message-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.message.message}
            </p>
          ) : (
            <p id="message-help" className="text-xs text-muted-foreground">
              Do not include passwords or sensitive customer data.
            </p>
          )}
        </div>

        <div className="border-t border-border/80 pt-8">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full justify-between rounded-none px-5"
          >
            Send enquiry
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            By submitting, you agree that BlihOps may contact you about this
            enquiry.
          </p>
        </div>
      </form>
    </motion.div>
  );
}
