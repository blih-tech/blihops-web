'use client';

import { useEffect, useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';

import { Dots } from '@/components/shared/Dots';
import {
  fadeUpItem,
  staggerContainer,
} from '@/components/shared/motion-variants';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authClient } from '@/lib/auth-client';
import { apiFetch } from '@/lib/api';
import { createSignInSchema, type SignInFormValues } from '@/lib/forms/sign-in';
import { Link, useRouter } from '@/i18n/navigation';

// TODO: Replace the placeholder workspace id with the user's real workspace
// once workspace resolution is wired to the API.
function workspacePath(role: string | undefined): string {
  switch (role) {
    case 'client':
      return '/client-workspace/placeholder';
    case 'talent':
      return '/talent-portal/placeholder';
    default:
      return '/';
  }
}

export function SignInForm() {
  const t = useTranslations('SignInPage.form');
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: session } = authClient.useSession();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: standardSchemaResolver(
      createSignInSchema({
        emailRequired: t('validation.emailRequired'),
        emailInvalid: t('validation.emailInvalid'),
        emailMax: t('validation.emailMax'),
        passwordRequired: t('validation.passwordRequired'),
        passwordMin: t('validation.passwordMin'),
      }),
    ),
    mode: 'onBlur',
    defaultValues: {
      workEmail: '',
      password: '',
      remember: true,
    },
  });

  const remember = useWatch({ control, name: 'remember' });

  useEffect(() => {
    if (isPending) return;
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (session !== null && session !== undefined) {
      router.replace(workspacePath(role));
    }
  }, [isPending, session, router]);

  function signInErrorMessage(status: number | undefined): string {
    switch (status) {
      case 401:
        return t('errors.invalidCredentials');
      case 403:
        return t('errors.notVerified');
      case 429:
        return t('errors.tooManyAttempts');
      default:
        return t('errors.generic');
    }
  }

  async function onSubmit(data: SignInFormValues) {
    setSubmitError(null);
    setIsPending(true);
    try {
      const result = await authClient.signIn.email({
        email: data.workEmail,
        password: data.password,
        rememberMe: data.remember,
      });

      if (result.error !== null) {
        setSubmitError(signInErrorMessage(result.error.status));
        return;
      }

      await authClient.getSession();

      const { data: tokenData } = await apiFetch<{
        data: { token: string };
      }>('/api/v1/auth/session-token', { method: 'POST' });

      const mirror = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: tokenData.token }),
      });
      if (!mirror.ok) {
        throw new Error('Failed to mirror session');
      }

      const role = (
        (await authClient.getSession())?.data?.user as
          { role?: string } | undefined
      )?.role;
      router.push(workspacePath(role));
    } catch {
      setSubmitError(t('errors.generic'));
    } finally {
      setIsPending(false);
    }
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
          {t('eyebrow')}
        </p>
      </motion.div>
      <motion.div variants={fadeUpItem}>
        <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {t('title')}
        </h2>
      </motion.div>
      <motion.div variants={fadeUpItem}>
        <p className="text-[13px] leading-[1.5] text-muted-foreground">
          {t('description')}
        </p>
      </motion.div>

      <motion.div variants={fadeUpItem}>
        <form
          id="sign-in-form"
          className="mt-5 flex flex-col gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <FieldGroup className="gap-3.5">
            <Field data-invalid={Boolean(errors.workEmail)}>
              <FieldLabel
                htmlFor="workEmail"
                className="text-xs font-medium text-foreground"
              >
                {t('fields.email.label')}
              </FieldLabel>
              <Input
                id="workEmail"
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder={t('fields.email.placeholder')}
                aria-invalid={Boolean(errors.workEmail)}
                aria-describedby={
                  errors.workEmail ? 'workEmail-error' : undefined
                }
                {...register('workEmail')}
              />
              <FieldError id="workEmail-error" errors={[errors.workEmail]} />
            </Field>

            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                {t('fields.password.label')}
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder={t('fields.password.placeholder')}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  {...register('password')}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-sm"
                    aria-label={
                      showPassword
                        ? t('fields.password.hide')
                        : t('fields.password.show')
                    }
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <EyeOffIcon aria-hidden="true" />
                    ) : (
                      <EyeIcon aria-hidden="true" />
                    )}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <FieldError id="password-error" errors={[errors.password]} />
            </Field>
          </FieldGroup>

          <div className="flex items-center justify-between pt-0.5">
            <Field orientation="horizontal" className="w-auto gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(checked) =>
                  setValue('remember', checked === true)
                }
              />
              <FieldLabel
                htmlFor="remember"
                className="text-xs font-normal text-foreground"
              >
                {t('remember')}
              </FieldLabel>
            </Field>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-foreground transition-colors hover:text-primary"
            >
              {t('forgotPassword')}
            </Link>
          </div>

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
                {t('submit')}
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}
