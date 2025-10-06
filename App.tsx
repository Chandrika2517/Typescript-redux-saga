

import React from 'react';
import { Provider } from 'react-redux';
import {store} from './src/app/store'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AddMovieScreen from './src/screens/AddMovieScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number };
  AddMovie: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Telugu Movies' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Movie Details' }} />
          <Stack.Screen name="AddMovie" component={AddMovieScreen} options={{ title: 'Add Movie' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
