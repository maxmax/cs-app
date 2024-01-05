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
