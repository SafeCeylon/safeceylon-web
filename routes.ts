import exp from 'constants';
import { UserRole } from '@prisma/client';

import { getCurrentUserRole } from './utils/auth';

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ['/', '/new-verification'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */
export const authRoutes = [
  '/login',
  '/register',
  '/error',
  '/reset',
  '/new-password',
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in.
 * @type {string}
 */

// let path = '';

// async function GetDefaultLoginRedirect() {
//   const userRole = await getCurrentUserRole();

//   if (
//     userRole === UserRole.DISASTER_ADMIN ||
//     userRole === UserRole.DISASTER_OFFICER
//   ) {
//     path = `/disaster/dashboard`;
//   } else if (
//     userRole === UserRole.METEOROLOGY_ADMIN ||
//     userRole === UserRole.METEOROLOGY_OFFICER
//   ) {
//     path = `/meteorology/dashboard`;
//   } else if (userRole === UserRole.ADMIN) {
//     path = `/admin/dashboard`;
//   }
// }

// GetDefaultLoginRedirect();

/**
 * The default redirect path after logging out.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings';
