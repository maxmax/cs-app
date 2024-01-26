import { Session } from "next-auth";

export interface CustomUserProps {
  id?: string | null | undefined;
  username?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
}

export interface CustomSession extends Session {
  user: CustomUserProps;
  apiToken: string;
}

export interface CustomSession extends Session {
  user: CustomUserProps;
  apiToken: string;
}
