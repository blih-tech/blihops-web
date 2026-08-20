import { z } from 'zod';

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

const resumeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

type TalentApplicationValidationMessages = {
  fullNameRequired: string;
  fullNameMax: string;
  emailInvalid: string;
  emailMax: string;
  phoneRequired: string;
  phoneMax: string;
  countryRequired: string;
  cityRequired: string;
  primaryRoleRequired: string;
  techStackRequired: string;
  yearsExperienceRequired: string;
  urlInvalid: string;
  urlMax: string;
  resumeRequired: string;
  resumeInvalidType: string;
  resumeTooLarge: string;
};

const fileValidator = ({
  types,
  maxBytes,
  invalidType,
  tooLarge,
}: {
  types: string[];
  maxBytes: number;
  invalidType: string;
  tooLarge: string;
}) =>
  z
    .instanceof(File)
    .refine((file) => file?.size > 0, tooLarge)
    .refine((file) => file && types.includes(file.type), invalidType)
    .refine((file) => file && file.size <= maxBytes, tooLarge);

const optionalUrl = (messages: { urlInvalid: string; urlMax: string }) =>
  z.union([
    z.literal(''),
    z.string().trim().url(messages.urlInvalid).max(300, messages.urlMax),
  ]);

export function createTalentApplicationSchema(
  messages: TalentApplicationValidationMessages,
) {
  return z.object({
    fullName: z
      .string()
      .trim()
      .min(2, messages.fullNameRequired)
      .max(80, messages.fullNameMax),
    email: z
      .string()
      .trim()
      .email(messages.emailInvalid)
      .max(254, messages.emailMax),
    phone: z
      .string()
      .trim()
      .min(7, messages.phoneRequired)
      .max(40, messages.phoneMax),
    country: z
      .string()
      .trim()
      .min(2, messages.countryRequired)
      .max(80, messages.countryRequired),
    city: z
      .string()
      .trim()
      .min(2, messages.cityRequired)
      .max(80, messages.cityRequired),
    primaryRole: z.string().min(1, messages.primaryRoleRequired),
    techStack: z.array(z.string()).min(1, messages.techStackRequired),
    secondarySkills: z.array(z.string()),
    yearsExperience: z.string().min(1, messages.yearsExperienceRequired),
    portfolio: optionalUrl(messages),
    github: optionalUrl(messages),
    linkedin: optionalUrl(messages),
    resume: fileValidator({
      types: resumeTypes,
      maxBytes: MAX_RESUME_BYTES,
      invalidType: messages.resumeInvalidType,
      tooLarge: messages.resumeTooLarge,
    }),
  });
}

export type TalentApplicationValues = z.infer<
  ReturnType<typeof createTalentApplicationSchema>
>;
