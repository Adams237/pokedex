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
import LoginView from './views/LoginView/LoginView';
import SingupView from './views/SingupView/SingupView';
import Profile from './views/Profile/Profile';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import PresentationView from './views/Preasentation/PresentationView';
import TrainerList from './views/TrainerList/TrainerList';
import TrainerDetails from './views/TrainerList/TrainerDetails';



const App = () => {


  const HomeStack = createNativeStackNavigator();
  // eslint-disable-next-line react/no-unstable-nested-components
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home2" component={HomeView} 
        options={(props)=>({
          unmountInactiveRoute:true,
          title:'',
          headerStyle: {
            backgroundColor:'#fff'
          },
          headerLeft: ()=>(
            <Icon style={{ marginLeft: 15 }} name="user-circle" size={30} color={"black"} onPress={()=>{props.navigation.navigate('Profile')}}/>
          )
        })}
        />
        <HomeStack.Screen name="Detailpokemon" component={PokemonDetails} options={{ title: 'details' }} />
        <HomeStack.Screen name="Profile" component={Profile} options={{ title: 'MyProflie' }} />
      </HomeStack.Navigator>
    );
  }



  const MyPokemonStack = createNativeStackNavigator();

  // eslint-disable-next-line react/no-unstable-nested-components
  function MyPokemonStackScreen() {
    return (
      <MyPokemonStack.Navigator>
        <MyPokemonStack.Screen name="My pokemon list" component={MypokemonView} options={{ title: 'this is my team pokemons', headerLeft: ()=>null }} />
        <MyPokemonStack.Screen name="Detailpokemon" component={PokemonDetails} options={{ title: 'Characteristics of the Pokemon' }} />
      </MyPokemonStack.Navigator>
    );
  }
  const TrainerStack = createNativeStackNavigator();

  // eslint-disable-next-line react/no-unstable-nested-components
  function TrainerStackScreen() {
    return (
      <TrainerStack.Navigator>
        <TrainerStack.Screen name="TrainerList" component={TrainerList} options={{ title: 'autre Dresseur', headerLeft: ()=>null }} />
        <TrainerStack.Screen name="DetailTrainer" component={TrainerDetails} options={{ title: 'Characteristics of the Pokemon' }} />
      </TrainerStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();

  function TabNavigation() {
    return (<Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="MyPokemon" component={MyPokemonStackScreen} />
      <Tab.Screen name="Presentation" component={PresentationView}/>
      <Tab.Screen name="profil" component={Profile}/>
      <Tab.Screen name="TrainerList" component={TrainerStackScreen}/>
    </Tab.Navigator>)
  };

  const MainsStac = createNativeStackNavigator();
  const MaisStackNavigation = ()=>(
    <MainsStac.Navigator initialRouteName={'Login'}>
      <MainsStac.Screen name="Home" component={ TabNavigation } options={{ headerShown:false }}/>
      <MainsStac.Screen name="Login" component={LoginView} options={{ headerShown:false }}/>
      <MainsStac.Screen name="Singup" component={ SingupView } options={{ headerShown:false }}/>
    </MainsStac.Navigator>
  ) 

  return (
    <NavigationContainer>
      <MaisStackNavigation/>
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
