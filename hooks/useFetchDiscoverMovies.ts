import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { fetchDiscoverMovies } from '@/services/api';
import { NetworkError } from '@/types/errors';

export default function useFetchDiscoverMovies() {
  const [data, setData] = useState<Movie[] | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchDiscoverMovies();
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}
