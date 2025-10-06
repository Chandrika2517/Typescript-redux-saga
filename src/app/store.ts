

import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import movieDetailsReducer from '../features/movies/movieDetailsSlice';
import rootSaga from '../saga/saga';
import * as sagaCore from '@redux-saga/core';
let createSagaMiddleware = sagaCore.default;
try {
    if (typeof createSagaMiddleware !== 'function') {
        const saga = require('redux-saga');
        createSagaMiddleware = saga.default || saga;
    }
} catch (e) {}
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    movieDetails: movieDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
