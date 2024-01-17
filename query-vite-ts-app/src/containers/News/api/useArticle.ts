import { useQuery } from 'react-query';
import { NewsProps } from '../types';
const API_URL = import.meta.env.VITE_REST_SERVER_API_URL;

const getArticleById = (id: number): Promise<NewsProps> => {
  return fetch(`${API_URL}/post/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch article by id');
      }
      return response.json();
    })
    .then(data => data);
};

export const useArticle = (articleId: number) => {
  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  })
}
