'use client';

import { useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';

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
import { createSignInSchema, type SignInFormValues } from '@/lib/forms/sign-in';
import { Link } from '@/i18n/navigation';

export function SignInForm() {
  const t = useTranslations('SignInPage.form');
  const reduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] font-semibold tracking-[0.11em] text-primary uppercase">
          {t('eyebrow')}
        </p>
        <h2 className="font-heading text-xl leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {t('title')}
        </h2>
        <p className="text-[13px] leading-[1.5] text-muted-foreground">
          {t('description')}
        </p>
      </div>

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

        <Button type="submit" size="lg" className="h-9 w-full">
          {t('submit')}
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Button>
      </form>
    </motion.div>
  );
}
