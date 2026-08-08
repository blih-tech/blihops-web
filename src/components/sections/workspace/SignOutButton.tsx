'use client';

import { useState } from 'react';
import { LogOutIcon } from 'lucide-react';

import { Dots } from '@/components/shared/Dots';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';

type SignOutButtonProps = {
  label: string;
};

export function SignOutButton({ label }: SignOutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    try {
      await authClient.signOut();
      await fetch('/api/auth/session', { method: 'DELETE' });
    } catch (err) {
      console.error('Sign out failed:', err);
    } finally {
      setIsPending(false);
      router.replace('/auth/sign-in');
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending ? (
        <Dots dots={3} />
      ) : (
        <>
          <LogOutIcon data-icon="inline-start" aria-hidden="true" />
          {label}
        </>
      )}
    </Button>
  );
}
