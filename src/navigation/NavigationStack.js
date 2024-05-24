import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../UI/pages/Home';
import { NavigationContainer } from '@react-navigation/native';
import PokemonDetail from '../UI/pages/PokemonDetail';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
            <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }} 
            />
            <Stack.Screen name="Pokemon" component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
