import React from "react"; // Importa React para poder usar JSX y componentes funcionales
import {
  View,                  // Componente contenedor básico
  Text,                  // Componente para mostrar texto
  FlatList,              // Componente de lista optimizada para scroll
  ActivityIndicator,     // Componente que muestra un spinner de carga
  StyleSheet             // Utilidad para definir estilos en React Native
} from "react-native";
import { useAsteroidsViewModel } from "../../presentation/viewmodels/useAsteroidsViewModel"; // Importa el ViewModel que maneja la lógica de negocio para asteroides
import ZoomInView from "../components/ZoomInView"; // Componente animado personalizado para aplicar efecto de zoom al aparecer

// Componente principal que renderiza la pantalla de asteroides
const AsteroidsScreen = () => {
  // Desestructura los valores devueltos por el ViewModel
  const { asteroids, loading, error, loadMore, loadingMore } = useAsteroidsViewModel();

  return (
    // Aplica la animación de entrada ZoomInView con estilo de contenedor
    <ZoomInView style={styles.container}>
      <Text style={styles.title}>Asteroides Cercanos a la Tierra</Text>
      {loading ? (
        // Si está cargando, muestra un spinner de carga grande
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        // Si hay error, muestra el mensaje de error en rojo
        <Text style={styles.error}>{error}</Text>
      ) : (
        // Si hay datos, muestra la lista de asteroides
        <FlatList
          data={asteroids} // Lista de datos a renderizar
          keyExtractor={(item) => item.id} // Clave única para cada item
          onEndReached={loadMore} // Función que se ejecuta cuando se alcanza el final de la lista
          onEndReachedThreshold={0.5} // Umbral para disparar onEndReached
          ListFooterComponent={
            // Muestra spinner pequeño si se están cargando más resultados
            loadingMore ? <ActivityIndicator size="small" color="#0077ff" /> : null
          }
          renderItem={({ item }) => (
            // Renderiza cada asteroide en una tarjeta (card)
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Fecha: {item.date}</Text>
              <Text>Magnitud: {item.absolute_magnitude_h}</Text>
              <Text>
                Peligroso: {item.is_potentially_hazardous_asteroid ? "Sí" : "No"}
              </Text>
            </View>
          )}
        />
      )}
    </ZoomInView>
  );
};

// Define los estilos utilizados por la pantalla
const styles = StyleSheet.create({
  container: {
    padding: 16,              // Espaciado interno
    flex: 1,                  // Ocupa todo el alto disponible
    backgroundColor: "#f8fafc" // Color de fondo claro
  },
  title: {
    fontSize: 22,             // Tamaño grande para el título
    fontWeight: "bold",       // Texto en negrita
    marginBottom: 12          // Espacio inferior
  },
  card: {
    backgroundColor: "#fff",  // Fondo blanco para las tarjetas
    padding: 12,              // Espaciado interno
    borderRadius: 8,          // Bordes redondeados
    marginBottom: 10,         // Espacio entre tarjetas
    elevation: 2              // Sombra en Android
  },
  name: {
    fontSize: 16,             // Tamaño del nombre del asteroide
    fontWeight: "600"         // Seminegrita
  },
  error: {
    color: "red"              // Color rojo para errores
  }
});

// Exporta el componente para que pueda usarse en navegación u otras partes de la app
export default AsteroidsScreen;
