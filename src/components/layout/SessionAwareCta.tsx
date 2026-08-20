'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';

type SessionAwareCtaProps = {
  size?: 'sm' | 'default';
  className?: string;
  onClick?: () => void;
};

export function SessionAwareCta({
  size,
  className,
  onClick,
}: SessionAwareCtaProps) {
  const tActions = useTranslations('Shared.actions');
  const { data: session } = authClient.useSession();
  const user = session?.user as { role?: string; id?: string } | undefined;
  const role = user?.role;

  let href = '/pilot';
  let label = tActions('getPilot');

  if (role === 'talent') {
    href = '/talent-portal';
    label = tActions('goToPortal');
  } else if (role === 'client' && user?.id !== undefined) {
    href = `/client-workspace/${user.id}`;
    label = tActions('goToWorkspace');
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(buttonVariants({ size }), 'group/cta', className)}
    >
      {label}
      <ArrowRight
        className="size-3.5 transition-transform group-hover/cta:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
