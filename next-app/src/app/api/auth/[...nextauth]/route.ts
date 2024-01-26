import NextAuth, { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

// @ts-ignore
export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
