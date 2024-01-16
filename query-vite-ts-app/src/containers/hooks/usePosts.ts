import { useQuery } from 'react-query';

import { PostProps } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const usePosts = () => {
  return useQuery<Array<PostProps>, Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data: Array<PostProps> = await response.json();
      return data;
    },
  });
}
