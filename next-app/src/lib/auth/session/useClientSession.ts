import { useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { CustomUserProps, CustomSession } from "./types";

const useClientSession: () => CustomSession | null = () => {
  const { data: session } = useSession();

  const userSession = useMemo(() => {
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
  }, [session]);

  return userSession;
};

export { signOut, useClientSession };
