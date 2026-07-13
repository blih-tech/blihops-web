'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { PlayIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type HeroVideoProps = {
  poster: string;
  src: string;
  className?: string;
};

export function HeroVideo({ poster, src, className }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPlaying(true);
    } catch {
      // Autoplay / load can fail; keep poster UI
    }
  };

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-lg',
        className,
      )}
    >
      <video
        ref={videoRef}
        className={cn(
          'absolute inset-0 size-full object-cover',
          playing ? 'opacity-100' : 'opacity-0',
        )}
        src={src}
        poster={poster}
        playsInline
        controls={playing}
        preload="metadata"
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {!playing ? (
        <>
          <Image
            src={poster}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-foreground/10" />
          <button
            type="button"
            onClick={handlePlay}
            aria-label="Play video"
            className="absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-md transition-transform hover:scale-105 md:size-16"
          >
            <PlayIcon className="size-6 fill-current md:size-7" />
          </button>
        </>
      ) : null}
    </div>
  );
}
