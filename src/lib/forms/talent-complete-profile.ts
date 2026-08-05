import { z } from 'zod';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const photoTypes = ['image/jpeg', 'image/png', 'image/webp'];

type TalentCompleteProfileValidationMessages = {
  professionalHeadlineRequired: string;
  professionalHeadlineMax: string;
  bioRequired: string;
  bioMax: string;
  availabilityRequired: string;
  startDateRequired: string;
  engagementRequired: string;
  photoRequired: string;
  photoInvalidType: string;
  photoTooLarge: string;
};

const imageFileValidator = ({
  types,
  maxBytes,
  required,
  invalidType,
  tooLarge,
}: {
  types: string[];
  maxBytes: number;
  required: string;
  invalidType: string;
  tooLarge: string;
}) =>
  z
    .instanceof(File, { message: required })
    .refine((file) => file.size > 0, tooLarge)
    .refine((file) => types.includes(file.type), invalidType)
    .refine((file) => file.size <= maxBytes, tooLarge);

export function createTalentCompleteProfileSchema(
  messages: TalentCompleteProfileValidationMessages,
) {
  return z.object({
    professionalHeadline: z
      .string()
      .trim()
      .min(2, messages.professionalHeadlineRequired)
      .max(120, messages.professionalHeadlineMax),
    bio: z
      .string()
      .trim()
      .min(10, messages.bioRequired)
      .max(1000, messages.bioMax),
    availability: z.string().min(1, messages.availabilityRequired),
    startDate: z.string().min(1, messages.startDateRequired),
    engagement: z.string().min(1, messages.engagementRequired),
    photo: imageFileValidator({
      types: photoTypes,
      maxBytes: MAX_PHOTO_BYTES,
      required: messages.photoRequired,
      invalidType: messages.photoInvalidType,
      tooLarge: messages.photoTooLarge,
    }),
  });
}

export type TalentCompleteProfileValues = z.infer<
  ReturnType<typeof createTalentCompleteProfileSchema>
>;
