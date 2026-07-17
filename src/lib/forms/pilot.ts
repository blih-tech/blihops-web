import { z } from 'zod';

type PilotFormValidationMessages = {
  fullNameRequired: string;
  fullNameMax: string;
  emailInvalid: string;
  emailMax: string;
  companyRequired: string;
  companyMax: string;
  serviceRequired: string;
  challengeRequired: string;
  challengeMax: string;
  volumeRequired: string;
  timelineRequired: string;
  contextMax: string;
};

export function createPilotFormSchema(messages: PilotFormValidationMessages) {
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
    company: z
      .string()
      .trim()
      .min(2, messages.companyRequired)
      .max(120, messages.companyMax),
    service: z.string().min(1, messages.serviceRequired),
    challenge: z
      .string()
      .trim()
      .min(20, messages.challengeRequired)
      .max(1200, messages.challengeMax),
    volume: z.string().min(1, messages.volumeRequired),
    timeline: z.string().min(1, messages.timelineRequired),
    context: z.string().trim().max(1000, messages.contextMax),
  });
}

export type PilotFormValues = z.infer<ReturnType<typeof createPilotFormSchema>>;
