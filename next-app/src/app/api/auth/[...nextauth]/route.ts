import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type UserProps = {
  id: number;
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
          email: credentials!.email,
          password: credentials!.password,
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

        // TODO: needs to be fixed on the server side so that the names are consistent and don’t make a fuss
        const currentUser = {
          id: localUser.user.id,
          name: localUser.user.username,
          email: localUser.user.email,
          role: localUser.user.role
        }

        return {
          ...currentUser,
          apiToken: localUser.token
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session ({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (
          c !== "iat" &&
          c !== "exp" &&
          c !== "jti" &&
          c !== "apiToken"
        ) {
          return { ...p, [c]: token[c] }
        } else {
          return p
        }
      }, {})
      return { ...session, user: sanitizedToken, apiToken: token.apiToken }
    },
    async jwt ({ token, user, account, profile }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user as JWT
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
  },
  redirects: {
    async signIn(_context, redirectUrl) {
      if (redirectUrl === "/login" || redirectUrl === "/") {
        return Promise.resolve("/protected");
      }
      return Promise.resolve(null);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
