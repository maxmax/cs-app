import { getServerSession } from "next-auth/next";
import { authOptions } from '@/lib/auth';
import { CustomUserProps, CustomSession } from "./types";

export const getUserServerSession = async (): Promise<CustomSession | null> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("apiToken" in session)) {
    return null;
  }

  const user: CustomUserProps = session.user;
  const apiToken: string = session.apiToken as string;

  return {
    ...session,
    user,
    apiToken,
  };
};
