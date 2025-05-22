import { useEffect } from 'react'; // Importa el hook useEffect para ejecutar lógica al montar el componente
import { useDispatch, useSelector } from 'react-redux'; // Importa los hooks de Redux para disparar acciones y acceder al estado global
import { fetchApod } from '../../redux/slices/apodSlice'; // Importa la acción asíncrona (thunk) para obtener la imagen astronómica del día
import { RootState } from '../../redux/store'; // Importa el tipo RootState para tipar correctamente el acceso al estado global

// Hook personalizado que encapsula la lógica del ViewModel para la pantalla APOD
const useApodViewModel = () => {
  const dispatch = useDispatch(); // Obtiene la función dispatch para enviar acciones a Redux

  // Extrae los valores del slice "apod" desde el estado global usando useSelector
  const { data, loading, error } = useSelector((state: RootState) => state.apod);

  useEffect(() => {
    // Ejecuta la acción fetchApod cuando se monta el componente
    dispatch(fetchApod() as any); // Se lanza el thunk, tipado como any para evitar errores de tipo (puede mejorarse)
  }, []);

  // Retorna los datos necesarios para la vista: datos, estado de carga y error
  return { data, loading, error };
};

// Exporta el hook personalizado para ser usado en el componente de presentación
export default useApodViewModel;
