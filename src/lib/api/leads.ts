import { ApiError, apiFetch } from '../api';

export type LeadType = 'CONTACT' | 'PILOT' | 'CALL';
export type LeadStatus = 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CLOSED';
export type LeadLocale = 'en' | 'de';

export type ContactLeadPayload = {
  fullName: string;
  workEmail: string;
  company?: string;
  topic: string;
  message: string;
  locale: LeadLocale;
  /** Honeypot — real users never see this field; non-empty means a bot. */
  website?: string;
};

export type PilotLeadPayload = {
  fullName: string;
  workEmail: string;
  company: string;
  service: string;
  challenge: string;
  volume: string;
  timeline: string;
  context?: string;
  locale: LeadLocale;
  website?: string;
};

export type LeadCreatedResponse = {
  data: { id: string; type: LeadType; status: LeadStatus };
};

export function submitContactLead(payload: ContactLeadPayload) {
  return apiFetch<LeadCreatedResponse>('/api/v1/leads/contact', {
    method: 'POST',
    body: payload,
  });
}

export function submitPilotLead(payload: PilotLeadPayload) {
  return apiFetch<LeadCreatedResponse>('/api/v1/leads/pilot', {
    method: 'POST',
    body: payload,
  });
}

export type SubmitErrorMessages = {
  generic: string;
  network: string;
  validation: string;
  rateLimited: string;
  server: string;
};

/** Maps an apiFetch failure to a user-facing, localized message. */
export function toSubmitErrorMessage(
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
