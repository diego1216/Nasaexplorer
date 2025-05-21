// src/navigation/DrawerNavigator.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../ui/screens/HomeScreen";
import EonetScreen from "../ui/screens/EonetScreen";
import DonkiScreen from "../ui/screens/DonkiScreen";
import AsteroidsScreen from "../ui/screens/AsteroidsScreen";
import ImageLibraryScreen from "../ui/screens/ImageLibraryScreen";
import FeedbackFormScreen from "../ui/screens/FeedbackFormScreen"; // ya importado

export type DrawerParamList = {
  Apod: undefined;
  Eonet: undefined;
  Donki: undefined;
  Asteroids: undefined;
  ImageLibrary: undefined;
  Formulario: undefined; // ✅ Agregado aquí
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Apod">
    <Drawer.Screen
      name="Apod"
      component={HomeScreen}
      options={{ title: "Imagen del Día" }}
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

export default DrawerNavigator;
