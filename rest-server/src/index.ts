import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import { generateUsers } from './app/controllers/fake.controller'
import fakeRoutes from './app/routes/fake.routes';
import postRoutes from './app/routes/post.routes';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// CORS middleware
const corsOptions = {
  origin: process.env.CORS_OPTIONS || "http://localhost:5173"
};
app.use(cors(corsOptions))

app.post(`api/user/signup`, async (req, res) => {
  const { name, email, posts } = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return { title: post?.title, content: post?.content }
  })

  const result = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: postData,
      },
    },
  })
  res.json(result)
})

app.get('api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('api/user/:id/drafts', async (req, res) => {
  const { id } = req.params

  const drafts = await prisma.user
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: { published: false },
    })

  res.json(drafts)
})

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to rest-server demo application." });
});

// Include routes
fakeRoutes(app);

// Connect routes for posts
app.use('/api/post', postRoutes);

const server = app.listen(3000, () =>
  console.log(`🦍 Server ready at: http://localhost:3000 🗿`),
)
