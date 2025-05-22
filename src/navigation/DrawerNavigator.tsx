// src/navigation/DrawerNavigator.tsx

import React from "react"; // Importa React para poder usar JSX y componentes funcionales
import { createDrawerNavigator } from "@react-navigation/drawer"; // Importa la función para crear una navegación tipo Drawer (menú lateral)

// Importa las diferentes pantallas que se mostrarán dentro del Drawer
import HomeScreen from "../ui/screens/HomeScreen"; // Pantalla principal (Imagen del Día - APOD)
import EonetScreen from "../ui/screens/EonetScreen"; // Pantalla de eventos naturales (EONET)
import DonkiScreen from "../ui/screens/DonkiScreen"; // Pantalla de eventos solares (DONKI)
import AsteroidsScreen from "../ui/screens/AsteroidsScreen"; // Pantalla de asteroides (NEO)
import ImageLibraryScreen from "../ui/screens/ImageLibraryScreen"; // Pantalla de biblioteca multimedia
import FeedbackFormScreen from "../ui/screens/FeedbackFormScreen"; // Pantalla de formulario de comentarios

// Define el tipo de parámetros que acepta cada pantalla del Drawer
export type DrawerParamList = {
  Apod: undefined; // Ruta "Apod" no recibe parámetros
  Eonet: undefined; // Ruta "Eonet" no recibe parámetros
  Donki: undefined; // Ruta "Donki" no recibe parámetros
  Asteroids: undefined; // Ruta "Asteroids" no recibe parámetros
  ImageLibrary: undefined; // Ruta "ImageLibrary" no recibe parámetros
  Formulario: undefined; // Ruta "Formulario" no recibe parámetros
};

// Crea una instancia del Drawer Navigator tipado con DrawerParamList
const Drawer = createDrawerNavigator<DrawerParamList>();

// Define el componente DrawerNavigator con la configuración del menú lateral
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Apod"> {/* Establece la ruta inicial como "Apod" */}
    <Drawer.Screen
      name="Apod" // Nombre de la ruta
      component={HomeScreen} // Componente a renderizar
      options={{ title: "Imagen del Día" }} // Título que se mostrará en el Drawer
    />
    <Drawer.Screen
      name="Eonet"
      component={EonetScreen}
      options={{ title: "Eventos Naturales" }}
    />
    <Drawer.Screen
      name="Donki"
      component={DonkiScreen}
      options={{ title: "Eventos DONKI" }}
    />
    <Drawer.Screen
      name="Asteroids"
      component={AsteroidsScreen}
      options={{ title: "Asteroides" }}
    />
    <Drawer.Screen
      name="ImageLibrary"
      component={ImageLibraryScreen}
      options={{ title: "Biblioteca de Imágenes" }}
    />
    <Drawer.Screen
      name="Formulario"
      component={FeedbackFormScreen}
      options={{ title: "Enviar Comentarios" }}
    />
  </Drawer.Navigator>
);

// Exporta el DrawerNavigator para que pueda ser usado dentro del AppNavigator
export default DrawerNavigator;
