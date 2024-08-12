import { useQuery } from '@tanstack/react-query';

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/auth/user').then((res) => res.json()),
  });
