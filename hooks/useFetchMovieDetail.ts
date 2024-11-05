import { fetchMovieDetail, fetchYutubeVideoData } from '@/services/api';
import { NetworkError } from '@/types/errors';
import { Movie } from '@/types/movie';
import { useState, useEffect } from 'react';

export default function useFetchMovieDetail(movieId: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movieYoutubeTrailer, setMovieYoutubeTrailer] = useState<
    string | null
  >();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchMovieDetail(movieId);
      setMovie(data);
      fetchYoutubeData(data.title);
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

  const fetchYoutubeData = async (query: string) => {
    try {
      const data = await fetchYutubeVideoData(query);
      // console.log('video youtube data: ', data.items[0].id);
      const url = `https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1&mute=0`;
      setMovieYoutubeTrailer(url);
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);

  const refetch = () => {
    fetchData();
  };

  return { movie, loading, error, refetch, movieYoutubeTrailer };
}
