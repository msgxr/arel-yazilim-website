'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;
    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = docH > 0 ? `${(window.scrollY / docH) * 100}%` : '0%';
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      id="progress-bar"
      className="fixed left-0 top-0 z-[9999] h-[3px] bg-gradient-to-r from-brand-DEFAULT to-brand-vibrant transition-[width_0.05s_linear]"
      style={{ width: '0%' }}
    />
  );
}
