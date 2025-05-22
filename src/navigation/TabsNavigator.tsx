// src/navigation/TabsNavigator.tsx

import React from 'react'; // Importa React para poder usar JSX y componentes funcionales
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importa el creador de navegación por pestañas (Bottom Tabs)

// Importa las pantallas que se incluirán en las pestañas (tabs)
import EonetScreen from '../ui/screens/EonetScreen'; // Pantalla que muestra eventos naturales (EONET)
import DonkiScreen from '../ui/screens/DonkiScreen'; // Pantalla que muestra eventos solares (DONKI)
import AsteroidsScreen from '../ui/screens/AsteroidsScreen'; // Pantalla que muestra información de asteroides (NEO)
import FeedbackFormScreen from '../ui/screens/FeedbackFormScreen'; // Pantalla del formulario para enviar comentarios

// Crea una instancia del BottomTabNavigator
const Tab = createBottomTabNavigator();

// Define el componente TabsNavigator que renderiza las pestañas de navegación inferior
const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }} // Oculta el encabezado superior para todas las pestañas
    >
      {/* Define cada pestaña con su nombre visible y el componente asociado */}
      <Tab.Screen name="Eventos Naturales" component={EonetScreen} />
      <Tab.Screen name="Eventos DONKI" component={DonkiScreen} />
      <Tab.Screen name="Asteroides" component={AsteroidsScreen} />
      <Tab.Screen name="Formulario" component={FeedbackFormScreen} />
    </Tab.Navigator>
  );
};

// Exporta el TabsNavigator para ser utilizado dentro del sistema de navegación principal
export default TabsNavigator;
