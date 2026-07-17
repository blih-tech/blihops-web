import { z } from 'zod';

type ContactValidationMessages = {
  fullNameRequired: string;
  fullNameMax: string;
  emailInvalid: string;
  emailMax: string;
  companyMax: string;
  topicRequired: string;
  messageRequired: string;
  messageMax: string;
};

export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, messages.fullNameRequired)
      .max(80, messages.fullNameMax),
    workEmail: z
      .string()
      .trim()
      .email(messages.emailInvalid)
      .max(254, messages.emailMax),
    company: z.string().trim().max(120, messages.companyMax),
    topic: z.string().min(1, messages.topicRequired),
    message: z
      .string()
      .trim()
      .min(20, messages.messageRequired)
      .max(1500, messages.messageMax),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
