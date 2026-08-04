'use client';

import { useEffect, useRef, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  Link2OffIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button, buttonVariants } from '@/components/ui/button';
import { authInputClassName } from '@/components/sections/auth/auth-form-styles';
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/lib/forms/reset-password';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type ResetPasswordFormProps = {
  invalidToken: boolean;
};

export function ResetPasswordForm({ invalidToken }: ResetPasswordFormProps) {
  const t = useTranslations('Auth.resetPassword');
  const reduceMotion = useReducedMotion();
  const [resetted, setResetted] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: standardSchemaResolver(
      createResetPasswordSchema({
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
    if (resetted) {
      successRef.current?.focus();
    }
  }, [resetted]);

  function onSubmit(data: ResetPasswordFormValues) {
    console.info('Password reset submitted:', data.newPassword);
    setResetted(true);
  }

  const backToSignIn = (
    <Link
      href="/auth/sign-in"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
    >
      <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
      {t('default.backToSignIn')}
    </Link>
  );

  if (invalidToken) {
    return (
      <motion.div
        key="invalid-token"
        className="flex flex-col gap-4"
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
          <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            {t('invalid.title')}
          </h2>
          <p className="text-[13px] leading-[1.5] text-muted-foreground">
            {t('invalid.description')}
          </p>
        </div>

        <div className="flex items-center gap-3.5 rounded-md border border-border bg-muted p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <ShieldCheckIcon
              className="size-[18px] text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <span className="font-heading text-base font-semibold text-foreground">
              {t('invalid.recoveryTitle')}
            </span>
            <span className="text-xs leading-[1.5] text-muted-foreground">
              {t('invalid.recoveryDescription')}
            </span>
          </div>
        </div>

        <Link
          href="/auth/forgot-password"
          className={buttonVariants({ size: 'lg', className: 'h-9 w-full' })}
        >
          {t('invalid.requestNewLink')}
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Link>

        <div className="flex justify-center pt-0.5">{backToSignIn}</div>
      </motion.div>
    );
  }

  if (resetted) {
    return (
      <motion.div
        ref={successRef}
        key="success"
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
          {t('success.badge')}
        </span>

        <div className="flex flex-col gap-2.5">
          <div className="flex size-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <CheckIcon
              className="size-6 text-primary"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            {t('success.title')}
          </h2>
          <p className="text-[13px] leading-[1.5] text-muted-foreground">
            {t('success.description')}
          </p>
        </div>

        <Link
          href="/auth/sign-in"
          className={buttonVariants({ size: 'lg', className: 'h-9 w-full' })}
        >
          {t('success.goToSignIn')}
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Link>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-normal text-muted-foreground">
          <KeyRoundIcon
            className="size-3.5"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          {t('success.note')}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      id="reset-password-form"
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

      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {t('default.title')}
        </h2>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
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

        <div className="space-y-1">
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

      <p className="text-xs leading-[1.4] text-muted-foreground">
        {t('default.minLength')}
      </p>

      <Button type="submit" size="lg" className="h-9 w-full">
        {t('default.submit')}
        <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
      </Button>

      <div className="flex justify-center pt-0.5">{backToSignIn}</div>
    </motion.form>
  );
}
