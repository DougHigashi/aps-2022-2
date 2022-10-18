import 'react-native-gesture-handler';
import React from 'react';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
import CoordinateProvider from './src/contexts/Coordinate'
import Login from './src/pages/Login'
import Cadastro from './src/pages/Cadastro'
import Esqueci from './src/pages/Esqueci'
import Chat from './src/pages/Chat'
import Profile from './src/pages/Profile'
import Participantes from './src/pages/Participantes'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Setting a timer']);

const ChatDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Chat" component={Chat} options={{headerShown: false}} />
      <Drawer.Screen name="Participantes" component={Participantes} options={{headerShown: false}}  />
    </Drawer.Navigator>
  )
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, color, size }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Chat':
              iconName = 'chatbox-ellipses-outline';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#308C30',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Chat" component={ChatDrawer} screenOptions={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} screenOptions={{ headerShown: false }} />
    </Tab.Navigator>

  );
}

export default function App() {
  return (
    <CoordinateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Esqueci" component={Esqueci} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer >
    </CoordinateProvider>
  );
}

