import { withAuth } from "next-auth/middleware"

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {

        if (req.nextUrl.pathname.startsWith('/profile') && token === null) {
          return false;
        }

        if (req.nextUrl.pathname.startsWith('/dashboard') && token === null) {
          return false;
        }

        if (req.nextUrl.pathname.startsWith('/dashboard') && token?.role === 'user') {
          return false;
        }

        return true;
      }
    }
  }
)
