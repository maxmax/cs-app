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

**Install ts-node and tsconfig-paths as dev dependencies:**

```sh
npm install --save-dev ts-node tsconfig-paths
```

**And now we can run our seed.ts file with that (TODO: to dev):**

```sh
node --loader ts-node/esm -r tsconfig-paths/register prisma/seed.ts
```

But with

```sh
{
  "compilerOptions": {
    "module": "ESNext",
    ...
  },
  ...
}
```
.....
