import { searchMovies } from '@/services/api';
import { NetworkError } from '@/types/errors';
import { Movie } from '@/types/movie';
import { useCallback, useEffect, useState } from 'react';

export default function useFetchSearchMovies(query: string) {
  const [data, setData] = useState<Movie[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await searchMovies(query);
      setData(data);
    } catch (error) {
      if (error instanceof NetworkError) {
        setError(
          `Failed to load movies: ${error.message} (Status: ${error.status})`
        );
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
