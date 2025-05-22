import { configureStore } from '@reduxjs/toolkit'; // Importa la función para configurar el store con Redux Toolkit
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"; // Importa hooks y tipos para trabajar con Redux y React

// Importa los reducers de cada slice del estado global
import donkiReducer from './slices/donkiSlice'; // Reducer para eventos DONKI
import apodReducer from './slices/apodSlice'; // Reducer para la imagen astronómica del día (APOD)
import eonetReducer from './slices/eonetSlice'; // Reducer para eventos naturales EONET
import neoReducer from "../redux/slices/neoSlice" // Reducer para asteroides (Near-Earth Objects)
import imageLibraryReducer from '../redux/slices/imageLibrarySlice'; // Reducer para la biblioteca de imágenes de la NASA

// Configura el store de Redux combinando todos los reducers
export const store = configureStore({
  reducer: {
    donki: donkiReducer,             // Estado donki manejado por donkiReducer
    apod: apodReducer,               // Estado apod manejado por apodReducer
    eonet: eonetReducer,             // Estado eonet manejado por eonetReducer
    neo: neoReducer,                 // Estado neo manejado por neoReducer
    imageLibrary: imageLibraryReducer, // Estado imageLibrary manejado por imageLibraryReducer
  },
});

// Define el tipo RootState que representa todo el estado global del store
export type RootState = ReturnType<typeof store.getState>;

// Define el tipo AppDispatch basado en el método dispatch del store
export type AppDispatch = typeof store.dispatch;

// Hooks personalizados tipados para usar en componentes y ViewModels

// useAppDispatch es un hook para obtener el dispatch con el tipo correcto
export const useAppDispatch: () => AppDispatch = useDispatch;

// useAppSelector es un hook para seleccionar partes del estado con tipado automático
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
