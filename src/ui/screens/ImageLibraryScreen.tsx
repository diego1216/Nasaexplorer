import React, { useEffect } from 'react'; // Importa React y el hook useEffect
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
  Dimensions,
} from 'react-native'; // Importa componentes nativos de React Native
import { useNavigation } from '@react-navigation/native'; // Hook de navegación
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Hooks tipados de Redux
import {
  fetchImages,     // Acción para obtener imágenes desde la API o caché
  setQuery,        // Acción para establecer el texto de búsqueda
  setPage,         // Acción para controlar la paginación
} from '../../redux/slices/imageLibrarySlice'; // Acciones del slice de Image Library
import type { StackNavigationProp } from '@react-navigation/stack'; // Tipado para navegación de pila
import type { RootStackParamList } from '../../navigation/AppNavigator'; // Tipado de las rutas del stack

// Calcula el tamaño de cada imagen según el ancho de pantalla
const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 48) / 2;

const ImageLibraryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Hook para navegación
  const dispatch = useAppDispatch(); // Hook para disparar acciones de Redux

  // Obtiene el estado actual del slice imageLibrary
  const { images, loading, error, loadingMore, query, page, hasMore } = useAppSelector(
    (state) => state.imageLibrary
  );

  // Efecto que se dispara cuando se cambia la página o el query
  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, page, query]);

  // Función para ejecutar búsqueda
  const handleSearch = () => {
    if (query.trim()) {
      dispatch(setPage(1));       // Reinicia a la primera página
      dispatch(fetchImages());    // Ejecuta la búsqueda
    }
  };

  // Función para cargar más imágenes al llegar al final de la lista
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      dispatch(setPage(page + 1)); // Avanza una página
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar imágenes (ej: Mars, Earth, Saturn)"
          value={query}
          onChangeText={(text) => dispatch(setQuery(text))}
          onSubmitEditing={handleSearch} // Ejecuta búsqueda al presionar Enter
        />
        <Button title="Buscar" onPress={handleSearch} /> {/* Botón de búsqueda */}
      </View>

      {/* Indicador de carga */}
      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0077ff" />
        </View>
      )}

      {/* Muestra mensaje de error si lo hay */}
      {error && (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      {/* Lista de resultados */}
      <FlatList
        data={images} // Datos a renderizar
        keyExtractor={(_, index) => index.toString()} // Clave única por índice
        numColumns={2} // Dos columnas por fila
        contentContainerStyle={styles.container} // Estilo del contenido
        columnWrapperStyle={styles.row} // Estilo de las filas
        onEndReached={handleLoadMore} // Ejecuta cuando se alcanza el final del scroll
        onEndReachedThreshold={0.7} // Umbral para anticipar la carga
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color="#0077ff" /> : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('ImageDetail', {
                imageUrl: item.imageUrl,
                title: item.title,
                description: item.description,
              })
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: imageSize,
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1e293b',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default ImageLibraryScreen; // Exporta el componente para su uso en navegación
