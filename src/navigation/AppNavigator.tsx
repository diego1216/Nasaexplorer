// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import ImageDetailScreen from "../ui/screens/ImageDetailScreen"; // ✅ IMPORTACIÓN

export type RootStackParamList = {
  DrawerRoot: undefined;
  ImageDetail: {
    imageUrl: string;
    title: string;
    description: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="DrawerRoot">
      <Stack.Screen
        name="DrawerRoot"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      {/* ✅ Pantalla de Detalle */}
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
        options={{ title: 'Detalle de Imagen' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
