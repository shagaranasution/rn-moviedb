import { useState, useEffect } from 'react';
import { Movie, MovieTag } from '@/types/movie';
import { fetchMovies } from '@/services/api';
import { NetworkError } from '@/types/errors';

export interface Category {
  title: MovieTag;
  items: Movie[];
}

interface HomeScreenData {
  nowPlayingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
}

const categories: Category[] = [
  {
    title: 'now_playing',
    items: [],
  },
  {
    title: 'popular',
    items: [],
  },
  {
    title: 'top_rated',
    items: [],
  },
  {
    title: 'upcoming',
    items: [],
  },
];

function useFetchHomeScreenMovies() {
  const [data, setData] = useState<Category[] | null>(categories);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const results = await Promise.all(
        categories.map((category) => fetchMovies(category.title))
      );
      const data: Category[] = results.map((movies, index) => ({
        title: categories[index].title,
        items: movies,
      }));
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

export default useFetchHomeScreenMovies;
