'use client';

import { useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { authInputClassName } from '@/components/sections/auth/auth-form-styles';
import { createSignInSchema, type SignInFormValues } from '@/lib/forms/sign-in';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function SignInForm() {
  const t = useTranslations('SignInPage.form');
  const reduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
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

  function onSubmit(data: SignInFormValues) {
    console.info('Sign in submitted:', data);
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="flex flex-col gap-1.5">
        <p className="font-mono text-[10px] font-semibold tracking-[0.11em] text-primary uppercase">
          {t('eyebrow')}
        </p>
        <h2 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
          {t('title')}
        </h2>
        <p className="text-sm leading-[1.6] text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <form
        id="sign-in-form"
        className="mt-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-foreground"
            htmlFor="workEmail"
          >
            {t('fields.email.label')}
          </label>
          <input
            id="workEmail"
            type="text"
            inputMode="email"
            autoComplete="email"
            placeholder={t('fields.email.placeholder')}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={
              errors.workEmail ? 'workEmail-error' : 'workEmail-help'
            }
            className={authInputClassName}
            {...register('workEmail')}
          />
          {errors.workEmail ? (
            <p
              id="workEmail-error"
              role="alert"
              className="text-xs leading-[1.4] text-destructive"
            >
              {errors.workEmail.message}
            </p>
          ) : (
            <p
              id="workEmail-help"
              className="text-xs leading-[1.4] text-muted-foreground"
            >
              {t('fields.email.helper')}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-xs font-medium text-foreground"
            htmlFor="password"
          >
            {t('fields.password.label')}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder={t('fields.password.placeholder')}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'password-error' : 'password-help'
              }
              className={cn(authInputClassName, 'pr-10')}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={
                showPassword
                  ? t('fields.password.hide')
                  : t('fields.password.show')
              }
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p
              id="password-error"
              role="alert"
              className="text-xs leading-[1.4] text-destructive"
            >
              {errors.password.message}
            </p>
          ) : (
            <p
              id="password-help"
              className="text-xs leading-[1.4] text-muted-foreground"
            >
              {t('fields.password.helper')}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-xs font-normal text-foreground">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-primary"
              {...register('remember')}
            />
            {t('remember')}
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground transition-colors hover:text-primary"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        <Button type="submit" size="lg" className="h-10 w-full">
          {t('submit')}
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Button>
      </form>
    </motion.div>
  );
}
