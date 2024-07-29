'use client';

import { useRouter } from 'next/navigation';

interface SettingsButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const SettingsButton = ({
  children,
  mode = 'redirect',
  asChild,
}: SettingsButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/settings');
  };

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
