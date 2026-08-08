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

import { Dots } from '@/components/shared/Dots';
import {
  fadeUpItem,
  staggerContainer,
} from '@/components/shared/motion-variants';
import { Button, buttonVariants } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authClient } from '@/lib/auth-client';
import {
  createResetPasswordSchema,
  type ResetPasswordFormValues,
} from '@/lib/forms/reset-password';
import { Link } from '@/i18n/navigation';

type ResetPasswordFormProps = {
  invalidToken: boolean;
  token: string;
};

export function ResetPasswordForm({
  invalidToken,
  token,
}: ResetPasswordFormProps) {
  const t = useTranslations('Auth.resetPassword');
  const reduceMotion = useReducedMotion();
  const requirements = t.raw('default.requirements.items') as string[];
  const [invalid, setInvalid] = useState(invalidToken);
  const [resetted, setResetted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
        passwordMax: t('validation.passwordMax'),
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

  async function onSubmit(data: ResetPasswordFormValues) {
    setSubmitError(null);
    setIsPending(true);
    try {
      const result = await authClient.resetPassword({
        newPassword: data.newPassword,
        token,
      });
      if (result.error !== null) {
        if (result.error.status === 400 || result.error.status === 403) {
          setInvalid(true);
          return;
        }
        setSubmitError(t('errors.generic'));
        return;
      }
      setResetted(true);
    } catch {
      setSubmitError(t('errors.generic'));
    } finally {
      setIsPending(false);
    }
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

  if (invalid) {
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
      variants={staggerContainer}
      initial={reduceMotion ? 'show' : 'hidden'}
      animate="show"
    >
      <motion.div variants={fadeUpItem}>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.02em] text-primary">
          <span
            className="size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {t('default.verifiedBadge')}
        </span>
      </motion.div>

      <motion.div variants={fadeUpItem}>
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
            {t('default.title')}
          </h2>
        </div>
      </motion.div>

      <motion.div variants={fadeUpItem}>
        <FieldGroup className="gap-3">
          <Field data-invalid={Boolean(errors.newPassword)}>
            <FieldLabel
              htmlFor="newPassword"
              className="text-xs font-medium text-foreground"
            >
              {t('default.fields.newPassword.label')}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder={t('default.fields.newPassword.placeholder')}
                aria-invalid={Boolean(errors.newPassword)}
                aria-describedby={
                  errors.newPassword ? 'newPassword-error' : undefined
                }
                {...register('newPassword')}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  aria-label={
                    showNewPassword
                      ? t('default.hidePassword')
                      : t('default.showPassword')
                  }
                  onClick={() => setShowNewPassword((v) => !v)}
                >
                  {showNewPassword ? (
                    <EyeOffIcon aria-hidden="true" />
                  ) : (
                    <EyeIcon aria-hidden="true" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldError id="newPassword-error" errors={[errors.newPassword]} />
          </Field>

          <Field data-invalid={Boolean(errors.confirmPassword)}>
            <FieldLabel
              htmlFor="confirmPassword"
              className="text-xs font-medium text-foreground"
            >
              {t('default.fields.confirmPassword.label')}
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder={t('default.fields.confirmPassword.placeholder')}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? 'confirmPassword-error' : undefined
                }
                {...register('confirmPassword')}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  aria-label={
                    showConfirmPassword
                      ? t('default.hidePassword')
                      : t('default.showPassword')
                  }
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon aria-hidden="true" />
                  ) : (
                    <EyeIcon aria-hidden="true" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <FieldError
              id="confirmPassword-error"
              errors={[errors.confirmPassword]}
            />
          </Field>
        </FieldGroup>
      </motion.div>

      <motion.div variants={fadeUpItem}>
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
      </motion.div>

      <motion.div variants={fadeUpItem}>
        {submitError !== null ? (
          <Alert variant="destructive" className="rounded-md px-3 py-2">
            <AlertDescription className="text-xs leading-[1.5]">
              {submitError}
            </AlertDescription>
          </Alert>
        ) : null}
      </motion.div>

      <motion.div variants={fadeUpItem}>
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
              {t('default.submit')}
              <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </>
          )}
        </Button>
      </motion.div>

      <motion.div variants={fadeUpItem}>
        <div className="flex justify-center pt-0.5">{backToSignIn}</div>
      </motion.div>
    </motion.form>
  );
}
