import { NetworkError } from '@/types/errors';
import { MovieTag, Movie, MoviesResponse } from '@/types/movie';

//'YOUTUBE_DATA_CREDENTIAL = AIzaSyArBxINp3fAz-oRMShVv_ONPucUBfSp5ic';
//"https://youtube.googleapis.com/youtube/v3"

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTkyMzg3NDJhMTViYjQxN2MzYjJjYjEyNzgzNzU1OCIsIm5iZiI6MTcyMDg0Nzg4Mi40NzcxMjIsInN1YiI6IjVmMzI1MDMwY2RmMmU2MDAzNzI0NTk0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oHzG7n9JA54uCceITDhvRbSj5_P1nCoNicuix_qiEhM';
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

export async function fetchMovies(path: MovieTag): Promise<Movie[]> {
  try {
    const response = await fetch(`${BASE_URL}/movie/${path}`, {
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
    const response = await fetch(`${BASE_URL}/discover/movie`, {
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
      `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
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
    const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
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
