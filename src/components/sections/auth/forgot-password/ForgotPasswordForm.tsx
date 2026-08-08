'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InboxIcon,
  MailCheckIcon,
  MailIcon,
  RotateCwIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Dots } from '@/components/shared/Dots';
import {
  fadeUpItem,
  staggerContainer,
} from '@/components/shared/motion-variants';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import {
  createForgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '@/lib/forms/forgot-password';
import { Link } from '@/i18n/navigation';

export function ForgotPasswordForm() {
  const t = useTranslations('Auth.forgotPassword');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: standardSchemaResolver(
      createForgotPasswordSchema({
        emailRequired: t('validation.emailRequired'),
        emailInvalid: t('validation.emailInvalid'),
        emailMax: t('validation.emailMax'),
      }),
    ),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  useEffect(() => {
    if (sentTo) {
      successRef.current?.focus();
    }
  }, [sentTo]);

  async function onSubmit(data: ForgotPasswordFormValues) {
    setSubmitError(null);
    setIsPending(true);
    try {
      const result = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/${locale}/auth/reset-password`,
      });
      if (result.error !== null) {
        setSubmitError(t('errors.generic'));
        return;
      }
      setSentTo(data.email);
    } catch {
      setSubmitError(t('errors.generic'));
    } finally {
      setIsPending(false);
    }
  }

  function onResend() {
    console.info('Password reset email resent to:', sentTo);
  }

  const backToSignIn = (
    <Link
      href="/auth/sign-in"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
    >
      <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
      {t('request.backToSignIn')}
    </Link>
  );

  if (sentTo) {
    return (
      <motion.div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col gap-4 outline-none"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-primary">
          <span
            className="size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {t('sent.badge')}
        </span>

        <div className="flex flex-col gap-2.5">
          <div className="flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <MailCheckIcon
              className="size-6 text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            {t('sent.title')}
          </h2>
          <p className="text-[13px] leading-[1.5] text-muted-foreground">
            {t('sent.description')}
          </p>
        </div>

        <div className="flex items-center gap-3.5 rounded-md border border-border bg-muted p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <MailIcon
              className="size-[18px] text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-[9px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {t('sent.summaryLabel')}
            </span>
            <span className="text-[13px] font-medium break-all text-foreground">
              {sentTo}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-md border border-border bg-muted p-3.5">
          <InboxIcon
            className="size-4 shrink-0 text-muted-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="text-[11px] leading-[1.5] text-muted-foreground">
            {t('sent.deliveryNote')}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-9 w-full"
          onClick={onResend}
        >
          <RotateCwIcon data-icon="inline-start" aria-hidden="true" />
          {t('sent.resend')}
        </Button>

        <div className="flex justify-center pt-0.5">{backToSignIn}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial={reduceMotion ? 'show' : 'hidden'}
      animate="show"
      className="flex flex-col gap-1"
    >
      <motion.div variants={fadeUpItem}>
        <p className="font-mono text-[10px] font-semibold tracking-[0.11em] text-primary uppercase">
          {t('request.eyebrow')}
        </p>
      </motion.div>
      <motion.div variants={fadeUpItem}>
        <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {t('request.title')}
        </h2>
      </motion.div>
      <motion.div variants={fadeUpItem}>
        <p className="text-[13px] leading-[1.5] text-muted-foreground">
          {t('request.description')}
        </p>
      </motion.div>

      <motion.div variants={fadeUpItem}>
        <form
          id="forgot-password-form"
          className="mt-5 flex flex-col gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup className="gap-3.5">
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel
                htmlFor="email"
                className="text-xs font-medium text-foreground"
              >
                {t('request.fields.email.label')}
              </FieldLabel>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={t('request.fields.email.placeholder')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
              <FieldError id="email-error" errors={[errors.email]} />
            </Field>
          </FieldGroup>

          {submitError !== null ? (
            <Alert variant="destructive" className="rounded-md px-3 py-2">
              <AlertDescription className="text-xs leading-[1.5]">
                {submitError}
              </AlertDescription>
            </Alert>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-9 w-full"
            disabled={isPending}
          >
            {isPending ? (
              <Dots />
            ) : (
              <>
                {t('request.submit')}
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
              </>
            )}
          </Button>

          <div className="flex justify-center pt-0.5">{backToSignIn}</div>
        </form>
      </motion.div>
    </motion.div>
  );
}
