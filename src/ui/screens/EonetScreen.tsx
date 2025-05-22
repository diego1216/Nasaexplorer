// src/ui/screens/EonetScreen.tsx

import React from "react"; // Importa React para usar JSX y componentes funcionales
import {
  View,                    // Contenedor de UI
  Text,                    // Componente de texto
  FlatList,                // Lista eficiente para grandes cantidades de datos
  ActivityIndicator,       // Spinner de carga
  StyleSheet               // Utilidad para crear estilos en React Native
} from "react-native";
import { useEonetViewModel } from "../../presentation/viewmodels/useEonetViewModel"; // Importa el ViewModel que gestiona la lógica de negocio y estado para EONET
import ZoomInView from "../components/ZoomInView"; // Componente personalizado para animación de entrada (zoom)

const EonetScreen = () => {
  // Obtiene datos, estados y lógica de paginación desde el ViewModel
  const { events, loading, error, loadMore, loadingMore } = useEonetViewModel();

  return (
    // Aplica animación tipo "zoom in" al contenedor principal
    <ZoomInView style={styles.container}>
      <Text style={styles.title}>Eventos Naturales Activos</Text>

      {loading ? (
        // Si está cargando, muestra spinner grande
        <ActivityIndicator size="large" color="#0077ff" />
      ) : error ? (
        // Si hay un error, muestra el mensaje en rojo
        <Text style={styles.error}>{error}</Text>
      ) : (
        // Si hay datos, renderiza la lista de eventos
        <FlatList
          data={events} // Lista de eventos obtenida del ViewModel
          keyExtractor={(item) => item.id} // Clave única basada en el ID del evento
          onEndReached={loadMore} // Carga más datos al llegar al final del scroll
          onEndReachedThreshold={0.5} // Umbral para disparar loadMore
          ListFooterComponent={
            // Muestra spinner pequeño al cargar más datos
            loadingMore ? <ActivityIndicator size="small" color="#0077ff" /> : null
          }
          renderItem={({ item }) => (
            // Renderiza cada evento como una tarjeta
            <View style={styles.event}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.category}>
                Categoría: {item.categories?.[0]?.title ?? "N/A"} {/* Muestra categoría o "N/A" */}
              </Text>
              <Text style={styles.date}>
                Fecha: {item.geometry?.[0]?.date?.split("T")[0] ?? "Sin fecha"} {/* Muestra fecha o texto por defecto */}
              </Text>
            </View>
          )}
        />
      )}
    </ZoomInView>
  );
};

// Define los estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    padding: 16,                 // Espaciado interno
    flex: 1,                     // Ocupa todo el alto de la pantalla
    backgroundColor: "#f0f9ff"  // Color de fondo claro
  },
  title: {
    fontSize: 22,               // Tamaño de fuente del título
    fontWeight: "bold",         // Negrita
    marginBottom: 12            // Espacio inferior
  },
  event: {
    backgroundColor: "#fff",    // Fondo blanco para cada tarjeta
    padding: 12,                // Espaciado interno
    borderRadius: 8,            // Bordes redondeados
    marginBottom: 10,           // Espacio entre tarjetas
    elevation: 2                // Sombra en Android
  },
  name: {
    fontSize: 16,               // Tamaño de texto del nombre del evento
    fontWeight: "600"           // Peso de fuente seminegrita
  },
  category: {
    fontSize: 14,               // Tamaño de texto para la categoría
    color: "#555"               // Color gris medio
  },
  date: {
    fontSize: 13,               // Tamaño de texto para la fecha
    color: "#999"               // Color gris claro
  },
  error: {
    color: "red"                // Color rojo para mostrar errores
  }
});

// Exporta el componente para ser utilizado en el sistema de navegación
export default EonetScreen;
