import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home';
import Cadastro from './cadastro';
import Lista from './lista';
import Desenvolvedores from './desenvolvedores';

console.log({ Home, Cadastro, Lista, Desenvolvedores });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Desenvolvedores" component={Desenvolvedores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
