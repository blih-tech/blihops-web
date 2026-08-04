'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  Link2OffIcon,
  LockKeyholeIcon,
  MailCheckIcon,
  ShieldCheckIcon,
  UserRoundCogIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import { authInputClassName } from '@/components/sections/auth/auth-form-styles';
import {
  createAcceptInvitationSchema,
  type AcceptInvitationFormValues,
} from '@/lib/forms/accept-invitation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type AcceptInvitationFormProps = {
  invalidToken: boolean;
  invitedEmail: string;
};

export function AcceptInvitationForm({
  invalidToken,
  invitedEmail,
}: AcceptInvitationFormProps) {
  const t = useTranslations('Auth.acceptInvitation');
  const reduceMotion = useReducedMotion();
  const [created, setCreated] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const createdRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationFormValues>({
    resolver: standardSchemaResolver(
      createAcceptInvitationSchema({
        newPasswordRequired: t('validation.newPasswordRequired'),
        passwordMin: t('validation.passwordMin'),
        passwordRequirements: t('validation.passwordRequirements'),
        confirmRequired: t('validation.confirmRequired'),
        confirmMismatch: t('validation.confirmMismatch'),
      }),
    ),
    mode: 'onBlur',
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (created) {
      createdRef.current?.focus();
    }
  }, [created]);

  function onSubmit(data: AcceptInvitationFormValues) {
    console.info('Account created for invitation:', invitedEmail);
    console.info('New password:', data.newPassword);
    setCreated(true);
  }

  const requirements = t.raw('default.requirements.items') as string[];

  if (invalidToken) {
    return (
      <motion.div
        key="invalid-invitation"
        className="flex flex-col gap-5"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-destructive">
          <span
            className="size-1.5 rounded-full bg-destructive"
            aria-hidden="true"
          />
          {t('invalid.badge')}
        </span>

        <div className="flex flex-col gap-2.5">
          <div className="flex size-[52px] items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10">
            <Link2OffIcon
              className="size-[22px] text-destructive"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <h2 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {t('invalid.title')}
          </h2>
          <p className="text-sm leading-[1.6] text-muted-foreground">
            {t('invalid.description')}
          </p>
        </div>

        <div className="flex items-center gap-3.5 rounded-md border border-border bg-muted p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <UserRoundCogIcon
              className="size-[18px] text-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-heading text-base font-semibold text-foreground">
              {t('invalid.guidanceTitle')}
            </span>
            <span className="text-xs leading-[1.5] text-muted-foreground">
              {t('invalid.guidanceDescription')}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-normal text-muted-foreground">
          <ShieldCheckIcon
            className="size-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {t('invalid.safetyNote')}
        </div>
      </motion.div>
    );
  }

  if (created) {
    return (
      <motion.div
        ref={createdRef}
        key="account-created"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col gap-5 outline-none"
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
          {t('created.badge')}
        </span>

        <div className="flex flex-col gap-2.5">
          <div className="flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <CheckIcon
              className="size-6 text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <h2 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
            {t('created.title')}
          </h2>
          <p className="text-sm leading-[1.6] text-muted-foreground">
            {t('created.description')}
          </p>
        </div>

        <div className="flex items-center gap-3.5 rounded-md border border-border bg-muted p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <MailCheckIcon
              className="size-[18px] text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-mono text-[9px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
              {t('created.summaryLabel')}
            </span>
            <span className="text-[13px] font-medium break-all text-foreground">
              {invitedEmail}
            </span>
          </div>
        </div>

        <Link
          href="/auth/sign-in"
          className={buttonVariants({ size: 'lg', className: 'h-10 w-full' })}
        >
          {t('created.goToSignIn')}
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Link>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-normal text-muted-foreground">
          <KeyRoundIcon
            className="size-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {t('created.note')}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      id="accept-invitation-form"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-primary">
        <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
        {t('default.verifiedBadge')}
      </span>

      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
          {t('default.title')}
        </h2>
        <p className="text-sm leading-[1.6] text-muted-foreground">
          {t('default.description')}
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-foreground"
            htmlFor="invitedEmail"
          >
            {t('default.fields.invitedEmail.label')}
          </label>
          <div className="relative">
            <input
              id="invitedEmail"
              type="email"
              value={invitedEmail}
              readOnly
              className={cn(
                authInputClassName,
                'bg-muted pr-10 text-foreground read-only:cursor-not-allowed read-only:opacity-100',
              )}
            />
            <span
              className="pointer-events-none absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground"
              aria-hidden="true"
            >
              <LockKeyholeIcon className="size-4" strokeWidth={1.5} />
            </span>
          </div>
          <p className="text-xs leading-[1.4] text-muted-foreground">
            {t('default.fields.invitedEmail.helper')}
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-foreground"
            htmlFor="newPassword"
          >
            {t('default.fields.newPassword.label')}
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder={t('default.fields.newPassword.placeholder')}
              aria-invalid={Boolean(errors.newPassword)}
              aria-describedby={
                errors.newPassword ? 'newPassword-error' : undefined
              }
              className={cn(authInputClassName, 'pr-10')}
              {...register('newPassword')}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((v) => !v)}
              aria-label={
                showNewPassword
                  ? t('default.hidePassword')
                  : t('default.showPassword')
              }
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showNewPassword ? (
                <EyeOffIcon className="size-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.newPassword ? (
            <p
              id="newPassword-error"
              role="alert"
              className="text-xs leading-[1.4] text-destructive"
            >
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-foreground"
            htmlFor="confirmPassword"
          >
            {t('default.fields.confirmPassword.label')}
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder={t('default.fields.confirmPassword.placeholder')}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? 'confirmPassword-error' : undefined
              }
              className={cn(authInputClassName, 'pr-10')}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={
                showConfirmPassword
                  ? t('default.hidePassword')
                  : t('default.showPassword')
              }
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="size-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p
              id="confirmPassword-error"
              role="alert"
              className="text-xs leading-[1.4] text-destructive"
            >
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-md border border-border bg-muted p-3">
        <p className="font-mono text-[9px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {t('default.requirements.label')}
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
          {requirements.map((requirement) => (
            <li
              key={requirement}
              className="flex items-center gap-1.5 text-[11px] text-foreground/70"
            >
              <CheckIcon
                className="size-3 shrink-0 text-primary"
                strokeWidth={2}
                aria-hidden="true"
              />
              {requirement}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
        {t('default.termsPrefix')}{' '}
        <Link
          href="/terms-of-service"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          {t('default.termsLink')}
        </Link>{' '}
        <Link
          href="/privacy"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          {t('default.privacyLink')}
        </Link>
      </p>

      <Button type="submit" size="lg" className="h-10 w-full">
        {t('default.submit')}
        <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
      </Button>

      <p className="flex items-center justify-center gap-1 pt-1 text-[11px] text-muted-foreground">
        {t('default.existingPrompt')}
        <Link
          href="/auth/sign-in"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {t('default.existingAction')}
        </Link>
      </p>
    </motion.form>
  );
}
