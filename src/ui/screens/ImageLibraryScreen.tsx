import React, { useEffect } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  fetchImages,
  setQuery,
  setPage,
} from '../../redux/slices/imageLibrarySlice';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/AppNavigator';

const screenWidth = Dimensions.get('window').width;
const imageSize = (screenWidth - 48) / 2;

const ImageLibraryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const { images, loading, error, loadingMore, query, page, hasMore } = useAppSelector(
    (state) => state.imageLibrary
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, page, query]);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(setPage(1));
      dispatch(fetchImages());
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar imágenes (ej: Mars, Earth, Saturn)"
          value={query}
          onChangeText={(text) => dispatch(setQuery(text))}
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
        numColumns={2}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.7}
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

export default ImageLibraryScreen;
