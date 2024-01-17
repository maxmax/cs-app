interface AuthorProps {
  id: number;
  email: string;
  name: string;
}

export type NewsProps = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  authorId: number;
  author: AuthorProps;
}
