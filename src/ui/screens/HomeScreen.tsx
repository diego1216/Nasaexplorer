import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import useApodViewModel from '../../presentation/viewmodels/useApodViewModel';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../../navigation/DrawerNavigator';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

export default function HomeScreen() {
  const { data, loading, error } = useApodViewModel();
  const navigation = useNavigation<NavigationProp>();

  const zoom = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  const screenStyle = useAnimatedStyle(() => ({
    transform: [{ scale: zoom.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    zoom.value = withSpring(1);
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const scaleEonet = useSharedValue(1);
  const scaleAsteroids = useSharedValue(1);
  const scaleDonki = useSharedValue(1);
  const scaleLibrary = useSharedValue(1);

  const styleEonet = useAnimatedStyle(() => ({ transform: [{ scale: scaleEonet.value }] }));
  const styleAsteroids = useAnimatedStyle(() => ({ transform: [{ scale: scaleAsteroids.value }] }));
  const styleDonki = useAnimatedStyle(() => ({ transform: [{ scale: scaleDonki.value }] }));
  const styleLibrary = useAnimatedStyle(() => ({ transform: [{ scale: scaleLibrary.value }] }));

  return (
    <Animated.ScrollView contentContainerStyle={styles.container} style={screenStyle}>
      {loading && <Text style={styles.title}>Cargando...</Text>}
      {error && <Text style={styles.title}>Error: {error}</Text>}

      {data.map((item, index) => (
        <View key={index}>
          <Text style={styles.title}>{item.title}</Text>

          {item.media_type === 'image' ? (
            <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
          ) : Platform.OS === 'web' ? (
            <View style={styles.webview}>
              <iframe
                width="100%"
                height="100%"
                src={item.url}
                title="Video APOD"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </View>
          ) : (
            <WebView source={{ uri: item.url }} style={styles.webview} />
          )}

          <Text style={styles.explanation}>{item.explanation}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      ))}

      <Pressable
        onPressIn={() => (scaleEonet.value = withSpring(1.1))}
        onPressOut={() => (scaleEonet.value = withSpring(1))}
        onPress={() => navigation.navigate('Eonet')}
      >
        <Animated.View style={[styles.animatedButton, styleEonet]}>
          <Text style={styles.animatedText}>Ver Eventos Naturales</Text>
        </Animated.View>
      </Pressable>

      <Pressable
        onPressIn={() => (scaleAsteroids.value = withSpring(1.1))}
        onPressOut={() => (scaleAsteroids.value = withSpring(1))}
        onPress={() => navigation.navigate('Asteroids')}
      >
        <Animated.View style={[styles.animatedButton, styleAsteroids]}>
          <Text style={styles.animatedText}>Ver Asteroides Cercanos</Text>
        </Animated.View>
      </Pressable>

      <Pressable
        onPressIn={() => (scaleDonki.value = withSpring(1.1))}
        onPressOut={() => (scaleDonki.value = withSpring(1))}
        onPress={() => navigation.navigate('Donki')}
      >
        <Animated.View style={[styles.animatedButton, styleDonki]}>
          <Text style={styles.animatedText}>Ver Eventos DONKI</Text>
        </Animated.View>
      </Pressable>

      <Pressable
        onPressIn={() => (scaleLibrary.value = withSpring(1.1))}
        onPressOut={() => (scaleLibrary.value = withSpring(1))}
        onPress={() => navigation.navigate('ImageLibrary')}
      >
        <Animated.View style={[styles.animatedButton, styleLibrary]}>
          <Text style={styles.animatedText}>Explorar Biblioteca de Imágenes</Text>
        </Animated.View>
      </Pressable>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f1f5f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1e293b",
  },
  animatedButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
  },
  animatedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  webview: {
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  explanation: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 22,
    marginBottom: 50,
  },
  date: {
    textAlign: "right",
    fontSize: 14,
    color: "#64748b",
  },
});
