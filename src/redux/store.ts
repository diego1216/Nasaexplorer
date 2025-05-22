import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import donkiReducer from './slices/donkiSlice';
import apodReducer from './slices/apodSlice';
import eonetReducer from './slices/eonetSlice';
import neoReducer from "../redux/slices/neoSlice"
import imageLibraryReducer from '../redux/slices/imageLibrarySlice';
export const store = configureStore({
  reducer: {
    donki: donkiReducer,
    apod: apodReducer,
    eonet: eonetReducer,
    neo: neoReducer,
    imageLibrary: imageLibraryReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom Hooks tipados
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;