import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { MotiView } from 'moti';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#5e17eb',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'home';
          if (route.name === 'index') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'cadastro') iconName = focused ? 'add-circle' : 'add-circle-outline';
          else if (route.name === 'lista') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'desenvolvedores') iconName = focused ? 'people' : 'people-outline';

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
      })}
    />
  );
}
