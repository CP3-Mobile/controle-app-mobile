import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './home';
import Cadastro from './cadastro';
import Lista from './lista';
import Desenvolvedores from './desenvolvedores';

console.log({ Home, Cadastro, Lista, Desenvolvedores });

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cadastro') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Lista') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Dev') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
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
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cadastro" component={Cadastro} />
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="Dev" component={Desenvolvedores} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

