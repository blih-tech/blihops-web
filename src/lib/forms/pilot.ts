import { z } from 'zod';

export const pilotFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter your full name.')
    .max(80, 'Keep your name under 80 characters.'),
  workEmail: z
    .string()
    .trim()
    .email('Enter a valid work email address.')
    .max(254, 'Keep your email under 254 characters.'),
  company: z
    .string()
    .trim()
    .min(2, 'Enter your company name.')
    .max(120, 'Keep your company name under 120 characters.'),
  service: z.string().min(1, 'Select the service you need.'),
  challenge: z
    .string()
    .trim()
    .min(20, 'Tell us a little more about the operational challenge.')
    .max(1200, 'Keep your challenge under 1,200 characters.'),
  volume: z.string().min(1, 'Select an approximate workload.'),
  timeline: z.string().min(1, 'Select your preferred start time.'),
  context: z
    .string()
    .trim()
    .max(1000, 'Keep the additional context under 1,000 characters.'),
});

export type PilotFormValues = z.infer<typeof pilotFormSchema>;
