

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from './movieAPI';

interface MovieDetailsState {
  details: Movie | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieDetailsState = {
  details: null,
  status: 'idle',
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    fetchMovieDetailsStart: (state, action: PayloadAction<number>) => {
      state.status = 'loading';
    },
    fetchMovieDetailsSuccess: (state, action: PayloadAction<Movie>) => {
      state.status = 'succeeded';
      state.details = action.payload;
    },
    fetchMovieDetailsFailure: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchMovieDetailsStart, fetchMovieDetailsSuccess, fetchMovieDetailsFailure } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
