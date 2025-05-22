import React from 'react'; // Importa React para usar JSX y componentes funcionales
import { View, Text, Image, StyleSheet, ScrollView, Pressable } from 'react-native'; // Importa componentes nativos
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'; // Importa hooks y tipos de navegación
import { RootStackParamList } from '../../navigation/AppNavigator'; // Importa el tipo de las rutas del stack
import { Ionicons } from '@expo/vector-icons'; // Importa íconos de la librería de íconos (asegúrate de instalarla)

type DetailRouteProp = RouteProp<RootStackParamList, 'ImageDetail'>; // Define el tipo de la ruta esperada con sus parámetros

export default function ImageDetailScreen() {
  const route = useRoute<DetailRouteProp>(); // Obtiene los parámetros de navegación (imageUrl, title, description)
  const navigation = useNavigation(); // Hook para manejar navegación hacia atrás
  const { imageUrl, title, description } = route.params; // Extrae los parámetros enviados desde la pantalla anterior

  return (
    <View style={styles.wrapper}> {/* Contenedor general con fondo */}
      
      {/* 🔙 Navbar personalizado */}
      <View style={styles.header}> {/* Barra superior con botón de retroceso */}
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}> {/* Botón para volver */}
          <Ionicons name="arrow-back" size={24} color="#1e293b" /> {/* Icono de flecha hacia atrás */}
        </Pressable>
        <Text style={styles.headerTitle}>Detalle de Imagen</Text> {/* Título de la barra superior */}
      </View>

      <ScrollView contentContainerStyle={styles.container}> {/* Scroll para ver contenido largo */}
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" /> {/* Imagen remota */}
        <Text style={styles.title}>{title}</Text> {/* Título de la imagen */}
        <Text style={styles.description}>{description}</Text> {/* Descripción de la imagen */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, // Ocupa todo el alto de la pantalla
    backgroundColor: '#f8fafc', // Fondo claro
  },
  header: {
    flexDirection: 'row', // Alinea elementos horizontalmente
    alignItems: 'center', // Centra verticalmente
    padding: 12, // Espaciado interno
    backgroundColor: '#fff', // Fondo blanco
    borderBottomWidth: 1, // Borde inferior
    borderBottomColor: '#e2e8f0', // Color del borde inferior
  },
  backButton: {
    marginRight: 10, // Espacio a la derecha del ícono
  },
  headerTitle: {
    fontSize: 18, // Tamaño de fuente
    fontWeight: 'bold', // Texto en negrita
    color: '#1e293b', // Color oscuro
  },
  container: {
    padding: 16, // Espaciado interno
    alignItems: 'center', // Centra contenido horizontalmente
  },
  image: {
    width: '100%', // Ocupa todo el ancho disponible
    height: 300, // Altura fija
    marginBottom: 20, // Espacio debajo de la imagen
    borderRadius: 8, // Bordes redondeados
  },
  title: {
    fontSize: 22, // Tamaño grande
    fontWeight: '700', // Texto muy en negrita
    marginBottom: 12, // Espacio debajo del título
    color: '#1e293b', // Color oscuro
    textAlign: 'center', // Centra el texto
  },
  description: {
    fontSize: 16, // Tamaño de texto estándar
    color: '#334155', // Gris oscuro
    lineHeight: 22, // Altura de línea para mejor lectura
    textAlign: 'justify', // Justifica el texto
  },
});
