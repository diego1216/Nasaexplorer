// src/presentation/viewmodels/useEonetViewModel.ts

import { useEffect } from "react"; // Importa useEffect para manejar efectos secundarios como la carga inicial de datos
import { useAppDispatch, useAppSelector } from "../../redux/store"; // Importa hooks personalizados de Redux con tipado
import { fetchEonetEvents, increaseLimit } from "../../redux/slices/eonetSlice"; // Importa las acciones: para obtener eventos y para incrementar el límite de carga

// Hook personalizado que encapsula la lógica del ViewModel para el módulo EONET
export const useEonetViewModel = () => {
  const dispatch = useAppDispatch(); // Hook para obtener la función dispatch con tipado de la app

  // Extrae propiedades del estado del slice "eonet"
  const { data: events, loading, error, limit, loadingMore } = useAppSelector(
    (state) => state.eonet
  );

  // useEffect que se ejecuta cuando cambia el valor de "limit"
  useEffect(() => {
    dispatch(fetchEonetEvents(limit)); // Lanza la acción para obtener eventos EONET con el límite actual
  }, [limit]); // Dependencia: vuelve a ejecutar la acción cada vez que cambia el límite

  // Función para cargar más eventos
  const loadMore = () => {
    if (!loadingMore) { // Verifica que no se esté cargando ya más contenido
      dispatch(increaseLimit()); // Aumenta el límite de eventos en el estado global (slice)
    }
  };

  // Devuelve los datos y funciones necesarias para la UI
  return {
    events,       // Lista de eventos EONET
    loading,      // Estado de carga principal
    error,        // Posible error en la carga
    loadMore,     // Función para cargar más eventos (scroll infinito)
    loadingMore,  // Estado de carga secundaria (para más datos)
  };
};
