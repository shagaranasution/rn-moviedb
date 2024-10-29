import { fetchMovieDetail } from '@/services/api';
import { NetworkError } from '@/types/errors';
import { Movie } from '@/types/movie';
import { useState, useEffect } from 'react';

export default function useFetchMovieDetail(movieId: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovieDetail(movieId);
      setMovie(data);
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
  }, [movieId]);

  const refetch = () => {
    fetchData();
  };

  return { movie, loading, error, refetch };
}
