import { call, put, takeLatest, all } from 'redux-saga/effects';
import { searchTeluguMovies, fetchMovieDetails, Movie } from '../features/movies/movieAPI';
import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from '../features/movies/movieSlice';
import {
  fetchMovieDetailsStart,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsFailure,
} from '../features/movies/movieDetailsSlice';

// Worker saga: fetch movies
function* fetchMoviesSaga(action: ReturnType<typeof fetchMoviesStart>) {
  try {
    const movies: Movie[] = yield call(searchTeluguMovies, action.payload);
    yield put(fetchMoviesSuccess(movies));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
  }
}

// Worker saga: fetch movie details
function* fetchMovieDetailsSaga(action: ReturnType<typeof fetchMovieDetailsStart>) {
  try {
    const movie: Movie = yield call(fetchMovieDetails, action.payload);
    yield put(fetchMovieDetailsSuccess(movie));
  } catch (error: any) {
    yield put(fetchMovieDetailsFailure(error.message));
  }
}

// Watchers
function* watchFetchMovies() {
  yield takeLatest(fetchMoviesStart.type, fetchMoviesSaga);
}

function* watchFetchMovieDetails() {
  yield takeLatest(fetchMovieDetailsStart.type, fetchMovieDetailsSaga);
}

export default function* rootSaga() {
  yield all([watchFetchMovies(), watchFetchMovieDetails()]);
}
