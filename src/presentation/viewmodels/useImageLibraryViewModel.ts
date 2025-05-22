import { useEffect } from 'react'; // Importa useEffect para ejecutar lógica al montar el componente o al cambiar dependencias
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Importa hooks personalizados de Redux con tipado de store y dispatch
import {
  fetchImages,       // Acción que obtiene imágenes desde la API o caché
  resetLibrary,       // Acción que reinicia el estado de la biblioteca (no usada aquí, pero disponible)
  setPage,            // Acción que incrementa la página para paginación
} from '../../redux/slices/imageLibrarySlice'; // Importa las acciones del slice imageLibrary

// Hook personalizado que encapsula la lógica del ViewModel para la biblioteca de imágenes de la NASA
export const useImageLibraryViewModel = () => {
  const dispatch = useAppDispatch(); // Obtiene el método dispatch tipado

  // Extrae propiedades del slice imageLibrary desde el estado global
  const {
    images,       // Lista de imágenes obtenidas
    loading,      // Estado de carga inicial
    loadingMore,  // Estado de carga para paginación
    error,        // Posibles errores al obtener datos
    hasMore,      // Booleano que indica si hay más resultados para paginar
    page,         // Página actual
  } = useAppSelector((state) => state.imageLibrary);

  // useEffect que se ejecuta una vez al montar el componente
  useEffect(() => {
    dispatch(fetchImages()); // Lanza la acción para obtener imágenes de la API
  }, [dispatch]); // Se ejecuta solo una vez (dependencias fijas)

  // Función para cargar más imágenes (paginación)
  const loadMore = () => {
    // Solo carga más si no está cargando actualmente y aún hay más resultados
    if (!loadingMore && hasMore) {
      dispatch(setPage(page + 1)); // Incrementa la página actual en el estado
      dispatch(fetchImages());     // Llama nuevamente a la acción para obtener más resultados
    }
  };

  // Devuelve los datos y funciones necesarias para la vista (UI)
  return { images, loading, error, loadMore, loadingMore };
};
