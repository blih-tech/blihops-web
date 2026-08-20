import { ApiError, apiFetch } from '../api';

export type TalentApplicationStatus =
  | 'NEW'
  | 'UNDER_REVIEW'
  | 'SCREENING'
  | 'TECHNICAL_ASSESSMENT'
  | 'ENGLISH_ASSESSMENT'
  | 'REMOTE_READINESS_ASSESSMENT'
  | 'APPROVED'
  | 'COMPLETION_REQUESTED'
  | 'COMPLETION_SUBMITTED'
  | 'PROFILE_CREATED'
  | 'REJECTED'
  | 'ARCHIVED';

export type CreateTalentApplicationPayload = {
  fullName: string;
  workEmail: string;
  phone: string;
  country: string;
  city: string;
  primaryRole: string;
  techStack: string[];
  secondarySkills: string[];
  yearsExperience: number;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeFileKey: string;
};

export type TalentApplicationCreatedResponse = {
  data: { id: string; status: TalentApplicationStatus };
};

export function submitTalentApplication(
  payload: CreateTalentApplicationPayload,
) {
  return apiFetch<TalentApplicationCreatedResponse>(
    '/api/v1/talent-applications',
    {
      method: 'POST',
      body: payload,
    },
  );
}

export async function uploadResumeFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/uploads', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error?.message ?? `Upload failed (${res.status})`;
    throw new ApiError(
      res.status,
      body?.error?.code ?? 'UPLOAD_FAILED',
      message,
    );
  }

  const body = (await res.json()) as { url: string };
  if (!body.url)
    throw new ApiError(500, 'UPLOAD_NO_URL', 'Upload did not return a URL');
  return body.url;
}

export type SubmitErrorMessages = {
  generic: string;
  network: string;
  validation: string;
  rateLimited: string;
  server: string;
};

export function toTalentSubmitErrorMessage(
  err: unknown,
  messages: SubmitErrorMessages,
): string {
  if (err instanceof ApiError) {
    if (err.status === 0) return messages.network;
    if (err.status === 422) return messages.validation;
    if (err.status === 429) return messages.rateLimited;
    if (err.status >= 500) return messages.server;
    return messages.generic;
  }
  return messages.generic;
}

export type CompletionRequestInfo = {
  data: {
    applicationId: string;
    fullName: string;
    workEmail: string;
    expiresAt: string;
  };
};

export type SubmitCompletionPayload = {
  photoFileKey: string;
  shortBio: string;
  professionalHeadline: string;
};

export type SubmitCompletionResponse = {
  data: { applicationId: string; status: string };
};

export function getCompletionRequest(token: string) {
  return apiFetch<CompletionRequestInfo>(
    `/api/v1/profile-completion-requests/${encodeURIComponent(token)}`,
  );
}

export function submitTalentCompletion(token: string, payload: SubmitCompletionPayload) {
  return apiFetch<SubmitCompletionResponse>(
    `/api/v1/profile-completion-requests/${encodeURIComponent(token)}/submit`,
    { method: 'POST', body: payload },
  );
}

export const yearsExperienceToNumber: Record<string, number> = {
  'Under 1 year': 0,
  '1-2 years': 2,
  '3-5 years': 4,
  '5-8 years': 6,
  '8+ years': 9,
};
