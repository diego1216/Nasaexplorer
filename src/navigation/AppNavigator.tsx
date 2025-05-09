import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../ui/screens/HomeScreen";
import { AsteroidsScreen } from "../ui/screens/AsteroidsScreen";
const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: "Imagen del Día - NASA" }}
        />
        {<Stack.Screen name="Asteroids" component={AsteroidsScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
