import { useQuery } from 'react-query';
import { NewsProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

export const useNews = () => {
  return useQuery<Array<NewsProps>, Error>({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/post/feed`);

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data: Array<NewsProps> = await response.json();
      return data;
    },
  });
}
