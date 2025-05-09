// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/ui/screens/HomeScreen';
import { AsteroidsScreen } from './src/ui/screens/AsteroidsScreen';

export type RootStackParamList = {
  Home: undefined;
  Asteroids: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Explorador Espacial' }} />
        <Stack.Screen name="Asteroids" component={AsteroidsScreen} options={{ title: 'Asteroides cercanos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
