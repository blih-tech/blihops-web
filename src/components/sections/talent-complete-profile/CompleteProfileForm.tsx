'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowRightIcon,
  CameraIcon,
  CheckCircle2Icon,
  LoaderCircleIcon,
  RotateCcwIcon,
  XIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  createTalentCompleteProfileSchema,
  type TalentCompleteProfileValues,
} from '@/lib/forms/talent-complete-profile';
import {
  getCompletionRequest,
  submitTalentCompletion,
  toTalentSubmitErrorMessage,
  uploadResumeFile,
} from '@/lib/api/talent';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const inputClassName =
  'h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive sm:text-sm';

const textareaClassName =
  'w-full min-h-28 rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:bg-muted/40 aria-invalid:border-destructive resize-y sm:text-sm';

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type CompleteProfileFormProps = {
  token?: string | null;
};

export function CompleteProfileForm({ token }: CompleteProfileFormProps) {
  const t = useTranslations('TalentCompleteProfilePage.form');
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tokenInfo, setTokenInfo] = useState<{ fullName: string; workEmail: string; expiresAt: string } | null>(null);
  const [tokenLoading, setTokenLoading] = useState<boolean>(Boolean(token));
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = createTalentCompleteProfileSchema({
    professionalHeadlineRequired: t('validation.professionalHeadlineRequired'),
    professionalHeadlineMax: t('validation.professionalHeadlineMax'),
    bioRequired: t('validation.bioRequired'),
    bioMax: t('validation.bioMax'),
    photoRequired: t('validation.photoRequired'),
    photoInvalidType: t('validation.photoInvalidType'),
    photoTooLarge: t('validation.photoTooLarge'),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TalentCompleteProfileValues>({
    resolver: standardSchemaResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      professionalHeadline: '',
      bio: '',
    },
  });

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTokenLoading(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTokenError(null);
    getCompletionRequest(token)
      .then((res) => {
        if (!cancelled) setTokenInfo(res.data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg = toTalentSubmitErrorMessage(err, {
            generic: (err as Error).message || 'Invalid or expired link.',
            network: 'Network error. Please check your connection.',
            validation: (err as Error).message || 'Invalid link.',
            rateLimited: 'Too many attempts. Please try again later.',
            server: 'Server error. Please try again later.',
          });
          setTokenError(msg);
        }
      })
      .finally(() => {
        if (!cancelled) setTokenLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function onSubmit(data: TalentCompleteProfileValues) {
    if (!token) {
      setSubmitError('Missing completion link. Please use the link from your email.');
      return;
    }
    setSubmitError(null);
    try {
      const photoFileKey = await uploadResumeFile(data.photo);
      await submitTalentCompletion(token, {
        photoFileKey,
        shortBio: data.bio.trim(),
        professionalHeadline: data.professionalHeadline.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      const message = toTalentSubmitErrorMessage(err, {
        generic: (err as Error).message || 'Something went wrong. Please try again.',
        network: 'Network error. Check your connection.',
        validation: (err as Error).message || 'Please check your inputs.',
        rateLimited: 'Too many attempts. Please wait a moment.',
        server: 'Server error. Please try again later.',
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
              {t('received')}
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
          {t('duration', { minutes: 5 })}
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

      {!token ? (
        <div role="alert" className="rounded-md border border-amber-500/30 bg-amber-500/10 px-4 py-4 text-sm text-amber-700">
          No completion token found. Please use the link from your approval email. If you need a new link, contact support.
        </div>
      ) : tokenLoading ? (
        <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" /> Validating your link...
        </div>
      ) : tokenError ? (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-4 text-sm text-destructive">
          {tokenError}
        </div>
      ) : tokenInfo ? (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700">
          Welcome back, <span className="font-semibold">{tokenInfo.fullName}</span> ({tokenInfo.workEmail}) — your link is valid until{' '}
          {new Date(tokenInfo.expiresAt).toLocaleString('en-GB')}. Complete the form below to submit.
        </div>
      ) : null}

      <form
        id="talent-complete-profile-form"
        className="space-y-14 pt-12"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className="space-y-8">
          <legend className="mb-8 flex items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <span className="text-primary">01</span>
            {t('sections.profile')}
          </legend>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="professionalHeadline"
            >
              {t('fields.professionalHeadline.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <input
              id="professionalHeadline"
              type="text"
              autoComplete="organization-title"
              placeholder={t('fields.professionalHeadline.placeholder')}
              required
              aria-invalid={Boolean(errors.professionalHeadline)}
              aria-describedby={
                errors.professionalHeadline
                  ? 'professionalHeadline-error'
                  : undefined
              }
              className={inputClassName}
              {...register('professionalHeadline')}
            />
            {errors.professionalHeadline ? (
              <p
                id="professionalHeadline-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.professionalHeadline.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="bio"
            >
              {t('fields.bio.label')}{' '}
              <span className="text-destructive">*</span>
            </label>
            <textarea
              id="bio"
              rows={4}
              placeholder={t('fields.bio.placeholder')}
              required
              aria-invalid={Boolean(errors.bio)}
              aria-describedby={errors.bio ? 'bio-error' : undefined}
              className={textareaClassName}
              {...register('bio')}
            />
            {errors.bio ? (
              <p
                id="bio-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.bio.message}
              </p>
            ) : null}
          </div>

          <Controller
            control={control}
            name="photo"
            render={({ field }) => (
              <PhotoField
                id="photo"
                label={t('fields.photo.label')}
                hint={t('fields.photo.hint')}
                value={field.value}
                onChange={field.onChange}
                error={errors.photo?.message}
              />
            )}
          />
        </fieldset>

        {submitError ? (
          <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {submitError}
          </div>
        ) : null}
        <div className="border-t border-border/80 pt-8">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || Boolean(tokenError) || !token}
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

function PhotoField({
  id,
  label,
  hint,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  hint: string;
  value: File | null | undefined;
  onChange: (file: File | null) => void;
  error?: string;
}) {
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
        {label} <span className="text-destructive">*</span>
      </label>
      <input
        id={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        required
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
          <Image
            src={previewUrl}
            alt=""
            className="size-14 shrink-0 rounded-full border border-border bg-background object-cover"
          />
        ) : (
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary">
            <CameraIcon
              className="size-5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
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
            <span className="block text-sm text-muted-foreground">{hint}</span>
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
