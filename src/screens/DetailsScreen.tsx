

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetailsStart } from '../features/movies/movieDetailsSlice';
import { RootState, AppDispatch } from '../app/store';
import { Movie } from '../features/movies/movieAPI';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function DetailsScreen({ route }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { details, status } = useSelector((state: RootState) => state.movieDetails);
  const { userMovies } = useSelector((state: RootState) => state.movies);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isUserMovie, setIsUserMovie] = useState(false);

  useEffect(() => {
    const localMovie = userMovies.find((m) => m.id === id);
    if (localMovie) {
      setMovie(localMovie);
      setIsUserMovie(true);
    } else {
      dispatch(fetchMovieDetailsStart(id));
      setIsUserMovie(false);
    }
  }, [id]);

  useEffect(() => {
    if (!isUserMovie && details?.id === id) {
      setMovie(details);
    }
  }, [details]);

  if (!movie) return <ActivityIndicator size="large" color="#ff6347" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : movie.poster || 'https://via.placeholder.com/300x450',
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      {movie.release_date && <Text style={styles.year}>{movie.release_date.split('-')[0]}</Text>}
      {movie.genres && <Text style={styles.year}>{movie.genres.map((g) => g.name).join(', ')}</Text>}
      {movie.overview && <Text style={styles.plot}>{movie.overview}</Text>}
      {!isUserMovie && movie.vote_average && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Rating:</Text>
          <Text style={styles.infoText}>{movie.vote_average}</Text>
        </View>
      )}
      {!isUserMovie && movie.runtime && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Runtime:</Text>
          <Text style={styles.infoText}>{movie.runtime} mins</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  poster: { width: '100%', height: 400, borderRadius: 8, marginBottom: 15 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  year: { fontSize: 16, color: '#555', marginBottom: 10 },
  plot: { fontSize: 16, lineHeight: 22, marginBottom: 15 },
  infoContainer: { flexDirection: 'row', marginBottom: 5 },
  infoTitle: { fontWeight: 'bold', marginRight: 5 },
  infoText: { flex: 1, flexWrap: 'wrap' },
});
