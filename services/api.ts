// @ts-ignore
import { TMDB_API_KEY, YOUTUBE_DATA_CREDENTIAL } from '@env';
import { NetworkError } from '@/types/errors';
import { MovieTag, Movie, MoviesResponse } from '@/types/movie';
import { GetYoutubeSearchResponse } from '@/types/youtubedata';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const YOUTUBE_DATA_BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TMDB_API_KEY}`,
};

export async function fetchMovies(path: MovieTag): Promise<Movie[]> {
  try {
    const response = await fetch(`${TMDB_API_BASE_URL}/movie/${path}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new NetworkError(
        'Failed to fetch movies',
        response.status,
        await response.text()
      );
    }

    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(
        `Error fetching movies: ${error.message}, Status: ${error.status}`
      );
      throw error;
    }
    throw new Error('An unexpected error occurred.');
  }
}

export async function fetchDiscoverMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(`${TMDB_API_BASE_URL}/discover/movie`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new NetworkError(
        'Failed to fetch movies',
        response.status,
        await response.text()
      );
    }

    const data: MoviesResponse = await response.json();

    return data.results;
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(
        `Error fetching movies: ${error.message}, Status: ${error.status}`
      );
      throw error;
    }

    throw new Error('An unexpected error occurred.');
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.log(`Error fetching movies: ${error}`);
    throw error;
  }
}

export async function fetchMovieDetail(movieId: string): Promise<Movie> {
  try {
    const response = await fetch(`${TMDB_API_BASE_URL}/movie/${movieId}`, {
      headers: headers,
    });

    if (!response.ok) {
      throw new NetworkError(
        'Failed to fetch movie',
        response.status,
        await response.text()
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(
        `Error fetching movies: ${error.message}, Status: ${error.status}`
      );
      throw error;
    }
    throw new Error('An unexpected error occurred.');
  }
}

export async function fetchYutubeVideoData(
  query: string
): Promise<GetYoutubeSearchResponse> {
  try {
    const response = await fetch(
      `${YOUTUBE_DATA_BASE_URL}/search?key=${YOUTUBE_DATA_CREDENTIAL}&q=${query}`
    );

    if (!response.ok) {
      throw new NetworkError(
        'Failed to fetch youtube data',
        response.status,
        await response.text()
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(
        `Error fetching movies: ${error.message}, Status: ${error.status}`
      );
      throw error;
    }
    throw new Error('An unexpected error occurred.');
  }
}
