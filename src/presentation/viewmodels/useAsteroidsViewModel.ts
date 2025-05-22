// src/presentation/viewmodels/useAsteroidsViewModel.ts

import { useEffect, useState } from "react"; // Importa hooks de React para manejar ciclo de vida y estados locales
import { useAppDispatch, useAppSelector } from "../../redux/store"; // Importa hooks personalizados para usar Redux con tipado
import { fetchAsteroids, resetNeos } from "../../redux/slices/neoSlice"; // Importa las acciones de Redux: para obtener asteroides y reiniciar el estado

// Función auxiliar para obtener una fecha en formato YYYY-MM-DD, desplazada en días según el offset recibido
const getDate = (offset: number) => {
  const date = new Date(); // Obtiene la fecha actual
  date.setDate(date.getDate() - offset); // Resta los días indicados por el offset
  return date.toISOString().split("T")[0]; // Convierte la fecha a string ISO y se queda solo con la parte de la fecha
};

// Hook personalizado que encapsula la lógica del ViewModel para el módulo de asteroides
export function useAsteroidsViewModel() {
  const dispatch = useAppDispatch(); // Hook que retorna la función dispatch con tipado de la app
  const { data: asteroids, loading, error } = useAppSelector((state) => state.neo); // Obtiene el estado actual del slice 'neo'

  const [dayOffset, setDayOffset] = useState(0); // Estado local para manejar el desplazamiento de días (paginación)
  const [loadingMore, setLoadingMore] = useState(false); // Estado local para saber si se están cargando más datos

  // Función para cargar los datos iniciales
  const loadInitial = async () => {
    dispatch(resetNeos()); // Limpia el estado anterior de asteroides
    const startDate = getDate(dayOffset + 3); // Fecha de inicio desplazada 3 días más
    const endDate = getDate(dayOffset); // Fecha final (día actual o desplazado)
    await dispatch(fetchAsteroids({ startDate, endDate })); // Lanza la acción para obtener asteroides entre esas fechas
    setDayOffset((prev) => prev + 4); // Aumenta el offset para preparar la siguiente carga
  };

  // Función para cargar más datos (scroll infinito o paginación)
  const loadMore = async () => {
    if (loadingMore || loading) return; // Si ya está cargando, no hace nada

    setLoadingMore(true); // Marca que se está cargando más contenido
    const startDate = getDate(dayOffset + 3); // Nueva fecha de inicio
    const endDate = getDate(dayOffset); // Nueva fecha de fin
    await dispatch(fetchAsteroids({ startDate, endDate })); // Lanza acción para cargar más asteroides
    setDayOffset((prev) => prev + 4); // Aumenta el offset para siguiente paginación
    setLoadingMore(false); // Termina la carga
  };

  useEffect(() => {
    loadInitial(); // Ejecuta la carga inicial al montar el componente
  }, []);

  // Devuelve los datos y funciones necesarias para la UI
  return {
    asteroids, // Lista de asteroides
    loading, // Estado de carga principal
    error, // Posible error de red o de datos
    loadMore, // Función para cargar más datos
    loadingMore, // Estado de carga secundaria (scroll)
  };
}
