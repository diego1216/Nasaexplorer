import React from "react"; // Importa React para usar JSX y componentes funcionales
import {
  View,                    // Componente contenedor
  Text,                    // Componente para mostrar texto
  FlatList,                // Lista optimizada para scroll
  ActivityIndicator,       // Indicador de carga
  StyleSheet,              // Herramienta para crear estilos
} from "react-native";
import { useDonkiViewModel } from "../../presentation/viewmodels/useDonkiViewModel"; // Importa el ViewModel para manejar lógica de negocio y estado
import ZoomInView from "../components/ZoomInView"; // Componente animado para mostrar el contenido con efecto de entrada

// Componente funcional que representa la pantalla de eventos DONKI (CME)
const DonkiScreen = () => {
  // Obtiene datos, estado de carga y error desde el ViewModel con fechas definidas
  const { events, loading, error } = useDonkiViewModel("2024-01-01", "2024-12-31");

  return (
    // Aplica animación de entrada al contenedor principal
    <ZoomInView style={styles.container}>
      <Text style={styles.title}>Eventos CME (DONKI)</Text>

      {loading ? (
        // Muestra spinner si está cargando
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        // Muestra mensaje de error si lo hay
        <Text style={styles.error}>{error}</Text>
      ) : (
        // Si hay datos, renderiza la lista
        <FlatList
          data={events} // Lista de eventos
          keyExtractor={(item, index) => `${item.activityID}-${index}`} // Clave única por elemento
          renderItem={({ item }) => (
            // Renderiza cada evento como tarjeta
            <View style={styles.item}>
              <Text style={styles.text}>ID: {item.activityID}</Text>
              <Text style={styles.text}>
                Fecha: {item.startTime?.split("T")[0]} {/* Extrae solo la fecha sin la hora */}
              </Text>
              <Text style={styles.text}>
                Velocidad: {item?.cmeAnalyses?.[0]?.speed ?? "N/A"} km/s {/* Velocidad o valor por defecto */}
              </Text>
            </View>
          )}
        />
      )}
    </ZoomInView>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    padding: 16,                 // Espaciado interno
    flex: 1,                     // Ocupa toda la pantalla
    backgroundColor: "#f0f9ff", // Fondo claro azul
  },
  title: {
    fontSize: 22,               // Tamaño del título
    fontWeight: "bold",         // Negrita
    marginBottom: 12,           // Separación inferior
    color: "#1e293b",           // Color oscuro azulado
  },
  item: {
    backgroundColor: "#fff",    // Fondo blanco para cada tarjeta
    padding: 12,                // Espaciado interno
    marginBottom: 10,           // Separación entre tarjetas
    borderRadius: 8,            // Bordes redondeados
    elevation: 2,               // Sombra en Android
  },
  text: {
    fontSize: 14,               // Tamaño del texto
    color: "#1e293b",           // Color del texto
  },
  error: {
    color: "red",               // Color rojo para errores
  },
});

// Exporta el componente para ser usado en navegación u otras partes de la app
export default DonkiScreen;
