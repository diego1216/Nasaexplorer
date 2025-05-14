import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useDonkiViewModel } from "../../presentation/viewmodels/useDonkiViewModel";

export const DonkiScreen = () => {
  const { events, loading, error } = useDonkiViewModel("2024-01-01");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos CME (DONKI)</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) => `${item.activityID}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>ID: {item.activityID}</Text>
              <Text style={styles.text}>Fecha: {item.startTime?.split("T")[0]}</Text>
              <Text style={styles.text}>Velocidad: {item?.cmeAnalyses?.[0]?.speed} km/s</Text>
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
  item: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2
  },
  text: {
    fontSize: 14,
    color: "#1e293b"
  },
  error: {
    color: "red"
  }
});
