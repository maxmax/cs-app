import { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from "next-auth/jwt";

type UserProps = {
  id: string; // змінено на string
  username: string;
  email: string;
  role: string;
};

type LocalUser = {
  token: string;
  user: UserProps;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const credentialDetails = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentialDetails),
            cache: "no-store",
          }
        );
        const localUser = (await resp.json()) as LocalUser;

        if (!resp.ok) {
          return null;
        }

        const currentUser: UserProps = {
          id: String(localUser.user.id), // змінено на string
          username: localUser.user.username,
          email: localUser.user.email,
          role: localUser.user.role
        };

        return {
          ...currentUser,
          apiToken: localUser.token
        } as UserProps;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "apiToken"
        ) {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
    async jwt({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        return user as unknown as JWT;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    //authPages: {
    //  async signIn(_context, redirectUrl) {
    //    if (redirectUrl === "/login" || redirectUrl === "/") {
    //      return Promise.resolve("/protected");
    //    }
    //    return Promise.resolve(null);
    //  },
    //},
  },
};
