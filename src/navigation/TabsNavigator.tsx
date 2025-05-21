// src/navigation/TabsNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EonetScreen from '../ui/screens/EonetScreen';
import DonkiScreen from '../ui/screens/DonkiScreen';
import AsteroidsScreen from '../ui/screens/AsteroidsScreen';
import FeedbackFormScreen from '../ui/screens/FeedbackFormScreen'; // 👈 IMPORTA

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Eventos Naturales" component={EonetScreen} />
      <Tab.Screen name="Eventos DONKI" component={DonkiScreen} />
      <Tab.Screen name="Asteroides" component={AsteroidsScreen} />
      <Tab.Screen name="Formulario" component={FeedbackFormScreen} /> {/* 👈 AÑADE AQUÍ */}
    </Tab.Navigator>
  );
};

export default TabsNavigator;
