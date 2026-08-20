import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const ACCEPTED_RESUME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
];
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_RESUME_BYTES = 10 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: { code: 'UPLOAD_NO_FILE', message: 'No file provided' } },
      { status: 400 },
    );
  }

  const isResume = ACCEPTED_RESUME_TYPES.includes(file.type);
  const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
  const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);

  if (!isResume && !isImage && !isVideo) {
    return NextResponse.json(
      {
        error: {
          code: 'UPLOAD_INVALID_TYPE',
          message: 'Only PDF, DOC, DOCX, images or videos are allowed',
        },
      },
      { status: 400 },
    );
  }

  const maxBytes = isResume
    ? MAX_RESUME_BYTES
    : isVideo
      ? MAX_VIDEO_BYTES
      : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    const limit = isResume ? 10 : isVideo ? 50 : 5;
    return NextResponse.json(
      {
        error: {
          code: 'UPLOAD_TOO_LARGE',
          message: `File must be ${limit} MB or smaller`,
        },
      },
      { status: 400 },
    );
  }

  // If Blob not configured (local dev without token), fallback to fake key for API to accept.
  // The API stores resumeFileKey as string; blob url is ideal but filename is acceptable for dev.
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    const fakeUrl = `uploads/resumes/${Date.now()}-${file.name}`;
    return NextResponse.json({ url: fakeUrl });
  }

  const prefix = isResume
    ? 'talent-resumes'
    : isVideo
      ? 'uploads/videos'
      : 'uploads';
  const blob = await put(`${prefix}/${file.name}`, file, {
    access: 'public',
    contentType: file.type,
    addRandomSuffix: true,
  });

  return NextResponse.json({ url: blob.url });
}
