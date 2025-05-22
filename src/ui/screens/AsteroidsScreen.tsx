import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useAsteroidsViewModel } from "../../presentation/viewmodels/useAsteroidsViewModel";
import ZoomInView from "../components/ZoomInView";

const AsteroidsScreen = () => {
  const { asteroids, loading, error, loadMore, loadingMore } = useAsteroidsViewModel();

  return (
    <ZoomInView style={styles.container}>
      <Text style={styles.title}>Asteroides Cercanos a la Tierra</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={asteroids}
          keyExtractor={(item) => item.id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" color="#0077ff" /> : null
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Fecha: {item.date}</Text>
              <Text>Magnitud: {item.absolute_magnitude_h}</Text>
              <Text>Peligroso: {item.is_potentially_hazardous_asteroid ? "Sí" : "No"}</Text>
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
    backgroundColor: "#f8fafc"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12
  },
  card: {
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
  error: {
    color: "red"
  }
});

export default AsteroidsScreen;
