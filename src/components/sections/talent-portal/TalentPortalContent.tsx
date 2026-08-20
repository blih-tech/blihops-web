'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2Icon, LoaderCircleIcon, PencilIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SignOutButton } from '@/components/sections/workspace/SignOutButton';
import {
  getTalentPortalProfile,
  updateTalentPortalProfile,
  uploadResumeFile,
  type TalentPortalProfile,
} from '@/lib/api/talent';
import { ApiError } from '@/lib/api';

const editSchema = z
  .object({
    professionalHeadline: z.string().trim().min(2).max(120).optional(),
    shortBio: z.string().trim().min(10).max(1000).optional(),
    primaryRole: z.string().trim().min(1).max(80).optional(),
    techStack: z.string().trim().optional(),
    secondarySkills: z.string().trim().optional(),
    yearsExperience: z.string().trim().optional(),
    portfolioUrl: z.union([z.literal(''), z.string().trim().url().max(300)]).optional(),
    githubUrl: z.union([z.literal(''), z.string().trim().url().max(300)]).optional(),
    linkedinUrl: z.union([z.literal(''), z.string().trim().url().max(300)]).optional(),
  })
  .refine((v) => Object.keys(v).some((k) => (v as Record<string, unknown>)[k] !== undefined && (v as Record<string, unknown>)[k] !== ''), 'Provide at least one field');

type EditValues = z.infer<typeof editSchema>;

function formatFileUrl(url: string): string {
  if (url.startsWith('http')) return url;
  return url;
}

export function TalentPortalContent({ portalId, signOutLabel }: { portalId: string; signOutLabel: string }) {
  const [profile, setProfile] = useState<TalentPortalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const form = useForm<EditValues>({
    resolver: zodResolver(editSchema),
  });

  async function fetchProfile() {
    setLoading(true);
    setError(null);
    try {
      const res = await getTalentPortalProfile();
      setProfile(res.data);
      form.reset({
        professionalHeadline: res.data.professionalHeadline,
        shortBio: res.data.shortBio,
        primaryRole: res.data.primaryRole,
        techStack: res.data.techStack.join(', '),
        secondarySkills: res.data.secondarySkills.join(', '),
        yearsExperience: String(res.data.yearsExperience),
        portfolioUrl: res.data.portfolioUrl ?? '',
        githubUrl: res.data.githubUrl ?? '',
        linkedinUrl: res.data.linkedinUrl ?? '',
      });
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to load profile';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: EditValues) {
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const payload: Record<string, unknown> = {};
      if (values.professionalHeadline) payload.professionalHeadline = values.professionalHeadline;
      if (values.shortBio) payload.shortBio = values.shortBio;
      if (values.primaryRole) payload.primaryRole = values.primaryRole;
      if (values.techStack && values.techStack.trim().length > 0) {
        payload.techStack = values.techStack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (values.secondarySkills !== undefined) {
        const arr = values.secondarySkills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        payload.secondarySkills = arr;
      }
      if (values.yearsExperience && values.yearsExperience.trim() !== '') {
        const n = Number(values.yearsExperience);
        if (!Number.isNaN(n)) payload.yearsExperience = Math.round(n);
      }
      if (values.portfolioUrl !== undefined) payload.portfolioUrl = values.portfolioUrl;
      if (values.githubUrl !== undefined) payload.githubUrl = values.githubUrl;
      if (values.linkedinUrl !== undefined) payload.linkedinUrl = values.linkedinUrl;

      if (photoFile) {
        const url = await uploadResumeFile(photoFile);
        payload.profilePhotoKey = url;
      }
      if (resumeFile) {
        const url = await uploadResumeFile(resumeFile);
        payload.resumeFileKey = url;
      }

      if (Object.keys(payload).length === 0) {
        setSaveError('No changes to save.');
        return;
      }

      const res = await updateTalentPortalProfile(payload);
      setProfile(res.data);
      setIsEditing(false);
      setPhotoFile(null);
      setResumeFile(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Failed to save';
      setSaveError(msg);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-background px-4">
        <LoaderCircleIcon className="size-6 animate-spin text-muted-foreground" aria-hidden="true" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <p className="max-w-md rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Portal {portalId}</p>
        <SignOutButton label={signOutLabel} />
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4 border-b border-border/80 pb-6">
          <div className="flex gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-lg font-semibold">
              {profile.profilePhotoKey ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formatFileUrl(profile.profilePhotoKey)} alt={profile.fullName} className="size-full object-cover" />
              ) : (
                profile.fullName.slice(0, 2).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="font-heading text-2xl font-semibold tracking-tight">{profile.fullName}</h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{profile.professionalHeadline}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase ${profile.visibility === 'VISIBLE' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600' : 'border-zinc-500/30 bg-zinc-500/10 text-zinc-600'}`}>
                  {profile.visibility}
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-wider uppercase ${profile.isVerified ? 'border-primary/20 bg-primary/10 text-primary' : 'border-border bg-muted text-muted-foreground'}`}>
                  {profile.isVerified ? 'Verified' : 'Unverified'}
                </span>
                <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] text-muted-foreground">{profile.accountStatus}</span>
              </div>
            </div>
          </div>
          <SignOutButton label={signOutLabel} />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-md border border-border p-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Contact</p>
            <p className="mt-2 text-sm">{profile.workEmail}</p>
            <p className="text-sm text-muted-foreground">{profile.phone}</p>
            <p className="text-sm text-muted-foreground">{profile.city}, {profile.country}</p>
          </div>
          <div className="rounded-md border border-border p-4">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Role & rate</p>
            <p className="mt-2 text-sm font-medium">{profile.primaryRole} · {profile.seniority}</p>
            <p className="text-sm text-muted-foreground">English: {profile.englishLevel} · {profile.yearsExperience} years</p>
            <p className="text-sm font-mono">€{profile.clientMonthlyRateEur} / mo</p>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-border p-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Bio</p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground">{profile.shortBio}</p>
        </div>

        <div className="mt-6 rounded-md border border-border p-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Skills</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.techStack.map((s) => (
              <span key={s} className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary">{s}</span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {profile.secondarySkills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs text-muted-foreground">{s}</span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs">
            {profile.portfolioUrl && <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">Portfolio</a>}
            {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">GitHub</a>}
            {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">LinkedIn</a>}
            <a href={profile.resumeFileKey} target="_blank" rel="noreferrer" className="text-muted-foreground underline-offset-4 hover:underline">Resume</a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">Edit profile</h2>
            <Button variant="outline" size="sm" onClick={() => setIsEditing((v) => !v)}>
              {isEditing ? <><XIcon data-icon="inline-start" /> Cancel</> : <><PencilIcon data-icon="inline-start" /> Edit</>}
            </Button>
          </div>

          {saveSuccess && (
            <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
              <CheckCircle2Icon className="size-4" /> Profile updated
            </div>
          )}
          {saveError && (
            <div role="alert" className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{saveError}</div>
          )}

          {isEditing ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="headline">Professional headline</Label>
                <Input id="headline" {...form.register('professionalHeadline')} placeholder={profile.professionalHeadline} />
                {form.formState.errors.professionalHeadline && <p className="text-xs text-destructive">{form.formState.errors.professionalHeadline.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea id="bio" rows={4} {...form.register('shortBio')} placeholder={profile.shortBio} />
                {form.formState.errors.shortBio && <p className="text-xs text-destructive">{form.formState.errors.shortBio.message}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="role">Primary role</Label>
                  <Input id="role" {...form.register('primaryRole')} placeholder={profile.primaryRole} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="years">Years experience</Label>
                  <Input id="years" type="number" min={0} max={50} {...form.register('yearsExperience')} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="techStack">Tech stack (comma separated)</Label>
                <Input id="techStack" {...form.register('techStack')} placeholder={profile.techStack.join(', ')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="secondary">Secondary skills (comma separated)</Label>
                <Input id="secondary" {...form.register('secondarySkills')} placeholder={profile.secondarySkills.join(', ')} />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input id="portfolio" {...form.register('portfolioUrl')} placeholder={profile.portfolioUrl ?? 'https://...'} />
                  {form.formState.errors.portfolioUrl && <p className="text-xs text-destructive">{String(form.formState.errors.portfolioUrl.message)}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input id="github" {...form.register('githubUrl')} placeholder={profile.githubUrl ?? 'https://...'} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" {...form.register('linkedinUrl')} placeholder={profile.linkedinUrl ?? 'https://...'} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="photo">Profile photo</Label>
                  <Input id="photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
                  {photoFile && <p className="text-xs text-muted-foreground">{photoFile.name}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resume">Resume (PDF/DOC)</Label>
                  <Input id="resume" type="file" accept=".pdf,.doc,.docx,application/pdf" onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)} />
                  {resumeFile && <p className="text-xs text-muted-foreground">{resumeFile.name}</p>}
                </div>
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting} className="mt-2">
                {form.formState.isSubmitting ? <><LoaderCircleIcon className="animate-spin" data-icon="inline-start" /> Saving...</> : 'Save changes'}
              </Button>
            </form>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">Toggle edit to update headline, bio, role, skills, links and files. Visibility and rate are managed by admins.</p>
          )}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-wider text-muted-foreground uppercase">Portal {portalId}</p>
      </div>
    </main>
  );
}
