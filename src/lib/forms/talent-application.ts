import { z } from 'zod';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MAX_RESUME_BYTES = 10 * 1024 * 1024;

const photoTypes = ['image/jpeg', 'image/png', 'image/webp'];
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
  photoRequired: string;
  photoInvalidType: string;
  photoTooLarge: string;
  headlineRequired: string;
  headlineMax: string;
  bioRequired: string;
  bioMax: string;
  primaryRoleRequired: string;
  techStackRequired: string;
  yearsExperienceRequired: string;
  urlInvalid: string;
  urlMax: string;
  resumeRequired: string;
  resumeInvalidType: string;
  resumeTooLarge: string;
  availabilityRequired: string;
  startDateRequired: string;
  engagementRequired: string;
  screeningRequired: string;
  screeningMax: string;
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
    photo: fileValidator({
      types: photoTypes,
      maxBytes: MAX_PHOTO_BYTES,
      invalidType: messages.photoInvalidType,
      tooLarge: messages.photoTooLarge,
    }),
    headline: z
      .string()
      .trim()
      .min(5, messages.headlineRequired)
      .max(120, messages.headlineMax),
    bio: z
      .string()
      .trim()
      .min(40, messages.bioRequired)
      .max(1200, messages.bioMax),
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
    availability: z.string().min(1, messages.availabilityRequired),
    earliestStartDate: z.string().min(1, messages.startDateRequired),
    engagement: z.string().min(1, messages.engagementRequired),
    screening: z
      .string()
      .trim()
      .min(20, messages.screeningRequired)
      .max(500, messages.screeningMax),
  });
}

export type TalentApplicationValues = z.infer<
  ReturnType<typeof createTalentApplicationSchema>
>;
