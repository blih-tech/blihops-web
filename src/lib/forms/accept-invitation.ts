import { z } from 'zod';

type AcceptInvitationValidationMessages = {
  newPasswordRequired: string;
  passwordMin: string;
  passwordRequirements: string;
  confirmRequired: string;
  confirmMismatch: string;
};

export function createAcceptInvitationSchema(
  messages: AcceptInvitationValidationMessages,
) {
  return z
    .object({
      newPassword: z
        .string()
        .min(1, messages.newPasswordRequired)
        .min(8, messages.passwordMin)
        .refine(
          (value) =>
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[^A-Za-z0-9]/.test(value),
          messages.passwordRequirements,
        ),
      confirmPassword: z.string().min(1, messages.confirmRequired),
    })
    .refine((data) => data.confirmPassword === data.newPassword, {
      message: messages.confirmMismatch,
      path: ['confirmPassword'],
    });
}

export type AcceptInvitationFormValues = z.infer<
  ReturnType<typeof createAcceptInvitationSchema>
>;
