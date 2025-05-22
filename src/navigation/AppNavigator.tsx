// src/navigation/AppNavigator.tsx

import React from "react"; // Importa React para poder usar JSX y componentes funcionales
import { NavigationContainer } from "@react-navigation/native"; // Importa el contenedor principal de navegación (maneja el estado global de navegación)
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Importa el creador de pilas de navegación nativas (stack navigation)

import DrawerNavigator from "./DrawerNavigator"; // Importa el componente de navegación tipo Drawer (menú lateral)
import ImageDetailScreen from "../ui/screens/ImageDetailScreen"; // Importa la pantalla que muestra detalles de una imagen

// ✅ Define el tipo RootStackParamList que especifica las rutas disponibles y los parámetros que acepta cada una
export type RootStackParamList = {
  DrawerRoot: undefined; // Ruta principal que carga el DrawerNavigator
  Eonet: undefined; // Ruta para la pantalla de eventos EONET (sin parámetros)
  Asteroids: undefined; // Ruta para la pantalla de asteroides (sin parámetros)
  Donki: undefined; // Ruta para la pantalla de eventos DONKI (sin parámetros)
  ImageLibrary: undefined; // Ruta para la biblioteca de imágenes (sin parámetros)
  ImageDetail: { // Ruta para la pantalla de detalle de imagen, con parámetros requeridos
    imageUrl: string; // URL de la imagen a mostrar
    title: string; // Título de la imagen
    description: string; // Descripción de la imagen
  };
};

// Crea una instancia del stack navigator tipado con RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente AppNavigator que define la estructura de navegación principal de la app
const AppNavigator = () => (
  <NavigationContainer> {/* Componente que proporciona el contexto de navegación */}
    <Stack.Navigator initialRouteName="DrawerRoot" screenOptions={{ headerShown: false }}>
      {/* Define el stack de pantallas; se inicia con DrawerRoot y oculta los headers */}
      
      <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
      {/* Ruta principal que carga el Drawer (menú lateral) */}

      <Stack.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
        options={{ headerShown: false }} // Oculta el encabezado en la pantalla de detalles
      />
    </Stack.Navigator>
  </NavigationContainer>
);

// Exporta AppNavigator como el componente principal de navegación
export default AppNavigator;
