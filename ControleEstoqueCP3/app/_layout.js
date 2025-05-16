import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#5e17eb',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'cadastro') iconName = 'add-circle';
          else if (route.name === 'lista') iconName = 'list';
          else if (route.name === 'desenvolvedores') iconName = 'people';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
