import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDonkiViewModel } from "../../presentation/viewmodels/useDonkiViewModel";
import ZoomInView from "../components/ZoomInView";

const DonkiScreen = () => {
  // Redux conectado + lógica offline
  const { events, loading, error } = useDonkiViewModel("2024-01-01", "2024-12-31");

  return (
    <ZoomInView style={styles.container}>
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
              <Text style={styles.text}>
                Fecha: {item.startTime?.split("T")[0]}
              </Text>
              <Text style={styles.text}>
                Velocidad: {item?.cmeAnalyses?.[0]?.speed ?? "N/A"} km/s
              </Text>
            </View>
          )}
        />
      )}
    </ZoomInView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#f0f9ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e293b",
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 14,
    color: "#1e293b",
  },
  error: {
    color: "red",
  },
});

export default DonkiScreen;
