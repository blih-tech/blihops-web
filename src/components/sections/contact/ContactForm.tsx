'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, CheckCircle2Icon, RotateCcwIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  createContactSchema,
  type ContactFormValues,
} from '@/lib/forms/contact';

const inputClassName =
  'h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const textareaClassName =
  'min-h-40 w-full resize-y rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base leading-relaxed text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const topics = [
  { value: 'Outsourcing services', key: 'outsourcing' },
  { value: 'AI and workflow automation', key: 'automation' },
  { value: 'Partnership', key: 'partnership' },
  { value: 'General enquiry', key: 'general' },
] as const;

export function ContactForm() {
  const t = useTranslations('ContactPage.form');
  const tForms = useTranslations('Shared.forms');
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: standardSchemaResolver(
      createContactSchema({
        fullNameRequired: tForms('validation.fullNameRequired'),
        fullNameMax: tForms('validation.fullNameMax'),
        emailInvalid: t('validation.emailInvalid'),
        emailMax: tForms('validation.emailMax'),
        companyMax: tForms('validation.companyMax'),
        topicRequired: t('validation.topicRequired'),
        messageRequired: t('validation.messageRequired'),
        messageMax: t('validation.messageMax'),
      }),
    ),
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
              {t('label')}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary uppercase">
              <span className="size-1.5 rounded-full bg-primary" />
              {tForms('received')}
            </span>
          </div>

          <CheckCircle2Icon
            className="size-9 text-primary"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <h2 className="mt-8 max-w-lg font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
            {t('success.title')}
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
            {t('success.description')}
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
            {t('success.sendAnother')}
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
          {t('label')}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {t('duration', { minutes: 2 })}
        </span>
      </div>

      <div className="border-b border-border/80 py-10 sm:py-12">
        <h2 className="max-w-lg font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {t('description')}
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
              {tForms('fields.fullName.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder={tForms('fields.fullName.placeholder')}
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
              {tForms('fields.workEmail.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <input
              id="workEmail"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder={tForms('fields.workEmail.placeholder')}
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
            {tForms('fields.company.label')}{' '}
            <span className="font-normal text-muted-foreground">
              ({tForms('optional')})
            </span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder={tForms('fields.company.placeholder')}
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
            {t('fields.topic.label')}{' '}
            <span className="text-destructive">*</span>
          </label>
          <select
            id="topic"
            required
            aria-invalid={Boolean(errors.topic)}
            aria-describedby={errors.topic ? 'topic-error' : undefined}
            className={inputClassName}
            {...register('topic')}
          >
            <option value="">{t('fields.topic.placeholder')}</option>
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {t(`fields.topic.options.${topic.key}`)}
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
            {t('fields.message.label')}{' '}
            <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder={t('fields.message.placeholder')}
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
              {t('fields.message.help')}
            </p>
          )}
        </div>

        <div className="border-t border-border/80 pt-8">
          <Button
            type="submit"
            size="lg"
            className="h-12 w-full justify-between rounded-none px-5"
          >
            {t('submit')}
            <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
          </Button>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            {t('consent')}
          </p>
        </div>
      </form>
    </motion.div>
  );
}
