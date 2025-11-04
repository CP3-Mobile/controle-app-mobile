import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { MotiView } from 'moti';

import Home from './home';
import Cadastro from './cadastro';
import Lista from './lista';
import Desenvolvedores from './desenvolvedores';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home-outline';
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Cadastro') iconName = focused ? 'add-circle' : 'add-circle-outline';
            else if (route.name === 'Lista') iconName = focused ? 'list' : 'list-outline';
            else if (route.name === 'Desenvolvedores') iconName = focused ? 'person' : 'person-outline';

            return (
              <MotiView
                from={{ scale: 0.95, opacity: 0.9 }}
                animate={{ scale: focused ? 1.08 : 1, opacity: 1 }}
                transition={{ type: 'timing', duration: 220 }}
              >
                <Ionicons name={iconName} size={size} color={color} />
              </MotiView>
            );
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#ff5959',
            borderTopWidth: 0,
            elevation: 0,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ }}
        />
        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
          }}
        />
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="Desenvolvedores" component={Desenvolvedores} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
