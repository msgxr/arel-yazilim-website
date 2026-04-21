'use client';

import { type ReactNode } from 'react';

interface SessionProviderProps {
  children: ReactNode;
}

/**
 * Stub SessionProvider — this site uses static export (GitHub Pages) and
 * therefore has no server-side auth runtime. The wrapper is kept so that
 * layout.tsx compiles without changes, but it simply renders children as-is.
 */
export function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>;
}