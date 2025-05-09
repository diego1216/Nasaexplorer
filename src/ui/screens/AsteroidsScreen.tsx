import React from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { useAsteroidsViewModel } from "../../presentation/viewmodels/useAsteroidsViewModel";

export const AsteroidsScreen = () => {
  const { asteroids, loading } = useAsteroidsViewModel();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0077ff" />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={asteroids}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>Magnitud: {item.absolute_magnitude_h}</Text>
          <Text>¿Peligroso?: {item.is_potentially_hazardous_asteroid ? "Sí" : "No"}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
});
