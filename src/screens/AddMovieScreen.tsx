

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addMovie } from '../features/movies/movieSlice';
import { AppDispatch } from '../app/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Movie } from '../features/movies/movieAPI';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMovie'>;

export default function AddMovieScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [poster, setPoster] = useState('');
  const [overview, setOverview] = useState('');

  const handleSubmit = () => {
    if (!title || !releaseDate || !poster) {
      Alert.alert('Error', 'Please fill all required fields!');
      return;
    }

    const newMovie: Movie = {
      id: Date.now(),
      title,
      release_date: releaseDate,
      poster,
      overview,
    };

    dispatch(addMovie(newMovie));
    Alert.alert('Success', 'Movie added!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add a Movie 🎬</Text>
      <TextInput placeholder="Title*" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Release Date (YYYY-MM-DD)*" value={releaseDate} onChangeText={setReleaseDate} style={styles.input} />
      <TextInput placeholder="Poster URL*" value={poster} onChangeText={setPoster} style={styles.input} />
      <TextInput
        placeholder="Overview"
        value={overview}
        onChangeText={setOverview}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Movie</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginBottom: 15 },
  button: { backgroundColor: '#ff6347', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
