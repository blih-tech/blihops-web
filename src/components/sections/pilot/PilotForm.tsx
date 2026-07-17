'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, CheckCircle2Icon, RotateCcwIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { createPilotFormSchema, type PilotFormValues } from '@/lib/forms/pilot';

const inputClassName =
  'h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const textareaClassName =
  'min-h-32 w-full resize-y rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base leading-relaxed text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const serviceOptions = [
  { value: 'Customer support', key: 'customerSupport' },
  { value: 'Back-office operations', key: 'backOffice' },
  { value: 'Data processing', key: 'dataProcessing' },
  { value: 'IT and software support', key: 'itSoftware' },
  { value: 'AI and workflow automation', key: 'aiAutomation' },
  { value: 'Not sure yet', key: 'notSure' },
] as const;

const volumeOptions = [
  { value: 'Under 100 tasks per month', key: 'underHundred' },
  { value: '100–500 tasks per month', key: 'hundredToFiveHundred' },
  { value: '500–2,000 tasks per month', key: 'fiveHundredToTwoThousand' },
  { value: 'More than 2,000 tasks per month', key: 'overTwoThousand' },
  { value: 'It varies or is not measured yet', key: 'unknown' },
] as const;

const timelineOptions = [
  { value: 'As soon as possible', key: 'asap' },
  { value: 'Within 30 days', key: 'withinThirtyDays' },
  { value: 'Within 1–3 months', key: 'oneToThreeMonths' },
  { value: 'Just exploring for now', key: 'exploring' },
] as const;

export function PilotForm() {
  const t = useTranslations('PilotPage.form');
  const tForms = useTranslations('Shared.forms');
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const pilotFormSchema = createPilotFormSchema({
    fullNameRequired: tForms('validation.fullNameRequired'),
    fullNameMax: tForms('validation.fullNameMax'),
    emailInvalid: t('validation.emailInvalid'),
    emailMax: tForms('validation.emailMax'),
    companyRequired: t('validation.companyRequired'),
    companyMax: tForms('validation.companyMax'),
    serviceRequired: t('validation.serviceRequired'),
    challengeRequired: t('validation.challengeRequired'),
    challengeMax: t('validation.challengeMax'),
    volumeRequired: t('validation.volumeRequired'),
    timelineRequired: t('validation.timelineRequired'),
    contextMax: t('validation.contextMax'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PilotFormValues>({
    resolver: standardSchemaResolver(pilotFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      workEmail: '',
      company: '',
      service: '',
      challenge: '',
      volume: '',
      timeline: '',
      context: '',
    },
  });

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  function onSubmit(data: PilotFormValues) {
    console.info('Pilot request submitted:', data);
    setSubmitted(true);
  }

  function startAnotherRequest() {
    reset();
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <motion.div
        ref={successRef}
        className="flex min-h-[42rem] flex-col justify-between border-y border-border/80 py-10 outline-none"
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
          <p className="mb-4 text-sm text-muted-foreground">
            {t('success.anotherPrompt')}
          </p>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-12 rounded-none px-5"
            onClick={startAnotherRequest}
          >
            <RotateCcwIcon data-icon="inline-start" aria-hidden="true" />
            {t('success.startAnother')}
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
          {t('duration', { minutes: 4 })}
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
        id="pilot-form"
        className="space-y-14 pt-12"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className="space-y-8">
          <legend className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="text-primary">01</span>
            {t('sections.details')}
          </legend>

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
                aria-describedby={
                  errors.fullName ? 'fullName-error' : undefined
                }
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
              <span className="text-destructive">*</span>
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder={tForms('fields.company.placeholder')}
              required
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
        </fieldset>

        <fieldset className="space-y-8 border-t border-border/80 pt-12">
          <legend className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="text-primary">02</span>
            {t('sections.scope')}
          </legend>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="service"
            >
              {t('fields.service.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <select
              id="service"
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'service-error' : undefined}
              className={inputClassName}
              required
              {...register('service')}
            >
              <option value="">{t('fields.service.placeholder')}</option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(`fields.service.options.${option.key}`)}
                </option>
              ))}
            </select>
            {errors.service ? (
              <p
                id="service-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.service.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="challenge"
            >
              {t('fields.challenge.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <textarea
              id="challenge"
              rows={4}
              placeholder={t('fields.challenge.placeholder')}
              aria-invalid={Boolean(errors.challenge)}
              aria-describedby={
                errors.challenge ? 'challenge-error' : 'challenge-help'
              }
              className={textareaClassName}
              required
              {...register('challenge')}
            />
            {errors.challenge ? (
              <p
                id="challenge-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.challenge.message}
              </p>
            ) : (
              <p id="challenge-help" className="text-xs text-muted-foreground">
                {t('fields.challenge.help')}
              </p>
            )}
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="volume"
              >
                {t('fields.volume.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="volume"
                aria-invalid={Boolean(errors.volume)}
                aria-describedby={errors.volume ? 'volume-error' : undefined}
                className={inputClassName}
                required
                {...register('volume')}
              >
                <option value="">{t('fields.volume.placeholder')}</option>
                {volumeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`fields.volume.options.${option.key}`)}
                  </option>
                ))}
              </select>
              {errors.volume ? (
                <p
                  id="volume-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.volume.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="timeline"
              >
                {t('fields.timeline.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="timeline"
                aria-invalid={Boolean(errors.timeline)}
                aria-describedby={
                  errors.timeline ? 'timeline-error' : undefined
                }
                className={inputClassName}
                required
                {...register('timeline')}
              >
                <option value="">{t('fields.timeline.placeholder')}</option>
                {timelineOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`fields.timeline.options.${option.key}`)}
                  </option>
                ))}
              </select>
              {errors.timeline ? (
                <p
                  id="timeline-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.timeline.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="context"
            >
              {t('fields.context.label')}{' '}
              <span className="font-normal text-muted-foreground">
                ({tForms('optional')})
              </span>
            </label>
            <textarea
              id="context"
              rows={3}
              placeholder={t('fields.context.placeholder')}
              aria-invalid={Boolean(errors.context)}
              aria-describedby={errors.context ? 'context-error' : undefined}
              className={textareaClassName}
              {...register('context')}
            />
            {errors.context ? (
              <p
                id="context-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.context.message}
              </p>
            ) : null}
          </div>
        </fieldset>

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
