// utils/auth.ts

import { getSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';

/**
 * Fetches the current user's role from the session.
 * @returns {Promise<UserRole | null>} The user's role or null if not logged in.
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const session = await getSession();
  console.log('Session: ', session);
  if (session && session.user.role) {
    // Assuming your session includes the user's role
    return session.user.role as UserRole;
  }
  return null;
}
