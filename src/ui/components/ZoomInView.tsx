import React, { useEffect } from 'react'; // Importa React y el hook useEffect para manejar efectos secundarios
import Animated, {
  useSharedValue,         // Hook de Reanimated para crear valores compartidos reactivos
  useAnimatedStyle,       // Hook que convierte valores compartidos en estilos animados
  withTiming,             // Función que anima valores con una duración determinada (interpolación suave)
} from 'react-native-reanimated'; // Importa desde la librería de animaciones avanzadas para React Native
import { ViewStyle } from 'react-native'; // Importa el tipo ViewStyle para definir estilos de vista opcionales

// Define las props del componente: children para renderizar contenido interno y un estilo opcional
type Props = {
  children: React.ReactNode; // Contenido interno del componente (puede ser cualquier nodo de React)
  style?: ViewStyle;         // Estilo opcional que se aplicará al contenedor animado
};

// Componente funcional que aplica una animación tipo "zoom in" a sus hijos al montarse
export default function ZoomInView({ children, style }: Props) {
  const scale = useSharedValue(0.9); // Valor compartido que define el tamaño inicial reducido (90%)
  const opacity = useSharedValue(0); // Valor compartido que define la opacidad inicial (transparente)

  useEffect(() => {
    // Al montar el componente, anima el tamaño y opacidad hacia su estado final
    scale.value = withTiming(1, { duration: 400 });   // Anima el scale a 1 (100%) en 400 ms
    opacity.value = withTiming(1, { duration: 400 }); // Anima la opacidad a 1 (totalmente visible) en 400 ms
  }, []);

  // Crea un estilo animado basado en los valores de scale y opacity
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }], // Aplica transformación de escala
    opacity: opacity.value,              // Aplica la opacidad animada
  }));

  // Renderiza una vista animada que aplica el estilo animado junto con cualquier estilo externo pasado por props
  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}
