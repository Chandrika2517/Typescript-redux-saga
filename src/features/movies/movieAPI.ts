


import axios from 'axios';

const API_KEY = '9a75aaba275e1095f76bcd96f4174c56';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  genres?: { id: number; name: string }[];
  vote_average?: number;
  runtime?: number;
  poster?: string;
}

export const searchTeluguMovies = async (query: string): Promise<Movie[]> => {
  const res = await axios.get<{ results: Movie[] }>(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, language: 'te-IN', region: 'IN' },
  });
  return res.data.results;
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const res = await axios.get<Movie>(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY, language: 'te-IN' },
  });
  return res.data;
};
