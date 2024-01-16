import { useQuery } from 'react-query';

const API_URL = import.meta.env.VITE_API_URL;

const getPostById = (id: number): Promise<PostProps> => {
  return fetch(`${API_URL}/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch post by id');
      }
      return response.json();
    })
    .then(data => data);
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}
