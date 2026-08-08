'use client';

import { useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import {
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  Link2OffIcon,
  ShieldCheckIcon,
  UserRoundCogIcon,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Dots } from '@/components/shared/Dots';
import {
  fadeUpItem,
  staggerContainer,
} from '@/components/shared/motion-variants';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import { apiFetch } from '@/lib/api';
import {
  createAcceptInvitationSchema,
  type AcceptInvitationFormValues,
} from '@/lib/forms/accept-invitation';
import { Link, useRouter } from '@/i18n/navigation';

type AcceptInvitationFormProps = {
  invalidToken: boolean;
  token: string;
};

export function AcceptInvitationForm({
  invalidToken,
  token,
}: AcceptInvitationFormProps) {
  const t = useTranslations('Auth.acceptInvitation');
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const [invalid, setInvalid] = useState(invalidToken);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInvitationFormValues>({
    resolver: standardSchemaResolver(
      createAcceptInvitationSchema({
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

  async function onSubmit(data: AcceptInvitationFormValues) {
    setSubmitError(null);
    setIsPending(true);
    try {
      await apiFetch('/api/v1/auth/accept-invite', {
        method: 'POST',
        body: { token, newPassword: data.newPassword },
      });
      router.push('/auth/sign-in');
    } catch (err) {
      if (err instanceof Error && 'status' in err && err.status === 400) {
        setInvalid(true);
        return;
      }
      setSubmitError(t('errors.generic'));
    } finally {
      setIsPending(false);
    }
  }

  const requirements = t.raw('default.requirements.items') as string[];

  if (invalid) {
    return (
      <motion.div
        key="invalid-invitation"
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

  return (
    <motion.form
      id="accept-invitation-form"
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
          <p className="text-[13px] leading-[1.5] text-muted-foreground">
            {t('default.description')}
          </p>
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
        <p className="flex items-center justify-center gap-1 pt-1 text-[11px] text-muted-foreground">
          {t('default.existingPrompt')}
          <Link
            href="/auth/sign-in"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {t('default.existingAction')}
          </Link>
        </p>
      </motion.div>
    </motion.form>
  );
}
