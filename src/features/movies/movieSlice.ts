


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './movieAPI';

interface MovieState {
  movies: Movie[];
  userMovies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  userMovies: [],
  status: 'idle',
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMoviesStart: (state, action: PayloadAction<string>) => {
      state.status = 'loading';
    },
    fetchMoviesSuccess: (state, action: PayloadAction<Movie[]>) => {
      state.status = 'succeeded';
      state.movies = action.payload;
    },
    fetchMoviesFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.userMovies.unshift(action.payload);
    },
  },
});

export const { fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, addMovie } = movieSlice.actions;
export default movieSlice.reducer;
