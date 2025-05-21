// src/ui/screens/ImageDetailScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type DetailRouteProp = RouteProp<RootStackParamList, 'ImageDetail'>;

export default function ImageDetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { imageUrl, title, description } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1e293b',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 22,
  },
});
