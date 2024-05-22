// components/SessionLayout.tsx
"use client";

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

const SessionLayout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionLayout;
