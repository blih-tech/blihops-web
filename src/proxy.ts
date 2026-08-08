import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'blihops.session_token';
const API_URL = process.env.API_URL ?? 'http://localhost:4000';

type WorkspaceRole = 'talent' | 'client';

const getWorkspaceRole = (pathname: string): WorkspaceRole | null => {
  if (pathname.includes('/talent-portal/')) return 'talent';
  if (pathname.includes('/client-workspace/')) return 'client';
  return null;
};

const getLocale = (pathname: string): string | null => {
  const match = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  return match?.[1] ?? null;
};

const redirectToSignIn = (request: NextRequest, locale: string | null) => {
  const path = locale === null ? '/auth/sign-in' : `/${locale}/auth/sign-in`;
  const url = new URL(path, request.url);
  return NextResponse.redirect(url);
};

export default async function proxy(request: NextRequest) {
  const requiredRole = getWorkspaceRole(request.nextUrl.pathname);
  const locale = getLocale(request.nextUrl.pathname);

  if (requiredRole === null) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token === undefined) {
    return redirectToSignIn(request, locale);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/get-session`, {
      headers: { authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      return redirectToSignIn(request, locale);
    }

    const session = (await response.json()) as {
      user?: { role?: string };
    } | null;

    if (session?.user === undefined || session.user.role !== requiredRole) {
      return redirectToSignIn(request, locale);
    }

    return NextResponse.next();
  } catch {
    return redirectToSignIn(request, locale);
  } finally {
    clearTimeout(timeout);
  }
}

export const config = {
  matcher: [
    '/:locale/talent-portal/:path*',
    '/:locale/client-workspace/:path*',
  ],
};
