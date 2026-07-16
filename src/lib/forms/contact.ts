import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(80, 'Keep your name under 80 characters.'),
  workEmail: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(254, 'Keep your email under 254 characters.'),
  company: z
    .string()
    .trim()
    .max(120, 'Keep your company name under 120 characters.'),
  topic: z.string().min(1, 'Select a topic.'),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more so we can direct your message.')
    .max(1500, 'Keep your message under 1,500 characters.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
