import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';
import { NasaMediaDatasource } from '../../data/datasources/NasaMediaDatasource';

const ImageLibraryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchImages = async (reset = false) => {
    try {
      if (reset) {
        setPage(1);
        setImages([]);
      }
      setLoading(reset);
      setLoadingMore(!reset);

      const data = await new NasaMediaDatasource().search(query, reset ? 1 : page);
      setImages(prev => (reset ? data : [...prev, ...data]));
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Error al buscar imágenes');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchImages(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 🔍 Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar imágenes (ej: Mars, Earth, Saturn)"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0077ff" />
        </View>
      )}

      {error && (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}

      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        onEndReached={() => fetchImages()}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          loadingMore ? <ActivityIndicator size="small" color="#0077ff" /> : null
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ImageDetail', {
                imageUrl: item.imageUrl,
                title: item.title,
                description: item.description,
              })
            }
          >
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
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
    marginBottom: 20,
    alignItems: 'center',
  },
 image: {
  width: '30%',
  aspectRatio: 1, // cuadrada
  borderRadius: 2,
  marginBottom: 2,
  resizeMode: 'cover',
},

  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1e293b',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default ImageLibraryScreen;
