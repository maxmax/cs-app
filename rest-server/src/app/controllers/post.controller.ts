import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, authorEmail } = req.body;
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } },
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const updatePostViews = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { viewCount: { increment: 1 } },
    });
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: `Post with ID ${id} does not exist` });
  }
};

export const publishPost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: { published: true },
    });
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: `Post with ID ${id} does not exist` });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: `Post with ID ${id} does not exist` });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: `Post with ID ${id} does not exist` });
  }
};

export const getDraftsByUserId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const drafts = await prisma.user
      .findUnique({
        where: { id: Number(id) },
      })
      .posts({
        where: { published: false },
      });
    res.json(drafts);
  } catch (error) {
    res.status(404).json({ error: `User with ID ${id} does not exist` });
  }
};

export const getPostsFeed = async (req: Request, res: Response): Promise<void> => {
  const { searchString, skip, take, orderBy } = req.query;
  const or: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: searchString as string } },
          { content: { contains: searchString as string } },
        ],
      }
    : {};

  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        ...or,
      },
      include: { author: true },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: {
        updatedAt: orderBy as Prisma.SortOrder,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts feed' });
  }
};
