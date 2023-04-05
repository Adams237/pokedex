/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { store } from './store/redurcer/store';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeView from './views/HomeView/HomeView';
import TestView from './views/TestView/TestView';
import PokemonDetails from './views/PokemonDetails/PokemonDetails';
import MypokemonView from './views/MyPokemonView/MypokemonView';



const App = () => {


  const HomeStack = createNativeStackNavigator();
  // eslint-disable-next-line react/no-unstable-nested-components
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home2" component={HomeView} options={{ title: '', headerShown: false }} />
        <HomeStack.Screen name="Detailpokemon" component={PokemonDetails} options={{ title: 'details' }} />
      </HomeStack.Navigator>
    );
  }

  const MyPokemonStack = createNativeStackNavigator();

  // eslint-disable-next-line react/no-unstable-nested-components
  function MyPokemonStackScreen() {
    return (
      <MyPokemonStack.Navigator>
        <MyPokemonStack.Screen name="My pokemon list" component={MypokemonView} options={{ title: 'this is my team pokemons' }} />
        <MyPokemonStack.Screen name="Detailpokemon" component={PokemonDetails} options={{ title: 'Characteristics of the Pokemon' }} />
      </MyPokemonStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="MyPokemon" component={MyPokemonStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};
