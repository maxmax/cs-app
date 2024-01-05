## Development notes-app

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Set up Prisma

**There are two packages that we need to get started:**

+ prisma for interacting with our database and schema during development.
+ @prisma/client for making queries to our database during runtime.

```sh
npm install --save-dev prisma
npm install @prisma/client
```

**Now we can initialize Prisma with SQLite:**

```sh
npx prisma init --datasource-provider sqlite
```

**With that in place, run this:**

```sh
npx prisma db push
```

```sh
npm run seed
```

*If you're having trouble, run npx prisma studio to see the database in the browser. It's possible you don't have any data because you forgot to run npx prisma db seed*

```sh
run npx prisma
```

### Auth

**After `npm run seed` you can login as username - kody & password - twixrox, but here you can create your own kitten or tiger — you're already a master of registration and authorization at this stage! 😺🐯**

### Unexpected errors

I'm sorry, but there's no way to avoid errors at some point. Servers fall over, co-workers use // @ts-ignore, and so on. So let's just embrace the possibility of unexpected errors and deal with them. Or just grab a pillow and close your eyes – that's an option too. 🗿

Fortunately, error handling in Remix is mind-blowing. Perhaps you've already dabbled with React's Error Boundary feature. In Remix, your route modules can export an `ErrorBoundary` component, and it will be utilized. But guess what? It's even cooler because it also works on the server! And not just that, it handles errors in loaders and actions too!

*What I love about this is that in the case of the children routes, the only unusable part of the app is the part that actually broke. The rest of the app is completely interactive. There's another point for the user's experience!*

### Expected errors

At times, users pull off stunts that no longer impress us. If they aren't performing miracles in the validation world, they're probably just checking their status – authenticated (status 401), authorized (status 403), or perhaps simply looking for something that isn't there (status 404).

One might assume that unexpected errors are like home heating breakdowns, a 500-level error (server error), while expected errors are more like when the cat decides to redecorate the same spot again, a 404 (client error).

To identify responses to unsuccessful client actions, Remix provides us with the handy `isRouteErrorResponse` spinner function. So, if the server detects a problem, it throws a Response. Then Remix recognizes this thrown response and replays our `ErrorBoundary` Since you can throw anything, this `isRouteErrorResponse` is like a real mischief detector, determining whether it's a genuine Response or just the cat leaving you a surprise. 🦍
