export type MovieTag = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_count: string;
  release_date: string;
  vote_average: string;
  backdrop_path: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
