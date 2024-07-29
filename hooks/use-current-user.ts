import { useSession, getSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
