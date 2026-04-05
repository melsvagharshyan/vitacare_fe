import type { ReactNode } from 'react';

type PageMainProps = {
  children: ReactNode;
  className?: string;
};

export default function PageMain({ children, className = '' }: PageMainProps) {
  return (
    <main className={`relative w-full overflow-x-hidden bg-primary-bg min-h-screen ${className}`.trim()}>
      {children}
    </main>
  );
}
