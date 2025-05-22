// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import ImageDetailScreen from "../ui/screens/ImageDetailScreen";

// ✅ Amplía tu tipo RootStackParamList para incluir TODAS las rutas que usarás con navigate()
export type RootStackParamList = {
  DrawerRoot: undefined;
  Eonet: undefined;
  Asteroids: undefined;
  Donki: undefined;
  ImageLibrary: undefined;
  ImageDetail: {
    imageUrl: string;
    title: string;
    description: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="DrawerRoot" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
        options={{ headerShown: false }} // 👈 Esto evita el header duplicado
    />

    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
