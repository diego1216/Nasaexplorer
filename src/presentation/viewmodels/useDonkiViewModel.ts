import { useEffect } from 'react'; // Importa el hook useEffect de React para ejecutar efectos secundarios (side effects)
import { useDispatch, useSelector } from 'react-redux'; // Importa hooks de Redux para despachar acciones y seleccionar estado del store
import { fetchDonkiEvents } from '../../redux/slices/donkiSlice'; // Importa la acción asíncrona (thunk) que obtiene eventos DONKI
import type { RootState, AppDispatch } from '../../redux/store'; // Importa los tipos del store: estado global y tipo de dispatch

// Hook personalizado que encapsula la lógica del ViewModel para el módulo DONKI
export const useDonkiViewModel = (startDate: string, endDate: string) => {
  const dispatch = useDispatch<AppDispatch>(); // Obtiene la función dispatch con tipado de la app

  // Extrae los valores del estado global correspondiente al slice "donki"
  const { events, loading, error } = useSelector((state: RootState) => state.donki);

  // Efecto que se ejecuta al montar el componente o cuando cambian startDate o endDate
  useEffect(() => {
    dispatch(fetchDonkiEvents({ startDate, endDate })); // Lanza la acción para obtener eventos DONKI con el rango de fechas dado
  }, [dispatch, startDate, endDate]); // Dependencias del efecto: se vuelve a ejecutar si alguna cambia

  // Devuelve los datos necesarios para la UI: eventos, estado de carga y errores
  return { events, loading, error };
};
