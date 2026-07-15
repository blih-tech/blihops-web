'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string) {
  const [activeId, setActiveId] = useState(() =>
    sectionIds.split(',').find(Boolean),
  );

  useEffect(() => {
    const ids = sectionIds.split(',').filter(Boolean);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.2),
          );

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return [activeId, setActiveId] as const;
}
