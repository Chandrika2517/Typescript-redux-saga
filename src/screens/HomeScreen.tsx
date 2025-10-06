

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { Movie } from '../features/movies/movieAPI';
import { fetchMoviesStart } from '../features/movies/movieSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { movies, userMovies, status, error } = useSelector((state: RootState) => state.movies);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMoviesStart('Telugu'));
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        if (text.trim()) dispatch(fetchMoviesStart(text));
      }, 500)
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchMoviesStart(query || 'Telugu'));
    setRefreshing(false);
  };

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <Image
        source={{
          uri: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : item.poster || 'https://via.placeholder.com/100x150',
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.year}>{item.release_date?.split('-')[0]}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Telugu Movies 🎬</Text>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search movies..." value={query} onChangeText={handleSearch} style={styles.input} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddMovie')}>
        <Text style={styles.addButtonText}>+ Add Movie</Text>
      </TouchableOpacity>
      {status === 'loading' && <ActivityIndicator size="large" color="#ff6347" style={{ marginTop: 20 }} />}
      {status === 'failed' && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={[...userMovies, ...movies]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovie}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  searchContainer: { marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, height: 45 },
  addButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  poster: { width: 100, height: 150 },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  year: { fontSize: 14, color: '#555', marginTop: 5 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
