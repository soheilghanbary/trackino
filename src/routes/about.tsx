import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function About() {
  const { data, isPending } = useQuery({
    queryKey: ['hello'],
    queryFn: () => api.hello.$get().then((res) => res.json()),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <h1>About Page is Here</h1>
      {!isPending ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>loading data...</p>
      )}
    </div>
  );
}
