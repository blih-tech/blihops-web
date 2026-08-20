'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CheckIcon,
  FileTextIcon,
  LoaderCircleIcon,
  RotateCcwIcon,
  XIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  Controller,
  useForm,
  useWatch,
  type UseFormRegister,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  createTalentApplicationSchema,
  type TalentApplicationValues,
} from '@/lib/forms/talent-application';
import {
  submitTalentApplication,
  toTalentSubmitErrorMessage,
  uploadResumeFile,
  yearsExperienceToNumber,
} from '@/lib/api/talent';
import { cn } from '@/lib/utils';

const inputClassName =
  'h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const primaryRoleOptions = [
  { value: 'Frontend Developer', key: 'frontend' },
  { value: 'Backend Developer', key: 'backend' },
  { value: 'Full-Stack Developer', key: 'fullStack' },
  { value: 'Mobile Developer', key: 'mobile' },
  { value: 'DevOps Engineer', key: 'devops' },
  { value: 'QA Engineer', key: 'qa' },
  { value: 'Data Engineer / Analyst', key: 'data' },
  { value: 'AI / ML Engineer', key: 'aiMl' },
  { value: 'Automation Engineer', key: 'automation' },
  { value: 'Customer Support Specialist', key: 'customerSupport' },
  { value: 'Back-Office Specialist', key: 'backOffice' },
  { value: 'Other', key: 'other' },
] as const;

const yearsExperienceOptions = [
  { value: 'Under 1 year', key: 'underOne' },
  { value: '1-2 years', key: 'oneToTwo' },
  { value: '3-5 years', key: 'threeToFive' },
  { value: '5-8 years', key: 'fiveToEight' },
  { value: '8+ years', key: 'eightPlus' },
] as const;

const techStackSkills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'PHP',
  '.NET',
  'Swift',
  'Kotlin',
  'Flutter',
  'React Native',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
] as const;

const secondarySkills = [
  'REST APIs',
  'GraphQL',
  'Testing & QA',
  'CI/CD',
  'Linux',
  'Git',
  'Microservices',
  'Serverless',
  'Agile / Scrum',
  'Figma',
  'Storybook',
  'WordPress',
  'Shopify',
  'Excel / Sheets',
  'CRM tools',
  'Email & chat support',
] as const;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type FileFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint: string;
  accept: string;
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
  Icon: typeof FileTextIcon;
};

function FileField({
  id,
  label,
  required,
  hint,
  accept,
  value,
  onChange,
  error,
  Icon,
}: FileFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    [],
  );

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    if (file && file.type.startsWith('image/')) {
      objectUrlRef.current = URL.createObjectURL(file);
    }
    setPreviewUrl(objectUrlRef.current);
    onChange(file);
  }

  function handleClear() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreviewUrl(null);
    onChange(null);
  }

  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={id}>
        {label} {required ? <span className="text-destructive">*</span> : null}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        className="sr-only"
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        onChange={handleFileChange}
      />
      <label
        htmlFor={id}
        className={cn(
          'flex min-h-24 cursor-pointer items-center gap-4 rounded-md border border-border bg-muted/40 px-4 py-3 transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary focus-within:border-primary',
          error && 'border-destructive',
        )}
      >
        {previewUrl && value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt=""
            className="size-14 shrink-0 rounded-md border border-border bg-background object-cover"
          />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          {value ? (
            <>
              <span className="block truncate text-sm font-medium text-foreground">
                {value.name}
              </span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {formatFileSize(value.size)}
              </span>
            </>
          ) : (
            <>
              <span className="block text-sm text-muted-foreground">
                {hint}
              </span>
            </>
          )}
        </span>
        {value ? (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              handleClear();
            }}
            className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            aria-label={`Remove ${label.toLowerCase()}`}
          >
            <XIcon className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground">
            <ArrowRightIcon className="size-4" aria-hidden="true" />
          </span>
        )}
      </label>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChipGroup({
  name,
  values,
  selected,
  errorId,
  register,
}: {
  name: 'techStack' | 'secondarySkills';
  values: readonly string[];
  selected: readonly string[];
  errorId?: string;
  register: UseFormRegister<TalentApplicationValues>;
}) {
  return (
    <div
      role="group"
      aria-describedby={errorId}
      className="flex w-full flex-wrap items-center gap-2.5 rounded-md border border-border bg-muted/40 p-3"
    >
      {values.map((skill) => {
        const checked = selected.includes(skill);
        return (
          <label
            key={skill}
            className={cn(
              'inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              checked
                ? 'border-primary bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:border-primary/40 hover:text-foreground',
            )}
          >
            <input
              type="checkbox"
              className="sr-only"
              value={skill}
              {...register(name)}
            />
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded-sm border',
                checked
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background',
              )}
              aria-hidden="true"
            >
              {checked ? <CheckIcon className="size-3" /> : null}
            </span>
            {skill}
          </label>
        );
      })}
    </div>
  );
}

export function TalentApplicationForm() {
  const t = useTranslations('TalentApplyPage.form');
  const tForms = useTranslations('Shared.forms');
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const schema = createTalentApplicationSchema({
    fullNameRequired: tForms('validation.fullNameRequired'),
    fullNameMax: tForms('validation.fullNameMax'),
    emailInvalid: t('validation.emailInvalid'),
    emailMax: tForms('validation.emailMax'),
    phoneRequired: t('validation.phoneRequired'),
    phoneMax: t('validation.phoneMax'),
    countryRequired: t.has('validation.countryRequired')
      ? t('validation.countryRequired')
      : t('validation.cityRequired'),
    cityRequired: t('validation.cityRequired'),
    primaryRoleRequired: t('validation.primaryRoleRequired'),
    techStackRequired: t('validation.techStackRequired'),
    yearsExperienceRequired: t('validation.yearsExperienceRequired'),
    urlInvalid: t('validation.urlInvalid'),
    urlMax: t('validation.urlMax'),
    resumeRequired: t('validation.resumeRequired'),
    resumeInvalidType: t('validation.resumeInvalidType'),
    resumeTooLarge: t('validation.resumeTooLarge'),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TalentApplicationValues>({
    resolver: standardSchemaResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      country: 'Ethiopia',
      city: '',
      primaryRole: '',
      techStack: [],
      secondarySkills: [],
      yearsExperience: '',
      portfolio: '',
      github: '',
      linkedin: '',
    },
  });

  const selectedTech = useWatch({ control, name: 'techStack' }) ?? [];
  const selectedSecondary =
    useWatch({ control, name: 'secondarySkills' }) ?? [];

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  async function onSubmit(data: TalentApplicationValues) {
    setSubmitError(null);
    try {
      const resumeFileKey = await uploadResumeFile(data.resume);
      const yearsExperience =
        yearsExperienceToNumber[data.yearsExperience] ?? 0;
      await submitTalentApplication({
        fullName: data.fullName.trim(),
        workEmail: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        country: data.country.trim(),
        city: data.city.trim(),
        primaryRole: data.primaryRole,
        techStack: data.techStack,
        secondarySkills: data.secondarySkills ?? [],
        yearsExperience,
        portfolioUrl: data.portfolio?.trim() || undefined,
        githubUrl: data.github?.trim() || undefined,
        linkedinUrl: data.linkedin?.trim() || undefined,
        resumeFileKey,
      });
      setSubmitted(true);
    } catch (err) {
      const message = toTalentSubmitErrorMessage(err, {
        generic: t.has('errors.generic')
          ? t('errors.generic')
          : 'Something went wrong. Please try again.',
        network: t.has('errors.network')
          ? t('errors.network')
          : 'Network error. Check your connection.',
        validation: (err as Error).message || 'Please check your inputs.',
        rateLimited: t.has('errors.rateLimited')
          ? t('errors.rateLimited')
          : 'Too many attempts. Please wait a moment.',
        server: t.has('errors.server')
          ? t('errors.server')
          : 'Server error. Please try again later.',
      });
      setSubmitError(message);
    }
  }

  function startAnotherApplication() {
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
            onClick={startAnotherApplication}
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
          {t('duration', { minutes: 7 })}
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
        id="talent-application-form"
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
                htmlFor="email"
              >
                {t('fields.email.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder={t('fields.email.placeholder')}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClassName}
                {...register('email')}
              />
              {errors.email ? (
                <p
                  id="email-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.email.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="phone"
              >
                {t('fields.phone.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder={t('fields.phone.placeholder')}
                required
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClassName}
                {...register('phone')}
              />
              {errors.phone ? (
                <p
                  id="phone-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.phone.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="country"
              >
                {t.has('fields.country.label')
                  ? t('fields.country.label')
                  : 'Country'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="country"
                type="text"
                autoComplete="country-name"
                placeholder={
                  t.has('fields.country.placeholder')
                    ? t('fields.country.placeholder')
                    : 'Ethiopia'
                }
                required
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? 'country-error' : undefined}
                className={inputClassName}
                {...register('country')}
              />
              {errors.country ? (
                <p
                  id="country-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.country.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="city"
            >
              {t('fields.city.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              placeholder={t('fields.city.placeholder')}
              required
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? 'city-error' : undefined}
              className={inputClassName}
              {...register('city')}
            />
            {errors.city ? (
              <p
                id="city-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.city.message}
              </p>
            ) : null}
          </div>
        </fieldset>

        <fieldset className="space-y-8 border-t border-border/80 pt-12">
          <legend className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="text-primary">02</span>
            {t('sections.profile')}
          </legend>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="primaryRole"
              >
                {t('fields.primaryRole.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="primaryRole"
                aria-invalid={Boolean(errors.primaryRole)}
                aria-describedby={
                  errors.primaryRole ? 'primaryRole-error' : undefined
                }
                className={inputClassName}
                required
                {...register('primaryRole')}
              >
                <option value="">{t('fields.primaryRole.placeholder')}</option>
                {primaryRoleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`fields.primaryRole.options.${option.key}`)}
                  </option>
                ))}
              </select>
              {errors.primaryRole ? (
                <p
                  id="primaryRole-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.primaryRole.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="yearsExperience"
              >
                {t('fields.yearsExperience.label')}{' '}
                <span className="text-destructive">*</span>
              </label>
              <select
                id="yearsExperience"
                aria-invalid={Boolean(errors.yearsExperience)}
                aria-describedby={
                  errors.yearsExperience ? 'yearsExperience-error' : undefined
                }
                className={inputClassName}
                required
                {...register('yearsExperience')}
              >
                <option value="">
                  {t('fields.yearsExperience.placeholder')}
                </option>
                {yearsExperienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`fields.yearsExperience.options.${option.key}`)}
                  </option>
                ))}
              </select>
              {errors.yearsExperience ? (
                <p
                  id="yearsExperience-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.yearsExperience.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              {t('fields.techStack.label')}{' '}
              <span className="text-destructive">*</span>
            </span>
            <ChipGroup
              name="techStack"
              values={techStackSkills}
              selected={selectedTech}
              errorId={errors.techStack ? 'techStack-error' : undefined}
              register={register}
            />
            {errors.techStack ? (
              <p
                id="techStack-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.techStack.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {t('fields.techStack.hint')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">
              {t('fields.secondarySkills.label')}{' '}
              <span className="font-normal text-muted-foreground">
                ({tForms('optional')})
              </span>
            </span>
            <ChipGroup
              name="secondarySkills"
              values={secondarySkills}
              selected={selectedSecondary}
              register={register}
            />
            <p className="text-xs text-muted-foreground">
              {t('fields.secondarySkills.hint')}
            </p>
          </div>
        </fieldset>

        <fieldset className="space-y-8 border-t border-border/80 pt-12">
          <legend className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="text-primary">03</span>
            {t('sections.links')}
          </legend>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="portfolio"
              >
                {t('fields.portfolio.label')}{' '}
                <span className="font-normal text-muted-foreground">
                  ({tForms('optional')})
                </span>
              </label>
              <input
                id="portfolio"
                type="url"
                autoComplete="url"
                placeholder={t('fields.portfolio.placeholder')}
                aria-invalid={Boolean(errors.portfolio)}
                aria-describedby={
                  errors.portfolio ? 'portfolio-error' : undefined
                }
                className={inputClassName}
                {...register('portfolio')}
              />
              {errors.portfolio ? (
                <p
                  id="portfolio-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.portfolio.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-foreground"
                htmlFor="github"
              >
                {t('fields.github.label')}{' '}
                <span className="font-normal text-muted-foreground">
                  ({tForms('optional')})
                </span>
              </label>
              <input
                id="github"
                type="url"
                autoComplete="url"
                placeholder={t('fields.github.placeholder')}
                aria-invalid={Boolean(errors.github)}
                aria-describedby={errors.github ? 'github-error' : undefined}
                className={inputClassName}
                {...register('github')}
              />
              {errors.github ? (
                <p
                  id="github-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.github.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="linkedin"
            >
              {t('fields.linkedin.label')}{' '}
              <span className="font-normal text-muted-foreground">
                ({tForms('optional')})
              </span>
            </label>
            <input
              id="linkedin"
              type="url"
              autoComplete="url"
              placeholder={t('fields.linkedin.placeholder')}
              aria-invalid={Boolean(errors.linkedin)}
              aria-describedby={errors.linkedin ? 'linkedin-error' : undefined}
              className={inputClassName}
              {...register('linkedin')}
            />
            {errors.linkedin ? (
              <p
                id="linkedin-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.linkedin.message}
              </p>
            ) : null}
          </div>

          <Controller
            control={control}
            name="resume"
            render={({ field }) => (
              <FileField
                id="resume"
                label={t('fields.resume.label')}
                required
                accept=".pdf,.doc,.docx"
                hint={t('fields.resume.hint')}
                value={field.value}
                onChange={field.onChange}
                error={errors.resume?.message}
                Icon={FileTextIcon}
              />
            )}
          />
        </fieldset>

        {submitError ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {submitError}
          </div>
        ) : null}
        <div className="border-t border-border/80 pt-8">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-12 w-full justify-between rounded-none px-5"
          >
            {isSubmitting ? t('submitting') : t('submit')}
            {isSubmitting ? (
              <LoaderCircleIcon
                className="animate-spin"
                data-icon="inline-end"
                aria-hidden="true"
              />
            ) : (
              <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            )}
          </Button>
          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
            {t('consent')}
          </p>
        </div>
      </form>
    </motion.div>
  );
}
