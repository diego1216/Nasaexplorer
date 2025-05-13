import React from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useEonetViewModel } from "../../presentation/viewmodels/useEonetViewModel";

export const EonetScreen = () => {
  const { events, loading, error } = useEonetViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Naturales Activos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.event}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.category}>Categoría: {item.categories[0]?.title}</Text>
              <Text style={styles.date}>Fecha: {item.geometry[0]?.date.split("T")[0]}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f0f9ff"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12
  },
  event: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2
  },
  name: {
    fontSize: 16,
    fontWeight: "600"
  },
  category: {
    fontSize: 14,
    color: "#555"
  },
  date: {
    fontSize: 13,
    color: "#999"
  },
  error: {
    color: "red"
  }
});
